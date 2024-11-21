import { Tabs } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function DeveloperLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          // Map route names to icons
          switch (route.name) {
            case "AddGame":
              iconName = focused ? "add-circle" : "add-circle-outline";
              break;
            case "Games":
              iconName = focused
                ? "game-controller"
                : "game-controller-outline";
              break;
            case "Profile":
              iconName = "person";
              break;
            default:
              iconName = "help-circle-outline"; // Default fallback icon
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
      <Tabs.Screen name="AddGame" />
      <Tabs.Screen name="Games" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  );
}
