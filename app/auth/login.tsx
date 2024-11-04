import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Platform,
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useContext, useState } from "react";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AuthContext } from "@/context/authContext";

const login = () => {
  const router = useRouter();

  //global state
  const { state, setState } = useContext(AuthContext);

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogIn = async () => {
    const role = await AsyncStorage.getItem("role");

    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }

      const { data } = await axios.post(`${role}/login`, {
        email,
        password,
      });

      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      setState(data);

      alert(data && data.message);
      router.push(`${role}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "An error occurred");
      } else {
        alert("An unexpected error occurred");
      }
      setLoading(false);
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

        {/* Email */}
        <TextInput
          placeholderTextColor={"#AEAEAE"}
          placeholder="Email"
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
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

        {/* Login button */}
        <Pressable
          onPress={handleLogIn}
          style={[styles.btn, { marginTop: 20 }]}
        >
          <Icon
            name="login-variant"
            size={25}
            style={{ marginTop: 10, marginRight: 0 }}
            color="black"
          />
          <Text style={styles.btnText}>
            {loading ? "Loggin in..." : "Login"}
          </Text>
        </Pressable>

        {/* Face ID button */}
        <Pressable style={[styles.btn, { marginTop: 20 }]}>
          <Icon
            name="face-recognition"
            size={25}
            style={{ marginTop: 10, marginRight: 0 }}
            color="black"
          />
          <Text style={styles.btnText}>Face ID</Text>
        </Pressable>

        {/* Sign up navigation */}
        <Pressable style={styles.signUpContainer}>
          <Text style={styles.noAccountLabel}>
            Don't have an account?{"  "}
            <Link href="/auth/signup">
              <Text style={styles.signUpLabel}>Create an account</Text>
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
    color: "#62a8c3",
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
    // padding: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",

    alignSelf: "center",
    borderRadius: 5,
    width: "80%",
    marginTop: 20,

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
    color: "#000",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 8,
  },
  signUpContainer: {
    marginTop: 80,
  },
  noAccountLabel: {
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
  signUpLabel: {
    color: "#1d9bf0",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 175,
    height: 175,
    alignSelf: "center",
  },
});

export default login;
