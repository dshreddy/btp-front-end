import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const Patients = () => {
  const router = useRouter(); // Use Expo Router's useRouter hook
  const [searchText, setSearchText] = useState("");
  const [patients] = useState([
    { id: "1", name: "John Doe", dob: "1987-05-15", gender: "Male" },
    { id: "2", name: "Jane Smith", dob: "1993-03-10", gender: "Female" },
    { id: "3", name: "Jane Smith", dob: "1993-03-10", gender: "Female" },
    { id: "4", name: "Jane Smith", dob: "1993-03-10", gender: "Female" },
    { id: "5", name: "Jane Smith", dob: "1993-03-10", gender: "Female" },
    { id: "6", name: "Jane Smith", dob: "1993-03-10", gender: "Female" },
    { id: "7", name: "Jane Smith", dob: "1993-03-10", gender: "Female" },
    { id: "8", name: "Jane Smith", dob: "1993-03-10", gender: "Female" },
  ]);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search patients..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Patient List */}
      <FlatList
        data={filteredPatients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/doctor/PatientDetails",
                params: {
                  id: item.id,
                  name: item.name,
                  dob: item.dob,
                  gender: item.gender,
                },
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
        )}
        ListEmptyComponent={
          <Text style={styles.noPatients}>No patients found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
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
});

export default Patients;
