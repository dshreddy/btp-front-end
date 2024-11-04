import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Platform,
  Image,
} from "react-native";
import { Link } from "expo-router";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const signup = () => {
  const router = useRouter();

  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    const role = await AsyncStorage.getItem("role");

    try {
      setLoading(true);
      if (!name || !email || !password) {
        alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      const { data } = await axios.post(`${role}/signup`, {
        name,
        email,
        password,
      });

      alert(data.message);
      setLoading(false);
      // Navigate to login screen
      router.push("/auth/login");
    } catch (error) {
      // Check if the error is an instance of AxiosError (if using Axios)
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "An error occurred");
      } else {
        alert("An unexpected error occurred");
      }
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Image
          style={styles.logo}
          source={require("@/assets/common/logo.png")}
        />
        <Text style={styles.appName}>Game Mind</Text>
        <Text style={styles.welcome}>Welcome to the world of healing</Text>

        {/* Name */}
        <TextInput
          placeholderTextColor={"#AEAEAE"}
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />

        {/* Email */}
        <TextInput
          placeholderTextColor={"#AEAEAE"}
          placeholder="Email"
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />

        {/* Password */}
        <TextInput
          placeholderTextColor={"#AEAEAE"}
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        {/* Signup button */}
        <Pressable
          onPress={handleSignUp}
          style={[styles.btn, { marginTop: 20 }]}
        >
          <Text style={styles.btnText}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Text>
        </Pressable>

        {/* Login navigation */}
        <Pressable style={styles.loginContainer}>
          <Text style={styles.haveAccountLabel}>
            Already have an account?{"  "}
            <Link href="/auth/login">
              <Text style={styles.loginLabel}>Login</Text>
            </Link>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  formContainer: {
    justifyContent: "center",
    alignContent: "center",
    height: "100%",
  },
  appName: {
    color: "rgba(134, 65, 244, 1)",
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FCF8FF",
    padding: 10,
    height: 40,
    alignSelf: "center",
    borderRadius: 5,
    width: "80%",
    color: "#000000",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 1,
  },
  errorText: {
    color: "red",
    alignSelf: "center",
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#ffffff",
    padding: 10,
    height: 45,
    alignSelf: "center",
    borderRadius: 5,
    width: "80%",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
  btnText: {
    color: "#484848",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  loginContainer: {
    marginTop: 60,
  },
  haveAccountLabel: {
    color: "#484848",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  welcome: {
    color: "#484848",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 15,
  },
  loginLabel: {
    color: "#1d9bf0",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
});

export default signup;
