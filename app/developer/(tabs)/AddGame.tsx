import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const AddGame = () => {
  const [gameName, setGameName] = useState("");
  const [logo, setLogo] = useState(null); // Store logo as base64
  const [htmlFile, setHtmlFile] = useState(null); // Store HTML file details

  const handleUploadLogo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
      });
      if (!result.canceled) {
        setLogo(result.assets[0].base64);
        alert("Logo uploaded successfully!");
      }
    } catch (error) {
      alert("Failed to upload logo. Please try again.");
    }
  };

  const handleUploadHtml = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/html",
      });
      if (!result.canceled) {
        setHtmlFile(result);
        alert("HTML file uploaded successfully!");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to upload HTML file. Please try again.");
    }
  };

  const handleAddGame = async () => {
    if (!gameName) {
      alert("Game name is required.");
      return;
    }

    if (!logo) {
      alert("Logo is required.");
      return;
    }

    if (!htmlFile) {
      alert("HTML file is required.");
      return;
    }

    try {
      const htmlContent = await fetch(htmlFile.assets[0].uri).then((res) =>
        res.text()
      );

      const response = await axios.post("/developer/addGame", {
        name: gameName,
        logo: `data:image/png;base64,${logo}`,
        html: htmlContent,
      });

      alert("Success");
      setGameName("");
      setLogo(null);
      setHtmlFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to add game. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Game</Text>

      {/* Game Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Game Name"
        value={gameName}
        onChangeText={setGameName}
      />

      {/* Upload Logo Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadLogo}>
        <Text style={styles.uploadButtonText}>Upload Logo</Text>
      </TouchableOpacity>
      {logo && (
        <Image
          source={{ uri: `data:image/png;base64,${logo}` }}
          style={styles.logoPreview}
        />
      )}

      {/* Upload HTML File Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadHtml}>
        <Text style={styles.uploadButtonText}>Upload HTML File</Text>
      </TouchableOpacity>
      {htmlFile && (
        <Text style={styles.fileName}>{htmlFile.assets[0].name}</Text>
      )}

      {/* Add Game Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddGame}>
        <Text style={styles.addButtonText}>Add Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: "#6a1b9a",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  uploadButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  logoPreview: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 8,
  },
  fileName: {
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddGame;
