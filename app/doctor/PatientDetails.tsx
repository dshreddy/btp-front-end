import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const PatientDetails = () => {
  const params = useLocalSearchParams();

  console.log("Params:", params); // Contains id, name, dob, gender

  return (
    <View>
      <Text>Patient Name: {params.name}</Text>
      <Text>Patient DOB: {params.dob}</Text>
      <Text>Patient Gender: {params.gender}</Text>
    </View>
  );
};

export default PatientDetails;
