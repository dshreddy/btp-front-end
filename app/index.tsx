import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export default function Index() {
  const router = useRouter();

  // Redirect to respective screen if user has logged in previously
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       let data = await AsyncStorage.getItem("@auth");
  //       const loginData = data ? JSON.parse(data) : null;
  //       const role = await AsyncStorage.getItem("role");

  //       if (loginData?.token && role) {
  //         // Decode the JWT token
  //         const decoded = jwtDecode(loginData.token);
  //         const currentTime = Date.now() / 1000;

  //         if (decoded.exp > currentTime) {
  //           // Token is valid, redirect to the respective dashboard
  //           router.replace(`/auth/testHome`);
  //         } else {
  //           // Token expired, go to login
  //           router.replace("/");
  //         }
  //       } else {
  //         // Missing token or role, go to login
  //         router.replace("/");
  //       }
  //     } catch (error) {
  //       router.replace("/");
  //     }
  //   };
  //   checkAuth();
  // }, []);

  const onPress = async (category: string) => {
    await AsyncStorage.setItem("role", category);
    router.push({ pathname: "/auth/login", params: { role: category } });
  };

  return (
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
    </View>
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
