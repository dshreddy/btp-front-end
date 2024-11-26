import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import { AuthContext } from "@/context/authContext";

const Medicines = () => {
  const { state } = useContext(AuthContext);
  const [patientId] = useState(state?.user?._id || "");
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState([]);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/patient/getMedicines", {
        patientId,
      });
      setMedicines(response.data.medicines || []);
    } catch (error) {
      alert("Failed to fetch medicines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMedicines();
    }, [])
  );

  const renderMedicineCard = ({ item }) => (
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
        <Text style={styles.medicineDetails}>
          Start Date: {new Date(item.startDate).toDateString()}
        </Text>
        <Text style={styles.medicineDetails}>
          End Date: {new Date(item.endDate).toDateString()}
        </Text>
        <Text style={styles.medicineDetails}>{item.mealTime} meal</Text>
        <Text style={styles.medicineDetails}>Dosage: {item.dosage}</Text>
        <Text style={styles.medicineDetails}>
          Times: {item.dosageTimes.join(", ")}
        </Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#C485F7", "#9459C6", "#662F97"]}
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        ) : (
          <FlatList
            data={medicines}
            contentContainerStyle={styles.flatListContainer}
            renderItem={renderMedicineCard}
            keyExtractor={(item) => item.medicine._id}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No medicines found.</Text>
            }
          />
        )}
      </View>
    </LinearGradient>
  );
};

export default Medicines;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  loader: {
    marginTop: 20,
  },
  flatListContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  medicineCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  medicineLeftColumn: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  medicineRightColumn: {
    flex: 2,
    justifyContent: "flex-start",
    marginLeft: 10,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  medicineImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  medicineDetails: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
});
