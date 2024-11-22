import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";
import { useLocalSearchParams } from "expo-router";
import { AuthContext } from "@/context/authContext";
import axios from "axios";

export default function Game() {
  const { state } = useContext(AuthContext);
  const game = useLocalSearchParams();
  const GameHTML = game.html;
  // const [gameScore, setGameScore] = useState(0);

  // Retrieve the score from AsyncStorage when the app loads
  useEffect(() => {
    const loadScore = async () => {
      try {
        const storedScore = await AsyncStorage.getItem("gameScore");
        if (storedScore !== null) {
          const lastScore = parseInt(storedScore);
          try {
            // Call the backend to update the patient's activity
            const response = await axios.put("/patient/updateGameActivity", {
              patientId: state?.user?._id,
              gameId: game._id,
              score: lastScore,
            });
            console.log("Score updated successfully:", response.data);
          } catch (error) {
            console.error("Failed to update score on server:", error);
          }
        }
      } catch (e) {
        console.error("Failed to load the score.");
      }
    };
    loadScore();
  }, []);

  // Inject the gameScore into the WebView
  // const runFirst = `
  //   (function() {
  //     // Initialize the game score with the stored value from AsyncStorage
  //     initializeScore(${gameScore});
  //   })();
  // `;

  // Function to handle messages from the WebView (game)
  const setScore = async (event: { nativeEvent: { data?: string } }) => {
    const newScore = event.nativeEvent.data; // Score received from the WebView

    // Save the new score to AsyncStorage
    if (newScore) {
      await AsyncStorage.setItem("gameScore", newScore);
      //console.log("Score Saved!", `Your score of ${newScore} is saved`);
    } else {
      //console.error("Failed to save the score.");
    }
  };

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: GameHTML }}
      javaScriptEnabled={true}
      onMessage={setScore}
      // injectedJavaScript={runFirst} // Inject initial score into WebView
      style={{ flex: 1 }}
    />
  );
}
