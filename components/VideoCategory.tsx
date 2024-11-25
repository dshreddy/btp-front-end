import { Text, StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const videoPlayerHeight = (Dimensions.get("window").height) * 9 / 16;

interface VideoCardProps {
    title: string;
    description: string;
    imageUrl: number;
}

const VideoCategory: React.FC<VideoCardProps> = ({ title, description, imageUrl }) => {
    return (
        <View style={styles.card}>
            {/* Image at the top covering the full card width */}
            <Image
                style={styles.cardImage}
                source={imageUrl}
            />
            {/* Content container for title, description, and progress */}
            <View style={styles.contentContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        overflow: 'hidden',
        marginHorizontal: 8,
        marginVertical: 8,
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardImage: {
        width: screenWidth - 16, // Adjust for margin
        height: videoPlayerHeight - 16,
    },
    contentContainer: {
        padding: 8,
    },
    cardTitle: {
        color: '#38006b',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardDescription: {
        color: '#57606f',
        fontSize: 14,
        marginBottom: 8,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default VideoCategory;
