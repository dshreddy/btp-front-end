import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { AuthContext } from "@/context/authContext";

const AddMedicineModal = ({ visible, onClose }) => {
  const { state, setState } = useContext(AuthContext);
  const [doctor] = useState(state.user);
  const [medicineName, setMedicineName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
      });

      if (!result.canceled) {
        setImage(result);
      }
      onClose(); // Close modal
    } catch (error) {
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  const handleAddMedicine = async () => {
    if (!medicineName) {
      Alert.alert("Validation Error", "Medicine name cannot be empty!");
      return;
    }
    if (!image) {
      Alert.alert("Validation Error", "Please select an image!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put("/doctor/addMedicine", {
        doctor,
        medicineName,
        image: `data:image/png;base64,${image.assets[0].base64}`,
      });

      // Update local state with the updated user data
      setState((prevState) => ({ ...prevState, user: response.user }));
      onClose(); // Close modal
    } catch (error) {
      console.error("Error adding medicine:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to add medicine."
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
          <Text style={styles.modalHeader}>Add New Medicine</Text>

          {/* Medicine Name */}
          <TextInput
            style={styles.input}
            placeholder="Medicine Name"
            value={medicineName}
            onChangeText={setMedicineName}
          />

          {/* Image Picker */}
          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={openImagePicker}
          >
            <Text style={styles.imagePickerText}>
              {image ? "Change Image" : "Pick Image"}
            </Text>
          </TouchableOpacity>

          {image && (
            <Image
              source={{ uri: image.assets[0].uri }}
              style={styles.previewImage}
            />
          )}

          {/* Add Button */}
          <TouchableOpacity
            style={[styles.addButton, loading && styles.disabledButton]}
            onPress={handleAddMedicine}
            disabled={loading}
          >
            <Text style={styles.addButtonText}>
              {loading ? "Adding..." : "Add Medicine"}
            </Text>
          </TouchableOpacity>

          {/* Cancel Button */}
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
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  imagePickerButton: {
    backgroundColor: "#6a1b9a", // Purple background color for the button
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  imagePickerText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  previewImage: {
    width: 150, // Increased size for better visibility
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 8, // Rounded corners
    borderWidth: 1,
    borderColor: "#ddd", // Subtle border to distinguish the image
  },
  addButton: {
    backgroundColor: "#6a1b9a", // Purple background color for the button
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#A5D6A7" },
  addButtonText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  cancelButton: {
    backgroundColor: "#6a1b9a", // Purple background color for the button
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
});

export default AddMedicineModal;
