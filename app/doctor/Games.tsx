import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";

const GamesScreen = () => {
  const [searchText, setSearchText] = useState("");
  const games = [
    { id: "1", name: "Game 1", logo: "🎮" },
    { id: "2", name: "Game 2", logo: "🕹️" },
    { id: "3", name: "Game 3", logo: "🎲" },
  ];

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Box */}
      <TextInput
        style={styles.searchBox}
        placeholder="Search games..."
        value={searchText}
        onChangeText={setSearchText}
      />
      {/* Games List */}
      <FlatList
        data={filteredGames}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.logo}>{item.logo}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noData}>No games found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  searchBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  logo: { fontSize: 24, marginRight: 10 },
  name: { fontSize: 16 },
  noData: { textAlign: "center", color: "#555", marginTop: 20 },
});

export default GamesScreen;
