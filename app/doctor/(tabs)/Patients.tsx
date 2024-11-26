import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { AuthContext } from "@/context/authContext";
import { Ionicons } from "@expo/vector-icons";

const Patients = () => {
  const router = useRouter();
  const { state } = useContext(AuthContext);
  const [doctor] = useState(state.user);
  const [searchText, setSearchText] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/doctor/getPatients", {
        doctorId: doctor._id,
      });
      // response.data.patients.forEach((p, i) => {
      //   p.medicines.forEach((m, i) => {
      //     console.log(m.name);
      //   });
      // });
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

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDeletePatient = async (patientId) => {
    try {
      const response = await axios.post(`/doctor/deletePatient`, {
        doctorId: doctor._id, // Pass the current doctor's ID
        patientId, // Pass the selected patient's ID
      });

      if (response.data.success) {
        // Remove the deleted patient from the local state
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient._id !== patientId)
        );
        alert("Patient deleted successfully!");
      } else {
        alert(response.data.message || "Failed to delete patient.");
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("An error occurred while deleting the patient. Please try again.");
    }
  };

  return (
    <LinearGradient
      colors={["#C485F7", "#C485F7", "#9459C6", "#9459C6", "#38006b"]} // Adjust colors to match your design
      style={{ flex: 1 }}
    >
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
              <View style={styles.card}>
                <View style={styles.detailsContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/doctor/PatientDetails",
                        params: item,
                      })
                    }
                  >
                    <Text style={styles.cardText}>
                      <Text style={styles.label}>Name:</Text> {item.name}
                    </Text>
                    <Text style={styles.cardText}>
                      <Text style={styles.label}>DOB:</Text> {item.dob}
                    </Text>
                    <Text style={styles.cardText}>
                      <Text style={styles.label}>Gender:</Text> {item.gender}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.iconContainer}>
                  {/* Delete Icon */}
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleDeletePatient(item._id)}
                  >
                    <Ionicons name="trash-outline" size={24} color="#f44336" />
                  </TouchableOpacity>
                </View>
              </View>
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
  container: {
    flex: 1,
    padding: 20,
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
    marginBottom: 10,
    flexDirection: "row", // Arrange details and icons side by side
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 3, // Take more space for details
    flexDirection: "column", // Arrange name, dob, gender in a column
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
  iconContainer: {
    flex: 1, // Take less space for icons
    flexDirection: "column", // Arrange icons in a column
    justifyContent: "space-evenly", // Space out the icons vertically
    alignItems: "center", // Center align icons
  },
  iconButton: {
    marginLeft: 10,
    marginBottom: 10,
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
});

export default Patients;
