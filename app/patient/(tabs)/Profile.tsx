import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "@/context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

const Profile = () => {
  const router = useRouter();
  const { state, setState } = useContext(AuthContext);
  const [name] = useState(state?.user?.name || "");
  const [mobile] = useState(state?.user?.mobile || "");
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivity = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/patient/getActivity", {
        patientId: state?.user?._id,
      });
      setActivityData(response.data.activity || []);
    } catch (error) {
      alert("Failed to fetch activity data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchActivity(); // Refetch activity when the tab is focused
    }, []) // Empty dependency array ensures it only runs when the component is focused
  );

  const handleLogout = async () => {
    const patientId = state?.user?._id || "";
    await axios.post(`patient/removeDeviceToken`, { patientId });
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    await AsyncStorage.removeItem("role");
    alert("Logged out successfully!");
    router.replace("/");
  };

  return (
    <LinearGradient
      colors={["#C485F7", "#9459C6", "#662F97"]}
      style={styles.gradientBackground}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.header}>My Profile</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={name}
            editable={false}
            placeholder="Enter your name"
          />

          <Text style={styles.label}>Mobile</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={mobile}
            editable={false}
            placeholder="Enter your mobile number"
          />
        </View>

        <Text style={styles.subHeader}>Activity Data</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          activityData.map((activity, index) => (
            <View key={index} style={styles.chartContainer}>
              <Text style={styles.chartTitle}>{activity.gameName}</Text>
              <LineChart
                data={{
                  labels: Array.from(
                    { length: activity.scores.length },
                    (_, i) => (i === 0 ? `Attempt ${i + 1}` : `${i + 1}`)
                  ),
                  datasets: [
                    {
                      data: activity.scores,
                    },
                  ],
                }}
                width={Dimensions.get("window").width - 40}
                height={220}
                chartConfig={{
                  backgroundColor: "#1E2923",
                  backgroundGradientFrom: "#F5F9FA",
                  backgroundGradientTo: "#FFFFFF",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "4",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  paddingLeft: 0,
                }}
              />
            </View>
          ))
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  disabledInput: {
    backgroundColor: "#eaeaea",
    color: "#999",
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 8,
    marginHorizontal: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F8F8F8",
    elevation: 2,
    alignSelf: "stretch",
    alignItems: "center",
  },
  logoutText: {
    color: "#6a1b9a",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
