import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";

const AddGameModal = ({ patientId, visible, onClose }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.post("/developer/getAllGames");
        setGames(response.data.games || []);
      } catch (error) {
        console.error("Error fetching games:", error);
        Alert.alert("Error", "Failed to fetch games. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (visible) {
      fetchGames();
    }
  }, [visible]);

  const handleGameSelect = async (game) => {
    try {
      const response = await axios.post("/patient/addGame", {
        patientId,
        gameId: game._id,
      });

      if (response.data.success) {
        Alert.alert(
          "Success",
          response.data.message || "Game added successfully!"
        );
        onClose(); // Close the modal on success
      } else {
        Alert.alert("Notice", response.data.message || "Failed to add game.");
      }
    } catch (error) {
      console.error("Error adding game:", error);
      Alert.alert("Error", "Failed to add game. Please try again.");
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
          <Text style={styles.modalHeader}>Select a Game</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#6a1b9a" />
          ) : (
            <FlatList
              data={games}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.gameCard}
                  onPress={() => handleGameSelect(item)}
                >
                  <Image
                    source={{ uri: item.logo }}
                    style={styles.gameLogo}
                    resizeMode="contain"
                  />
                  <Text style={styles.gameName}>{item.name}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No games available.</Text>
              }
            />
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
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
    backgroundColor: "#fff",
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
    textAlign: "center",
  },
  gameCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  gameLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  gameName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginVertical: 20,
  },
  closeButton: {
    backgroundColor: "#6a1b9a",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddGameModal;
