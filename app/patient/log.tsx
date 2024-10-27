import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Voice from '@react-native-voice/voice';
import {LinearGradient} from 'expo-linear-gradient';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function Journal() {
    const [isListening, setIsListening] = useState(false);
    const [started, setStarted] = useState('');
    const [ended, setEnded] = useState('');
    const [recognizedText, setRecognizedText] = useState('');

    const startRecognition = async () => {
        try {
            await Voice.start('en-US');
            setIsListening(true);
            setStarted('');
            setEnded('');
        } catch (error) {
            console.error('Error starting speech recognition', error);
        }
    }

    const stopRecognition = async () => {
        try {
            await Voice.stop();
            await Voice.destroy();
            setIsListening(false);
        } catch (error) {
            console.error('Error stopping speech recognition', error);
        }
    }

    Voice.onSpeechResults = (event) => {
        const { value } = event;

        if (value) {
            setRecognizedText(recognizedText + ' ' + value[0]);
            stopRecognition();
        }
    }

    const onSpeechStart = (e: any) => {
        console.log(e);
        setStarted('✅');
    };

    const onSpeechEnd = (e: any) => {
        console.log(e);
        setEnded('✅');
    };

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        // Voice.onSpeechResults = onSpeechResults;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        }
    }, []);


    return (
        <LinearGradient
            colors={['#C485F7', '#C485F7', '#9459C6', '#9459C6', '#662F97']} // Adjust colors to match your design
            style={styles.backgroundGradient}
        >
            <View style={styles.userContainer}>
                <View style={styles.detailsAndProgress}>
                    <Text style={styles.detailsText}>Journal Your Story!</Text>
                </View>
            </View>


            {/* <Button
                title={isListening ? 'Stop Listening' : 'Start Listening'}
                onPress={isListening ? stopRecognition : startRecognition}
            /> */}



            <View style={styles.diaryContainer}>
                <Text style={{ color: 'white' }}> {recognizedText}</Text>
            </View>

            <TouchableOpacity style={{ alignSelf: 'center', marginTop: 25 }} onPress={isListening ? stopRecognition : startRecognition}>

                {
                    isListening ?
                        <Image source={require('@/assets/common/mic.png')} style={{ height: 75, width: 75, backgroundColor: '#6a1b9a', borderRadius: 50 }} /> :
                        <Image source={require('@/assets/common/micno.png')} style={{ height: 75, width: 75, backgroundColor: '#6a1b9a', borderRadius: 50 }} />
                }


            </TouchableOpacity>

            <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-evenly' }}>
                <Text style={{ color: '#fff' }}>Started {started}</Text>
                <Text style={{ color: '#fff' }} >Ended {ended}</Text>
            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    backgroundGradient: {
        flex: 1,
    },
    userContainer: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#6A1B9A', // Or any other color matching your theme
    },
    detailsAndProgress: {
        flex: 1,
        justifyContent: 'space-evenly', // Evenly distribute space around items
    },
    detailsText: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 4,
        alignSelf: 'center'
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '400',
        paddingLeft: 8,
        marginBottom: 5
    },
    diaryContainer: {
        marginVertical: 25,
        marginHorizontal: 8,
        padding: 8,
        borderRadius: 10,
        height: 200,
        // alignItems: 'center',
        backgroundColor: '#6a1b9a', // Or any other color matching your theme
    }
})

// import React, { useEffect, useState } from 'react';
// import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Audio } from 'expo-av';
// import { LogBox } from 'react-native';

// LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); // Ignore all log notifications

// export default function Journal() {
//   const [recording, setRecording] = useState<Audio.Recording | null>(null);
//   const [recognizedText, setRecognizedText] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [started, setStarted] = useState('');
//   const [ended, setEnded] = useState('');

//   const startRecording = async () => {
//     try {
//       // Request permission to use the microphone
//       const { status } = await Audio.requestPermissionsAsync();
//       if (status !== 'granted') {
//         console.error('Permission to access microphone is required!');
//         return;
//       }

//       // Start recording
//       const { recording: newRecording } = await Audio.Recording.createAsync(
//         Audio.RecordingOptionsPresets.HIGH_QUALITY
//       );
//       setRecording(newRecording);
//       setIsListening(true);
//       setStarted('✅');
//       setEnded('');
//       setRecognizedText(''); // Clear previous text
//     } catch (error) {
//       console.error('Error starting recording:', error);
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       if (recording) {
//         await recording.stopAndUnloadAsync();
//         const uri = recording.getURI(); // Get the URI of the recorded audio
//         console.log('Recording stopped and stored at', uri);
//         setIsListening(false);
//         setEnded('✅');
        
//         // Here, you could use a speech-to-text API to transcribe the audio
//         // For example, send the audio file to a backend service for processing
//         // and update recognizedText state based on the response.
//       }
//     } catch (error) {
//       console.error('Error stopping recording:', error);
//     }
//   };

//   const handlePress = () => {
//     isListening ? stopRecording() : startRecording();
//   };

//   return (
//     <LinearGradient
//       colors={['#C485F7', '#C485F7', '#9459C6', '#9459C6', '#662F97']} // Adjust colors to match your design
//       style={styles.backgroundGradient}
//     >
//       <View style={styles.userContainer}>
//         <View style={styles.detailsAndProgress}>
//           <Text style={styles.detailsText}>Journal Your Story!</Text>
//         </View>
//       </View>

//       <View style={styles.diaryContainer}>
//         <Text style={{ color: 'white' }}> {recognizedText}</Text>
//       </View>

//       <TouchableOpacity style={{ alignSelf: 'center', marginTop: 25 }} onPress={handlePress}>
//         <Image
//           source={
//             isListening
//               ? require('@/assets/common/mic.png')
//               : require('@/assets/common/micno.png')
//           }
//           style={{ height: 75, width: 75, backgroundColor: '#6a1b9a', borderRadius: 50 }}
//         />
//       </TouchableOpacity>

//       <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-evenly' }}>
//         <Text style={{ color: '#fff' }}>Started {started}</Text>
//         <Text style={{ color: '#fff' }}>Ended {ended}</Text>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   backgroundGradient: {
//     flex: 1,
//   },
//   userContainer: {
//     flexDirection: 'row',
//     padding: 8,
//     alignItems: 'center',
//     backgroundColor: '#6A1B9A', // Or any other color matching your theme
//   },
//   detailsAndProgress: {
//     flex: 1,
//     justifyContent: 'space-evenly', // Evenly distribute space around items
//   },
//   detailsText: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     marginBottom: 4,
//     alignSelf: 'center',
//   },
//   diaryContainer: {
//     marginVertical: 25,
//     marginHorizontal: 8,
//     padding: 8,
//     borderRadius: 10,
//     height: 200,
//     backgroundColor: '#6a1b9a', // Or any other color matching your theme
//   },
// });
