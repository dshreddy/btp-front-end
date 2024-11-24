import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  Image,
} from "react-native";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { AuthContext } from "@/context/authContext";
import { usePushNotifications } from "@/components/usePushNotifications";


const updatePatientDevice = async (patientId: any, deviceToken: string | undefined) => {
  try {
    const response = await axios.post(`patient/updateDeviceToken`, { patientId, deviceToken });
  }
  catch (error) {
    const errorMessage =
      axios.isAxiosError(error)
        ? error.message
        : "An error occurred. Please try again.";
    alert(errorMessage);
  }

}

const Login = () => {
  let expoPushToken;

  if (Platform.OS !== "web") {
    const { expoPushToken: token } = usePushNotifications();
    expoPushToken = token;
  }
  const router = useRouter();

  // Global state
  const { setState } = useContext(AuthContext);

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      const storedRole = await AsyncStorage.getItem("role");
      setRole(storedRole);
    };
    fetchRole();
  }, []);

  const handleLogIn = async () => {
    setLoading(true); // Start loading
    try {
      if (!email || !password) {
        alert("Please fill in all fields.");
        setLoading(false);
        return;
      }

      const { data } = await axios.post(`${role}/login`, { email, password });

      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      setState(data);

      alert(data.message || "Login successful!");


      if (role === "patient" && Platform.OS !== "web") {
        let patientId = data.user._id;
        let deviceToken = expoPushToken?.data;
        updatePatientDevice(patientId, deviceToken);
      }

      router.replace(`${role}`);

    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false); // Stop loading
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

        {/* Email Input */}
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder={
            role === "patient" ? "Enter your email" : "Enter your mobile number"
          }
          placeholderTextColor="#AEAEAE"
          keyboardType="email-address"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          placeholderTextColor="#AEAEAE"
          secureTextEntry
        />

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.btn]}
          onPress={handleLogIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.btnText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Conditionally render Sign Up Link */}
        {role !== "patient" && (
          <View style={styles.signUpContainer}>
            <Text style={styles.noAccountLabel}>
              Don't have an account?{" "}
              <Link href="/auth/Signup">
                <Text style={styles.signUpLabel}>Signup</Text>
              </Link>
            </Text>
          </View>
        )}
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

export default Login;
