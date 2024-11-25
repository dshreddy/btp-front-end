import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "@/context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

const Profile = () => {
  const router = useRouter();
  const { state, setState } = useContext(AuthContext);
  const [name, setName] = useState(state?.user?.name || "");
  const [email, setEmail] = useState(state?.user?.email || "");
  const [password, setPassword] = useState(state?.user?.password || "");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleUpdateProfile = async () => {
    setIsLoading(true); // Start loading
    try {
      // Validation: Ensure at least one field is provided
      if (!name.trim() && !password.trim()) {
        alert("Both name and password cannot be empty");
        setIsLoading(false); // Stop loading
        return;
      }

      // Validation: Password length
      if (password.trim() && password.length < 6) {
        alert("Password must be at least 6 characters long");
        setIsLoading(false); // Stop loading
        return;
      }

      const role = await AsyncStorage.getItem("role"); // Get the user's role

      // API call to update user profile
      const { data } = await axios.put(`${role}/update`, {
        email,
        name: name.trim(),
        password: password.trim(),
      });

      // Update local state with the updated user data
      setState((prevState) => ({ ...prevState, user: data.user }));

      // Success notification
      alert(data.message || "Profile updated successfully!");
      router.replace(`/`); // Navigate back or refresh
    } catch (error) {
      // Enhanced error handling
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        const serverMessage =
          error.response?.data?.message || "An error occurred.";
        const additionalDetails = JSON.stringify(error.response?.data, null, 2);

        alert(
          `Error ${statusCode || ""
          }: ${serverMessage}\n\nDetails:\n${additionalDetails}`
        );
      } else {
        alert("Unable to connect to the server. Please try again later.");
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
    <LinearGradient
      colors={["#C485F7", "#C485F7", "#9459C6", "#9459C6", "#38006b"]} // Adjust colors to match your design
      style={{ flex: 1 }}
    >
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
            style={[styles.button, isLoading && styles.disabledButton]}
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

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
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
  button: {
    marginBottom: 8,
    marginHorizontal: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#6a1b9a", // Purple background color for the button
    elevation: 2,
    alignSelf: "stretch",
  },
  disabledButton: {
    backgroundColor: "#a5d6a7", // Lighter green when disabled
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default Profile;
