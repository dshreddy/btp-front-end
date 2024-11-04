import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "@/context/authContext";

const GameHub = () => {
  const { state } = useContext(AuthContext);

  return (
    <View>
      <Text>GameHub</Text>
      <Text>{JSON.stringify(state)}</Text>
    </View>
  );
};

export default GameHub;
