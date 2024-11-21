import { AuthContext } from "@/context/authContext";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function DoctorLayout() {
  const { state } = useContext(AuthContext);

  // Redirect to login if user did not login
  if (!state.user) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="Games" options={{ headerShown: false }} />
          <Stack.Screen
            name="PatientDetails"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AddMedicine" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
