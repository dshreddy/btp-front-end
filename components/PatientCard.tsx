import { View, Text, StyleSheet } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import React from 'react'

const PatientCard = () => {
    const name = "<Name>";
    const email = "<Email>";
    const age = "<Age>";

    return (
        <>
            <LinearGradient
                colors={['#C485F7', '#C485F7', '#9459C6', '#9459C6', '#662F97']} // Adjust colors to match your design
                style={styles.backgroundGradient}
            >

                <View style={styles.userInfo}>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.infoKey}>Name:</Text>
                        <Text style={styles.infoValue}>{name}</Text>
                    </View>

                    <View style={styles.userInfoItem}>
                        <Text style={styles.infoKey}>Email:</Text>
                        <Text style={styles.infoValue}>{email}</Text>
                    </View>

                    <View style={styles.userInfoItem}>
                        <Text style={styles.infoKey}>Age:</Text>
                        <Text style={styles.infoValue}>{age}</Text>
                    </View>
                </View>
            </LinearGradient>
            {/* <PrescriptionTabs patientId={params!._id} /> */}
        </>
    );
}

export default PatientCard

const styles = StyleSheet.create({
    backgroundGradient: {
        // flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    infoKey: {
        fontSize: 16,
        color: '#38006b', // Purple text color for the key
        fontWeight: 'bold',
    },
    infoValue: {
        fontSize: 16,
        color: 'black', // Slightly darker purple text color for the value
    },
    userInfo: {
        width: '90%',
        padding: 10,
        borderRadius: 8,
        margin: 16,
        backgroundColor: 'white', // White card background
        shadowColor: '#000', // Shadow for the card
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    userInfoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8, // Adds margin vertically inside the card
    },
    addModalButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: 'rgba(134, 65, 244, 1)', // Purple background color for the button
        elevation: 2,
    },
    buttonText: {
        fontSize: 18,
        color: 'white', // White text color for the button
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        // marginBottom: 8,
        marginHorizontal: 8
    },
    prescriptionContainer: {
        width: '90%',
        padding: 10,
        borderRadius: 8,
        margin: 16,
        backgroundColor: 'white', // White card background
        shadowColor: '#000', // Shadow for the card
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});