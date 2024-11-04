import { Tabs } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function PatientLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Tabs
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = "";
              let rn = route.name;
              if (route.name === "profile") {
                iconName = focused ? "accessibility" : "accessibility-outline";
              } else if (route.name === "gameHub") {
                iconName = focused
                  ? "game-controller"
                  : "game-controller-outline";
              } else if (route.name === "journey") {
                iconName = focused ? "map" : "map-outline";
              } else if (route.name === "zen") {
                iconName = focused ? "happy" : "happy-outline";
              } else if (route.name === "log") {
                iconName = focused ? "pencil" : "pencil-outline";
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
          <Tabs.Screen name="gameHub" />
          <Tabs.Screen name="journey" />
          <Tabs.Screen name="zen" />
          <Tabs.Screen name="log" />
          <Tabs.Screen name="profile" />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
