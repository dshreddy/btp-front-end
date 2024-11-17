import { Tabs, Redirect } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function DoctorTabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          let rn = route.name;
          if (rn === "Dashboard") {
            iconName = "home";
          } else if (rn === "Profile") {
            iconName = "person";
          } else {
            iconName = "people";
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
      <Tabs.Screen name="Dashboard" />
      <Tabs.Screen name="Patients" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  );
}
