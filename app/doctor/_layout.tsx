import { Tabs } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function DoctorLayout() {
  return (
   <Tabs
   screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          let rn = route.name;
          if (rn === "dashboard") {
              iconName = focused ? 'home' : 'home-outline';
          } else {
              iconName = focused ? 'accessibility' : 'accessibility-outline';

          } 
          return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#62a8c3',
      tabBarInactiveTintColor: 'white',
      headerShown: false,
      tabBarStyle: {
          backgroundColor: '#6a1b9a', // Background color of the tab bar
          paddingBottom: 2,
      },
  })}
   >
    <Tabs.Screen
        name="dashboard"
      />
      <Tabs.Screen
        name="patients"
      />
   </Tabs>
  );
}
