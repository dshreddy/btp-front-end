import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { AuthContext } from "@/context/authContext";

const Dashboard = () => {
  const router = useRouter();
  const { state } = useContext(AuthContext);
  const [caretaker] = useState(state.user);
  const [searchText, setSearchText] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/caretaker/getPatients", {
        caretakerId: caretaker._id,
      });
      setPatients(response.data.patients || []);
    } catch (error) {
      alert("Failed to fetch patients. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPatients(); // Refetch patients when the tab is focused
    }, []) // Empty dependency array ensures it only runs when the component is focused
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleString('en-US', {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedTime;
  };

  const sendNotification = async (patient: never) => {
    try {
      await axios.post("/caretaker/notifyPatient", {
        patientId: patient._id,
      });
      alert(`Notification sent to ${patient.name}!`);
    } catch (error) {
      alert(`Failed to send notification. Please try again.`);
    }
  }

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <LinearGradient
      colors={["#C485F7", "#C485F7", "#9459C6", "#9459C6", "#38006b"]} // Adjust colors to match your design
      style={{ flex: 1 }}
    >
      <View style={styles.stickyHeader}>
        <View style={styles.userContainer}>
          <Text style={styles.header}>Welcome!</Text>
          <Text style={styles.userDetails}>
            How are your patients doing today 😊, {state.user.name}?
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search patients..."
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <FlatList
            data={filteredPatients}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  router.push({
                    pathname: "/caretaker/PatientDetails",
                    params: item,
                  })
                }
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "column" }}>
                    {/* Patient card  */}
                    <View style={[styles.card, styles.patientCard]}>
                      <Image
                        source={require("@/assets/caretaker/patient.png")}
                        style={styles.profileImage}
                      />
                      <Text style={styles.nameText}>{item.name}</Text>
                      <Text style={styles.detailsText}>Age: {item.dob}</Text>
                    </View>
                    {/* Notify Button */}
                    <TouchableOpacity
                      style={styles.notifyButton}
                      onPress={() => sendNotification(item)}
                    >
                      <Text style={styles.notifyButtonText}>Notify</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Medication card */}
                  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator>
                    <View style={styles.noMedicationContainer}>
                      <Text style={{ color: 'white', alignSelf: 'center', fontSize: 16 }}>
                        No medication information available!!!
                      </Text>
                    </View>
                  </ScrollView>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.noPatients}>No patients found.</Text>
            }

          />
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green',
  },
  subtitle: {
    fontSize: 24,
    color: '#333',
    marginTop: 10,
  },
  content: {
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    color: '#444444',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  stickyHeader: {
    backgroundColor: "#6A1B9A", // Or any other color matching your theme
    marginBottom: 8,
  },
  userContainer: {
    padding: 8,
    alignItems: "center",
    backgroundColor: "#6A1B9A", // Or any other color matching your theme
  },
  userDetails: {
    fontSize: 14,
    color: "#f4f1f4",
    marginBottom: 8,
  },
  searchBar: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 0,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  noPatients: {
    textAlign: "center",
    color: "#555",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  patientCard: {
    backgroundColor: '#9C27B0', // Or your theme color
    marginRight: 8
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  nameText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsText: {
    color: '#fff',
    fontSize: 14,
  },
  medicationCard: {
    backgroundColor: '#E1BEE7',
    marginVertical: 5, // Add spacing between cards
  },
  medicationTitle: {
    color: '#4A148C', // Darker theme color for contrast
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  medicationDetail: {
    backgroundColor: '#F3E5F5', // Even lighter shade
    borderRadius: 5,
    marginBottom: 5,
    padding: 5,
  },
  medName: {
    color: '#4A148C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  medDetail: {
    color: '#6A1B9A',
    fontSize: 14,
  },
  scrollView: {
    // You can set a maximum height to constrain the scroll view, if needed
    maxHeight: 300, // or whatever height you desire
  },
  noMedicationContainer: {
    backgroundColor: '#38006b',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 155
  },

  notifyButton: {
    marginTop: 8,
    padding: 10,
    backgroundColor: "#f50057",
    borderRadius: 8,
    alignItems: "center",
  },
  notifyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Dashboard;
