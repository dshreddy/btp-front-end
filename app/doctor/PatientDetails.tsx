import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AddGameModal from "@/components/doctor/PatientDetails/AddGameModal";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

const PatientDetails = () => {
  const router = useRouter();
  const patient = useLocalSearchParams();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "medicines", title: "Medicines" },
    { key: "games", title: "Games" },
    { key: "activity", title: "Activity" },
  ]);

  const [medicines, setMedicines] = useState([]);
  const [games, setGames] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [isAddGameModalVisible, setIsAddGameModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Medicines
      let response = await axios.post("/patient/getMedicines", {
        patientId: patient._id,
      });
      setMedicines(response.data.medicines || []);

      // Fetch Games
      response = await axios.post("/patient/getGames", {
        patientId: patient._id,
      });
      setGames(response.data.games || []);

      // Fetch Activity
      response = await axios.post("/patient/getActivity", {
        patientId: patient._id,
      });
      setActivityData(response.data.activity || []);
    } catch (error) {
      alert("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMedicine = async (medicineId) => {
    const patientId = patient._id;

    try {
      const response = await axios.post("/patient/deleteMedicine", {
        patientId,
        medicineId,
      });

      if (response.data.success) {
        // Update the local medicines list
        setMedicines((prevMedicines) =>
          prevMedicines.filter(
            (medicine) => medicine.medicine._id !== medicineId
          )
        );
        alert("Medicine deleted successfully!");
      } else {
        alert("Failed to delete medicine. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting medicine:", error);
      alert("An error occurred while deleting the medicine. Please try again.");
    }
  };

  const handleDeleteGame = async (gameId) => {
    const patientId = patient._id;

    try {
      const response = await axios.post("/patient/deleteGame", {
        patientId,
        gameId,
      });

      if (response.data.success) {
        // Update the local games list
        setGames((prevGames) =>
          prevGames.filter((game) => game._id !== gameId)
        );
        alert("Game deleted successfully!");
      } else {
        alert("Failed to delete game. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting game:", error);
      alert("An error occurred while deleting the game. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [patient._id]);

  // Medicines Tab Content
  const MedicinesTab = () => (
    <View style={styles.tabContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={medicines}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <View style={styles.medicineCard}>
              <View style={styles.medicineLeftColumn}>
                <Text style={styles.medicineName}>{item.medicine.name}</Text>
                {item.medicine.image && (
                  <Image
                    source={{ uri: item.medicine.image }}
                    style={styles.medicineImage}
                  />
                )}
              </View>
              <View style={styles.medicineRightColumn}>
                <Text>
                  Start Date: {new Date(item.startDate).toDateString()}
                </Text>
                <Text>End Date: {new Date(item.endDate).toDateString()}</Text>
                <Text>{item.mealTime} meal</Text>
                <Text>Dosage: {item.dosage}</Text>
                <Text>Dosage Times: {item.dosageTimes.join(", ")}</Text>
              </View>
              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeleteMedicine(item.medicine._id)}
                >
                  <Ionicons
                    name="trash"
                    size={20}
                    color="#e53935" // Red for delete
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No medicines added.</Text>
          }
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          router.push({
            pathname: "/doctor/AddMedicine",
            params: patient,
          });
        }}
      >
        <Text style={styles.addButtonText}>+ Add Medicine</Text>
      </TouchableOpacity>
    </View>
  );

  // Games Tab Content
  const GamesTab = () => (
    <View style={styles.tabContainer}>
      <FlatList
        data={games}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <View style={styles.medicineCard}>
            <View style={styles.medicineLeftColumn}>
              <Image source={{ uri: item.logo }} style={styles.cardImage} />
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDeleteGame(item._id)}
              >
                <Ionicons
                  name="trash"
                  size={20}
                  color="#e53935" // Red for delete
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id} // Ensure each item has a unique key
        ListEmptyComponent={
          <Text style={styles.emptyText}>No games added.</Text>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setIsAddGameModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>+ Add Game</Text>
      </TouchableOpacity>
      <AddGameModal
        patientId={patient._id}
        visible={isAddGameModalVisible}
        onClose={() => {
          setIsAddGameModalVisible(false);
        }}
      />
    </View>
  );

  // Activity Tab Content
  const ActivityTab = () => (
    <View style={styles.tabContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : activityData.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollableContainer}>
          {activityData.map((activity, index) => (
            <View key={index} style={styles.chartContainer}>
              <Text style={styles.chartTitle}>{activity.gameName}</Text>
              <LineChart
                data={{
                  labels: Array.from(
                    { length: activity.scores.length },
                    (_, i) => `${i + 1}`
                  ),
                  datasets: [
                    {
                      data: activity.scores,
                    },
                  ],
                }}
                width={Dimensions.get("window").width * 0.87}
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
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.emptyText}>No activity data available.</Text>
      )}
    </View>
  );

  const renderScene = SceneMap({
    medicines: MedicinesTab,
    games: GamesTab,
    activity: ActivityTab,
  });

  // Custom Tab Bar
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      renderLabel={({ route, focused }) => (
        <View
          style={[
            styles.tabLabelContainer,
            { backgroundColor: focused ? "#6a1b9a" : "#C485F7" },
          ]}
        >
          <Text style={styles.tabLabel}>{route.title}</Text>
        </View>
      )}
      indicatorStyle={styles.indicator}
    />
  );

  return (
    <LinearGradient
      colors={["#C485F7", "#9459C6", "#662F97"]}
      style={styles.gradientBackground}
    >
      <View style={styles.userInfo}>
        <Text style={styles.headerText}>Patient Details</Text>
        <View style={styles.userInfoItem}>
          <Text style={styles.infoKey}>Name:</Text>
          <Text style={styles.infoValue}>{patient.name}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.infoKey}>DOB:</Text>
          <Text style={styles.infoValue}>{patient.dob}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.infoKey}>Gender:</Text>
          <Text style={styles.infoValue}>{patient.gender}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.infoKey}>Mobile:</Text>
          <Text style={styles.infoValue}>{patient.mobile}</Text>
        </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={renderTabBar} // Custom Tab Bar
        style={styles.tabView}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  userInfo: {
    margin: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#38006b",
    marginBottom: 10,
    textAlign: "center",
  },
  userInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  infoKey: {
    fontSize: 16,
    color: "#38006b",
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 16,
    color: "#000",
  },
  tabView: {
    flex: 1,
    marginTop: 10,
  },
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  addButton: {
    marginBottom: 8,
    marginHorizontal: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#6a1b9a", // Purple background color for the button
    elevation: 2,
    alignSelf: "stretch",
  },
  addButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  tabBar: {
    backgroundColor: "transparent", // Transparent background to blend with gradient
    elevation: 0, // Remove shadow
  },
  tabLabelContainer: {
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff", // White text color for contrast
  },
  indicator: {
    height: 1,
  },
  medicineCard: {
    marginVertical: 5, // Vertical margin between each card
    padding: 15, // Padding inside the card
    backgroundColor: "#fff", // White background for the card
    borderRadius: 8, // Rounded corners
    shadowColor: "#000", // Shadow for elevation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
    marginHorizontal: 10, // Horizontal margin for spacing the card from other elements
    flexDirection: "row", // Row direction for two columns inside the card
    alignItems: "flex-start", // Align items to the top of the card
    justifyContent: "space-between", // Space between the two columns
    width: "94%",
    marginEnd: 10,
  },
  medicineLeftColumn: {
    flex: 1, // Take up 1/2 of the space in the row
    justifyContent: "flex-start",
    alignItems: "flex-start", // Align content to the left in the column
  },
  medicineRightColumn: {
    flex: 2, // Take up the other 1/2 of the space in the row
    justifyContent: "flex-start",
    alignItems: "flex-start", // Align content to the left in the column
  },
  medicineName: { fontSize: 16, fontWeight: "bold" },
  medicineImage: { width: 50, height: 50, marginTop: 5 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  scrollableContainer: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  chartContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  actionButtonsContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 8,
  },
  actionButton: {
    marginLeft: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PatientDetails;
