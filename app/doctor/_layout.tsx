import { Tabs, Redirect } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

export default function DoctorLayout() {
  const { state } = useContext(AuthContext);

  // Redirect to login if user did not login
  if (!state.user) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Tabs
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = "";
              let rn = route.name;
              if (rn === "dashboard") {
                iconName = focused ? "home" : "home-outline";
              } else if (rn === "profile") {
                iconName = focused ? "person" : "person-outline";
              } else {
                iconName = focused ? "people" : "people-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#62a8c3",
            tabBarInactiveTintColor: "white",
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#6a1b9a", // Background color of the tab bar
              paddingBottom: 2,
            },
          })}
        >
          <Tabs.Screen name="profile" />
          <Tabs.Screen name="dashboard" />
          <Tabs.Screen name="patients" />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
