import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AuthContext } from "@/context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import axios from "axios";

const Profile = () => {
  const router = useRouter();
  const { state, setState } = useContext(AuthContext);
  const [name, setName] = useState(state?.user?.name || "");
  const [email, setEmail] = useState(state?.user?.email || "");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleUpdateProfile = async () => {
    setIsLoading(true); // Start loading
    try {
      if (!name && !password) {
        Alert.alert("Error", "Please fill in at least one field to update.");
        setIsLoading(false); // Stop loading
        return;
      }
      const role = await AsyncStorage.getItem("role");
      const { data } = await axios.put(`${role}/update`, {
        name,
        password,
      });

      Alert.alert("Success", data.message || "Profile updated successfully!");
      router.replace(`/`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        const serverMessage = error.response?.data?.message;
        const additionalDetails = JSON.stringify(error.response?.data, null, 2);

        Alert.alert(
          "Profile Update Failed",
          `Error: ${
            serverMessage || "An unexpected error occurred."
          }\n\nDetails:\n${additionalDetails}`
        );
      } else {
        Alert.alert(
          "Profile Update Failed",
          "Unable to connect to the server."
        );
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    await AsyncStorage.removeItem("role");
    alert("Logged out successfully!");
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Profile</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={email}
          editable={false}
          placeholder="Email address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter new password"
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.updateButton, isLoading && styles.disabledButton]}
          onPress={handleUpdateProfile}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Update Profile</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  disabledInput: {
    backgroundColor: "#eaeaea",
    color: "#999",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#a5d6a7", // Lighter green when disabled
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
