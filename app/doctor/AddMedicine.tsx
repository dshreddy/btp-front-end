import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthContext } from "@/context/authContext";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const AddMedicineScreen = () => {
  const { state } = useContext(AuthContext);
  const patient = useLocalSearchParams();
  const [doctor] = useState(state.user);
  const [medicineList, setMedicineList] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [image, setImage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [mealTime, setMealTime] = useState("before");
  const [dosage, setDosage] = useState(1);
  const [dosageTimes, setDosageTimes] = useState([""]);
  const [currentDosageIndex, setCurrentDosageIndex] = useState(null);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.post("/doctor/getMedicines", {
          doctorId: doctor._id,
        });
        setMedicineList(response.data.medicines || []);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch medicines. Please try again.");
      }
    };

    fetchMedicines();
  }, []);

  const handleDosageChange = (index, time) => {
    const updatedTimes = [...dosageTimes];
    updatedTimes[index] = time;
    setDosageTimes(updatedTimes);
  };

  const handleAddMedicine = async () => {
    if (!selectedMedicine) {
      Alert.alert("Validation Error", "Please select a medicine!");
      return;
    }
    if (!startDate || !endDate) {
      Alert.alert("Validation Error", "Please select start and end dates!");
      return;
    }
    // TODO startDate >= today & startDate < endDate
    if (dosageTimes.some((time) => !time)) {
      Alert.alert("Validation Error", "Please fill in all dosage times!");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/patient/addMedicine", {
        patientID: patient._id.toString(),
        medicineId: selectedMedicine._id.toString(),
        startDate,
        endDate,
        mealTime,
        dosage,
        dosageTimes,
      });

      Alert.alert("Success", "Medicine added successfully!");
      router.back();
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to add medicine."
      );
    } finally {
      setLoading(false);
    }
  };

  const showTimePicker = (index) => {
    setCurrentDosageIndex(index);
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    const formattedTime = `${time.getHours().toString().padStart(2, "0")}:${time
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    handleDosageChange(currentDosageIndex, formattedTime);
    hideTimePicker();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LinearGradient
        colors={["#C485F7", "#9459C6", "#662F97"]}
        style={styles.gradientBackground}
      >
        <View style={styles.screenContent}>
          <Text style={styles.header}>Add Medicine</Text>

          {/* Medicine Dropdown */}
          <Picker
            selectedValue={selectedMedicine}
            onValueChange={(itemValue) => {
              setSelectedMedicine(itemValue);
              setImage(itemValue?.image || null);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Select a Medicine" value={null} />
            {medicineList.map((medicine) => (
              <Picker.Item
                key={medicine._id}
                label={medicine.name}
                value={medicine}
              />
            ))}
          </Picker>

          {/* Image Preview */}
          {image && (
            <Image source={{ uri: image }} style={styles.previewImage} />
          )}

          {/* Start Date */}
          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateButtonText}>
              {startDate.toDateString()}
            </Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowStartDatePicker(false);
                if (date) setStartDate(date);
              }}
            />
          )}

          {/* End Date */}
          <Text style={styles.label}>End Date</Text>
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateButtonText}>{endDate.toDateString()}</Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowEndDatePicker(false);
                if (date) setEndDate(date);
              }}
            />
          )}

          {/* Before/After Meal */}
          <Text style={styles.label}>Meal Time</Text>
          <Picker
            selectedValue={mealTime}
            onValueChange={(itemValue) => setMealTime(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Before Meal" value="before" />
            <Picker.Item label="After Meal" value="after" />
          </Picker>

          {/* Dosage */}
          <Text style={styles.label}>Dosage per Day</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={dosage.toString()}
            onChangeText={(text) => {
              const num = parseInt(text, 10);
              setDosage(num || 1);
              setDosageTimes(Array(num || 1).fill(""));
            }}
          />

          {/* Dosage Times */}
          {Array.from({ length: dosage }).map((_, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dateButton}
              onPress={() => showTimePicker(index)}
            >
              <Text style={styles.dateButtonText}>
                {dosageTimes[index] || `Select time for dose ${index + 1}`}
              </Text>
            </TouchableOpacity>
          ))}
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            is24Hour={true}
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />

          {/* Add Button */}
          <TouchableOpacity
            style={[styles.addButton, loading && styles.disabledButton]}
            onPress={handleAddMedicine}
            disabled={loading}
          >
            <Text style={styles.addButtonText}>
              {loading ? "Adding..." : "Add"}
            </Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              router.back();
            }}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
  },
  screenContent: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#9B72C1",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "stretch",
    backgroundColor: "#eaeaea",
    alignItems: "center",
  },
  dateButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
    alignSelf: "stretch",
    alignItems: "center",
  },
  dateButtonText: {
    fontSize: 16,
    textAlign: "center",
  },
  picker: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
    alignSelf: "stretch",
    alignItems: "center",
  },
  previewImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 8,
  },
  addButton: {
    borderWidth: 1,
    borderColor: "#854CAD",
    marginTop: 5,
    marginBottom: 15,
    marginHorizontal: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#6a1b9a", // Purple background color for the button
    elevation: 2,
    alignSelf: "stretch",
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#A5D6A7" },
  addButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#854CAD",
    marginBottom: 10,
    marginHorizontal: 8,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    elevation: 2,
    alignSelf: "stretch",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#6a1b9a",
    fontWeight: "bold",
  },
});

export default AddMedicineScreen;
