import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useFocusEffect, useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";

const Games = () => {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchGames = async () => {
    try {
      const response = await axios.post("/developer/getAllGames");
      setGames(response.data.games || []);
      setFilteredGames(response.data.games || []);
    } catch (error) {
      alert("Failed to fetch games. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGames(); // Refetch patients when the tab is focused
    }, []) // Empty dependency array ensures it only runs when the component is focused
  );

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFilteredGames(games);
    } else {
      const filtered = games.filter((game) =>
        game.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  };

  const renderGameCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.detailsContainer}>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/developer/Game",
              params: item,
            });
          }}
        >
          <Image source={{ uri: item.logo }} style={styles.gameImage} />
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        {/* Update Icon */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => alert("Update pressed for " + item.name)}
        >
          <Ionicons name="create-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
        {/* Delete Icon */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => alert("Delete pressed for " + item.name)}
        >
          <Ionicons name="trash-outline" size={24} color="#f44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#C485F7", "#C485F7", "#9459C6", "#9459C6", "#38006b"]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search games..."
          value={searchText}
          onChangeText={handleSearch}
        />

        {/* Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <FlatList
            data={filteredGames}
            renderItem={renderGameCard}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={
              <Text style={styles.noGamesText}>No games found.</Text>
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
  gameImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  gameName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  noGamesText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "column", // Arrange icons in a column
    justifyContent: "space-evenly", // Space out the icons vertically
    alignItems: "center", // Center align icons
  },
  iconButton: {
    marginLeft: 10,
    marginBottom: 10,
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
    flex: 2, // Take more space for details
    flexDirection: "column", // Arrange name, dob, gender in a column
  },
});

export default Games;
