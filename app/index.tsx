import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "@/context/authContext";
import { BioAuthContext } from "@/context/bioAuthContext";
import AppLock from "@/components/AppLock";

export default function Index() {
  const router = useRouter();
  //global state
  const { state } = useContext(AuthContext);
  const { isAuthenticated } = useContext(BioAuthContext);

  //Redirect to respective screen if user has logged in previously
  const checkAuth = async () => {
    try {
      const role = await AsyncStorage.getItem("role");
      //auth condition true false
      const authenticatedUser = state?.user && state?.token !== "" && role;
      if (authenticatedUser) {
        // Decode the JWT token
        const decoded = jwtDecode(state.token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          // Token is valid, redirect to the respective dashboard
          router.replace(`${role}`);
        }
      }
    } catch (error) { }
  };
  checkAuth();

  const onPress = async (category: string) => {
    await AsyncStorage.setItem("role", category);
    router.push("/auth/Login");
  };

  return (
    <>
      {isAuthenticated ?
        <View style={styles.mainContainer}>
          <Text style={styles.appName}>Game Mind</Text>

          <TouchableOpacity
            style={styles.container}
            onPress={() => onPress("doctor")}
          >
            <Image
              style={styles.logo}
              source={require("@/assets/common/doctor.jpg")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.container}
            onPress={() => onPress("patient")}
          >
            <Image
              style={styles.logo}
              source={require("@/assets/common/patient.jpg")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.container}
            onPress={() => onPress("caretaker")}
          >
            <Image
              style={styles.logo}
              source={require("@/assets/common/caretaker.jpg")}
            />
          </TouchableOpacity>
        </View> :
        <AppLock />
      }

    </>


  );
}

const styles = StyleSheet.create({
  appName: {
    color: "#62a8c3",
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#F5F9FA",
    borderRadius: 8,
    padding: 0,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "45%",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    alignItems: "center",
  },
});
