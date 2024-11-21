import { Redirect, Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

export default function PatientLayout() {
  const { state } = useContext(AuthContext);

  // Redirect to login if user did not login
  if (!state.user) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="Game" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
