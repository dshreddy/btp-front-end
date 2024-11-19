import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { BioAuthContext } from "@/context/bioAuthContext";
import { useRouter } from "expo-router";

const AppLock = () => {
    const { setAuthenticated } = useContext(BioAuthContext);
    const [isSupported, setIsSupported] = useState(false); // Starts as unsupported
    const [checkedSupport, setCheckedSupport] = useState(false); // Indicates hardware check completed
    const router = useRouter();

    useEffect(() => {
        const checkForHardware = async () => {
            const supported = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            setIsSupported(supported && isEnrolled);
            setCheckedSupport(true); // Hardware check completed
        };

        checkForHardware();
    }, []);

    useEffect(() => {
        if (checkedSupport && !isSupported) {
            setAuthenticated(true); // Authenticate if not supported
            router.replace("/"); // Redirect to main page
        }
    }, [checkedSupport, isSupported, setAuthenticated, router]);

    const handleAuthentication = async () => {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Authenticate to unlock",
                fallbackLabel: "Use device PIN",
            });

            if (result.success) {
                setAuthenticated(true);
                if (router.canGoBack()) {
                    router.back();
                } else {
                    router.replace("/");
                }
            } else {
                Alert.alert("Failed", "Authentication failed.");
            }
        } catch (error) {
            Alert.alert("Error", "Authentication error occurred.");
        }
    };

    if (!checkedSupport) {
        return (
            <View style={styles.container}>
                <Text>Checking for biometric hardware...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>App Locked</Text>
            {isSupported ? (
                <>
                    <Text style={styles.subtitle}>
                        Use fingerprint or Face ID to unlock.
                    </Text>
                    <Button title="Authenticate" onPress={handleAuthentication} />
                </>
            ) : (
                <Text style={styles.subtitle}>Biometric authentication not supported.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
        marginVertical: 20,
    },
});

export default AppLock;
