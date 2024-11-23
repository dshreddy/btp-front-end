import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import axios from "axios";
import { AuthContext } from "@/context/authContext";

const AddPatientModal = ({ visible, onClose }) => {
  const { state } = useContext(AuthContext);
  const [doctor] = useState(state.user);
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    mobile: "",
    password: "",
    caretakerEmail: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleAddPatient = async () => {
    const { name, dob, gender, mobile, password, caretakerEmail } = form;

    if (!name || !dob || !gender || !mobile || !password || !caretakerEmail) {
      Alert.alert("Validation Error", "All fields are required!");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put("/doctor/addPatient", {
        doctor,
        name,
        dob,
        gender,
        mobile,
        password,
        caretakerEmail,
      });
      Alert.alert("Success", response.data.message || "Patient added!");
      onClose(); // Close modal
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to add patient."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Add New Patient</Text>

          {/* Input Fields */}
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={form.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="DOB (YYYY-MM-DD)"
            value={form.dob}
            onChangeText={(text) => handleInputChange("dob", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={form.gender}
            onChangeText={(text) => handleInputChange("gender", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            value={form.mobile}
            onChangeText={(text) => handleInputChange("mobile", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Caretaker Email"
            keyboardType="email-address"
            value={form.caretakerEmail}
            onChangeText={(text) => handleInputChange("caretakerEmail", text)}
          />

          {/* Buttons */}
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleAddPatient}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? "Adding..." : "Submit"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    margin: 20,
    padding: 20,
    backgroundColor: "#C485F7",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    color: "#fff",
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#6a1b9a",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#A5D6A7" },
  submitButtonText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  cancelButton: {
    backgroundColor: "#6a1b9a",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
});

export default AddPatientModal;
