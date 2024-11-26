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
import { LinearGradient } from "expo-linear-gradient";

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
    <LinearGradient
      colors={["#C485F7", "#9459C6", "#662F97"]}
      style={styles.gradientBackground}
    >
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
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUploadLogo}
        >
          <Text style={styles.uploadButtonText}>Upload Logo</Text>
        </TouchableOpacity>
        {logo && (
          <Image
            source={{ uri: `data:image/png;base64,${logo}` }}
            style={styles.logoPreview}
          />
        )}

        {/* Upload HTML File Button */}
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUploadHtml}
        >
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#9B72C1",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff",
    marginHorizontal: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "stretch",
    alignItems: "center",
  },
  uploadButton: {
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
  uploadButtonText: {
    fontSize: 16,
    color: "#6a1b9a",
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
  addButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddGame;
