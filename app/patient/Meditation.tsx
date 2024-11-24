import React, { useContext, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import VideoCard from '@/components/VideoCard';
import { AuthContext } from '@/context/authContext';


const cards = [
    { id: '1', title: 'Meditate', bodyText: 'Relax your mind', buttonText: 'Start Meditation', videoId: 'xRxT9cOKiM8' },
    { id: '2', title: 'Breath', bodyText: 'Perform this for 1-2 mins.', buttonText: 'Start Breathing', videoId: 'tEmt1Znux58' },
    { id: '3', title: 'Meditate', bodyText: '10-minute routine', buttonText: 'Start Meditation', videoId: 'O-6f5wQXSu8' },
];

export default function Meditation() {

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