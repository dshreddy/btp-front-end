import { Stack, Slot } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../context/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Slot /> {/* Ensure a Slot is provided to render children */}
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
