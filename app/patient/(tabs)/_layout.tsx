import { Redirect, Tabs } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function PatientTabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          let rn = route.name;
          if (route.name === "Profile") {
            iconName = "person";
          } else if (route.name === "GameHub") {
            iconName = "game-controller";
          } else if (route.name === "Journey") {
            iconName = "map";
          } else if (route.name === "Zen") {
            iconName = "happy";
          } else if (route.name === "Log") {
            iconName = "pencil";
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
      <Tabs.Screen name="GameHub" />
      <Tabs.Screen name="Journey" />
      <Tabs.Screen name="Zen" />
      <Tabs.Screen name="Log" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  );
}
