import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {LinearGradient} from 'expo-linear-gradient'
import React, {useState} from 'react'

export default function patients() {
  const [searchText, setSearchText] = useState('');
  const [patientList, setPatientList] = useState<{ '_id': string }[]>([]);

  return (
    <LinearGradient
    colors={['#C485F7', '#C485F7', '#9459C6', '#9459C6', '#38006b']} // Adjust colors to match your design
    style={styles.backgroundGradient}>
       <View style={styles.userContainer}>
                    <Text style={styles.header}>Search Your Patients</Text>
                </View>
                <View style={styles.formContainer}>
                <TextInput
                    value={searchText}
                    style={styles.input}
                    onChangeText={(text) => { setSearchText(text); }}
                    placeholder='Search by email address'
                    placeholderTextColor={'white'}
                />
                <TouchableOpacity onPress={() => setSearchText('')}>
                    <View style={styles.cancelButton}>
                        <View style={styles.cancelButtonIcon}>
                            <Ionicons name="close" size={20} color="white" />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.patientList}>
                {/* <FlatList
                    data={patientList}
                    renderItem={renderPatientSearchEntry}
                    keyExtractor={(item) => item._id.toString()}

                /> */}
            </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  backgroundGradient: {
      flex: 1,
  },
  header: {
      color: '#f4f1f4',
      fontWeight: 'bold',
      fontSize: 20,
      marginHorizontal: 8,
      marginVertical: 4,
  },
  userContainer: {
      padding: 8,
      alignItems: 'center',
      backgroundColor: '#6A1B9A', // Or any other color matching your theme
  },
  userDetails: {
      fontSize: 14,
      color: '#FFFFFF',
      marginBottom: 8
  },
  continer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      // backgroundColor: '#6A1B9A', // Or any other color matching your theme
      // marginBottom: 8
  },
  formContainer: {
      // width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 6,
      marginHorizontal: 8,
      marginVertical: 8,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 8,
      marginBottom: 8
  },
  input: {
      flex: 1,
      color: 'black'
  },
  cancelButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      paddingHorizontal: 3
  },
  cancelButtonIcon: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
  },
  patientList: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center'
  },
});

