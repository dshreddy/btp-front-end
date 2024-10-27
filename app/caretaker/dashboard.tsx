import { StyleSheet, Text, View, ScrollView, Modal, TextInput, TouchableOpacity, Image, Pressable, Dimensions } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import React, { useState } from 'react'
import { FAB } from '@rneui/themed'
import Toast from 'react-native-toast-message';

export default function dashboard() {
  const { height: screenHeight } = Dimensions.get('window');

    const handleLogout = () => {
        Toast.show({
            type: 'customToast', // Custom type for styling
            text1: 'Logout Successful',
            position: 'bottom', // Position at the bottom
            visibilityTime: 2000, // Equivalent to Snackbar.LENGTH_SHORT
            bottomOffset: screenHeight - 44, // Adjust margin bottom
          });
    }

  return (
    <View style={styles.container}>
    <ScrollView stickyHeaderIndices={[0]}>
        <View style={styles.stickyHeader}>
                <TouchableOpacity>
                    <View style={styles.userContainer}>
                        <View style={styles.detailsAndProgress}>
                            <Text style={styles.detailsText}>Welcome!</Text>
                            <Text style={styles.pointsText}>How is your day going?</Text>
                        </View>
                    </View>
                </TouchableOpacity>
        </View>
        {/* <FlatCardsVertical
                    key={0} // Assuming each patient has a unique _id
                    caregiverInfo={profile}
                    patientInfo={patient}
                    medicineInfo={patientReminders}
        /> */}
    </ScrollView>
    <FAB
        placement="right"
        color='#62a8c3'
        size="large"
        title="Logout"
        icon={{ name: 'logout', color: '#FFFFFF' }}
        onPress={handleLogout}
    />
</View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f8', // Or any other color matching your theme
    },
    stickyHeader: {
        backgroundColor: '#6A1B9A', // Or any other color matching your theme
        marginBottom: 8
    },
    userContainer: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#6A1B9A', // Or any other color matching your theme
    },
    badgeImage: {
        width: 50,
        height: 60,
        marginRight: 16, // Space between the badge image and the details
    },
    detailsAndProgress: {
        flex: 1,
        justifyContent: 'space-evenly', // Evenly distribute space around items
        alignItems: 'center'
    },
    detailsText: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 4,
    },
    pointsText: {
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 4,
    },
    progress: {
        marginTop: 4,
    },
    modalView: {
        margin: 20,
        backgroundColor: "#f4f1f4",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#38006b'
    },
    badgeContainer: {
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        alignItems: 'center',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 3,
    },
    highlightedBadge: {
        borderColor: '#FFD700',
        borderWidth: 2,
    },
    badgeTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#38006b',
    },
    badgeImageModal: {
        width: 60,
        height: 70,
        margin: 8,
    },
    pointsRange: {
        fontSize: 16,
        color: '#555',
    },
    description: {
        textAlign: 'center',
        color: '#666',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#6A1B9A', // Or any other color matching your theme
        padding: 10,
        borderRadius: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
    },
    scrollViewStyle: {
        height: '76%', // Or a fixed value like 300
        alignSelf: 'center', // This will center the ScrollView
    },
});