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
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        router.push({
          pathname: "/developer/Game",
          params: item,
        });
      }}
    >
      <Image source={{ uri: item.logo }} style={styles.gameImage} />
      <Text style={styles.gameName}>{item.name}</Text>
    </TouchableOpacity>
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
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    alignItems: "center",
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
});

export default Games;
