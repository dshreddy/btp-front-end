import React, { useContext, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import VideoCard from '@/components/VideoCard';
import { AuthContext } from '@/context/authContext';


const cards = [
    { id: '1', title: 'Yoga for Stress', bodyText: 'Get rid of stress and anxiety through deep stretch', buttonText: 'Start Yoga', videoId: 'yIcjAEs18TQ' },
    { id: '2', title: 'Pranayama', bodyText: 'Perform this for 10 mins to Calm Your Mind :)', buttonText: 'Start Breathing', videoId: 'uNmKzlh55Fo' },
    { id: '3', title: 'Hatha Yoga', bodyText: 'Traditional Yoga Practice for 19 mins', buttonText: 'Start Meditation', videoId: 'uiXAIgurwJU' },
];

export default function Yoga() {
    const { state, setState } = useContext(AuthContext);
    const [name] = useState(state?.user?.name || "");
    return (
        <>
            {/* header */}
            <View style={styles.userContainer}>
                <View style={styles.detailsAndProgress}>
                    <Text style={styles.detailsText}>Calm your mind {name}!</Text>
                </View>
            </View>

            <ScrollView>
                <View>
                    {cards.map((card) => (
                        <VideoCard
                            key={card.id}
                            title={card.title}
                            bodyText={card.bodyText}
                            videoId={card.videoId}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
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
})