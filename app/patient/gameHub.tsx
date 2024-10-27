import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function GameHub() {
  const clickGameHTML = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clicker Game</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
      }
      #score {
        font-size: 24px;
        margin-bottom: 20px;
      }
      #clickButton {
        padding: 10px 20px;
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <h1>Clicker Game</h1>
    <p id="score">Score: 0</p>
    <button id="clickButton" onclick="increaseScore()">Click Me!</button>

    <script>
      let score = 0;

      // Function to update score display
      function updateScoreDisplay() {
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = 'Score: ' + score;
      }

      // Initialize the score from local storage or from React Native
      function initializeScore(initialScore) {
        score = initialScore ? parseInt(initialScore) : 0;
        updateScoreDisplay();
      }

      // Function to increase score
      function increaseScore() {
        score += 1;
        updateScoreDisplay();
        window.ReactNativeWebView.postMessage(score.toString());
      }
    </script>
  </body>
  </html>
  `;

  const [gameScore, setGameScore] = useState(0);

  // Retrieve the score from AsyncStorage when the app loads
  useEffect(() => {
    const loadScore = async () => {
      try {
        const storedScore = await AsyncStorage.getItem('gameScore');
        if (storedScore !== null) {
          setGameScore(parseInt(storedScore));
        }
      } catch (e) {
        console.error('Failed to load the score.');
      }
    };
    loadScore();
  }, []);

  // Inject the gameScore into the WebView
  const runFirst = `
    (function() {
      // Initialize the game score with the stored value from AsyncStorage
      initializeScore(${gameScore});
    })();
  `;

  // Function to handle messages from the WebView (game)
  const setScore = async (event: { nativeEvent: { data?: string } }) => {
    const newScore = event.nativeEvent.data; // Score received from the WebView

    // Save the new score to AsyncStorage
    if (newScore) {
      await AsyncStorage.setItem('gameScore', newScore);
      setGameScore(parseInt(newScore)); // Update the state with the new score
      console.log('Score Saved!', `Your score of ${newScore} is saved`);
    } else {
      console.error('Failed to save the score.');
    }
  };

  if (Platform.OS === 'web') {
    return <div>This feature is not available on the web.</div>; // Handle the web case
  }

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: clickGameHTML }}
      javaScriptEnabled={true}
      onMessage={setScore}
      injectedJavaScript={runFirst} // Inject initial score into WebView
      style={{ flex: 1 }}
    />
  );
}
