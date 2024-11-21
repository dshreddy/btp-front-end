import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { useLocalSearchParams } from "expo-router";

export default function Game() {
  const game = useLocalSearchParams();
  const GameHTML = game.html;

  // Function to handle messages from the WebView (game)
  const setScore = async (event: { nativeEvent: { data?: string } }) => {
    const newScore = event.nativeEvent.data; // Score received from the WebView

    if (newScore) {
      console.log(`Your score of ${newScore} is saved`);
    } else {
      console.error("Failed to save the score.");
    }
  };

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: GameHTML }}
      javaScriptEnabled={true}
      onMessage={setScore}
      style={{ flex: 1 }}
    />
  );
}
