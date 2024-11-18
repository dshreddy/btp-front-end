import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { BioAuthContext } from "@/context/bioAuthContext";

const AppLock = () => {
    const { setAuthenticated } = useContext(BioAuthContext);

    const handleAuthentication = async () => {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Authenticate to unlock",
                fallbackLabel: "Use device PIN",
            });

            if (result.success) {
                await setAuthenticated(true);
            } else {
                Alert.alert("Failed", "Authentication failed.");
            }
        } catch (error) {
            Alert.alert("Error", "Authentication error occurred.");
        }
    };

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
