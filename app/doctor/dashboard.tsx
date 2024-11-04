import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "@/context/authContext";

const Dashboard = () => {
  const { state } = useContext(AuthContext);

  return (
    <View>
      <Text>Dashboard</Text>
      <Text>{JSON.stringify(state)}</Text>
    </View>
  );
};

export default Dashboard;
