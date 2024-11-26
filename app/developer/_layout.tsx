import { AuthContext } from "@/context/authContext";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function DeveloperLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="Game" options={{ headerShown: false }} />
          <Stack.Screen name="UpdateGame" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
