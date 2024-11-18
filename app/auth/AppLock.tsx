import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { BioAuthContext } from "@/context/bioAuthContext";
import { useRouter } from "expo-router";

const AppLock = () => {
    const { setAuthenticated } = useContext(BioAuthContext);
    const [isSupported, setIsSupported] = useState(true); //state that hold true if biometric sensor is there in the device 
    const router = useRouter();

    useEffect(() => {

        const checkForHardware = async () => {
            const supported = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            setIsSupported(supported && isEnrolled);

            if (!isSupported) {
                setAuthenticated(true);
                router.replace("/"); // if biometic is not support route back to main page
            }
        }

        checkForHardware(); // on loading the app check for hardware support for biometry 
    }, []);

    const handleAuthentication = async () => {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Authenticate to unlock",
                fallbackLabel: "Use device PIN",
            });

            if (result.success) {
                await setAuthenticated(true);
                // Use replace if there's no back navigation possible
                if (router.canGoBack()) {
                    router.back(); // Go to the previous screen
                } else {
                    router.replace("/"); // Go to the main screen if no previous screen
                }
            } else {
                Alert.alert("Failed", "Authentication failed.");
            }
        } catch (error) {
            Alert.alert("Error", "Authentication error occurred.");
        }
    };

    if (!isSupported) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>App Locked</Text>
            <Text style={styles.subtitle}>
                Use fingerprint or Face ID to unlock.
            </Text>
            <Button title="Authenticate" onPress={handleAuthentication} />
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
