import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import AddMedicineModal from "../../../components/AddMedineModal";
import AddPatientModal from "../../../components/AddPatientModal";

const Dashboard = () => {
  const { state } = useContext(AuthContext);
  const [addMedicineModalVisible, setAddMedicineModalVisible] = useState(false);
  const [addPatientModalVisible, setAddPatientModalVisible] = useState(false);

  return (
    <LinearGradient
      colors={["#C485F7", "#C485F7", "#9459C6", "#9459C6", "#38006b"]} // Adjust colors to match your design
      style={styles.backgroundGradient}
    >
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={styles.stickyHeader}>
          <View style={styles.userContainer}>
            <Text style={styles.header}>Welcome!</Text>
            <Text style={styles.userDetails}>
              How are you doing today, {state.user.name}?
            </Text>
          </View>
        </View>

        <Text style={styles.header}>Add Medicine</Text>
        <TouchableOpacity
          onPress={() => setAddMedicineModalVisible(true)}
          style={styles.card}
        >
          <Image
            source={require("../../../assets/doctor/add_medicine.png")}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            {/* <Text style={styles.cardTitle}>Add Medicine</Text> */}
            <Text style={styles.cardDescription}>
              Tap here to add a new medicine for future prescriptions.
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.header}>Register Patient</Text>
        <TouchableOpacity
          onPress={() => setAddPatientModalVisible(true)}
          style={styles.card}
        >
          <Image
            source={require("../../../assets/doctor/add_patient.png")}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardDescription}>
              Tap here to add a new patient to your records.
            </Text>
          </View>
        </TouchableOpacity>

        <AddMedicineModal
          visible={addMedicineModalVisible}
          onClose={() => setAddMedicineModalVisible(false)}
        />

        <AddPatientModal
          visible={addPatientModalVisible}
          onClose={() => setAddPatientModalVisible(false)}
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  backgroundGradient: {
    flex: 1,
  },
  continer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  stickyHeader: {
    backgroundColor: "#6A1B9A", // Or any other color matching your theme
    marginBottom: 8,
  },
  header: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  smallText: {
    color: "#000000",
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
  cardTitle: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  modalContent: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderColor: "#f4f1f4",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f4f1f4", // Deep purple background color
    borderRadius: 6,
    padding: 10,
    justifyContent: "flex-start", // Align to the start of the container
    alignItems: "center", // Center items vertically
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  cardImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    marginRight: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: "#38006b",
  },
  btn: {
    backgroundColor: "rgba(134, 65, 244, 1)",
    padding: 10,
    height: 45,
    alignSelf: "center",
    borderRadius: 5,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  btnText: {
    color: "#f4f1f4",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  label: {
    fontSize: 16,
    color: "#f4f1f4",
    paddingBottom: 8,
    // Add any other styling you need for the label
  },
  pickerContainer: {
    borderColor: "#f4f1f4",
    borderWidth: 1,
    paddingBottom: 16,
    borderRadius: 1,
    marginBottom: 12,
  },
  picker: {
    height: 40,
    width: "100%",
  },
  imagePickerButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  imagePickerText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  previewImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#A5D6A7" },
  addButtonText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  cancelButton: {
    backgroundColor: "#f44336",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
});
