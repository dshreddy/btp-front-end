import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  const onPress = (category: string) => {
    console.log(category);
    if(category === "doctor"){
        router.push('/doctor/');    
    } else if (category === "patient"){
        router.push('/patient/');   
    } else{
        router.push('/caretaker/');   
    }
    // router.push('/auth/login');
  }

  return (
        <View style={styles.mainContainer}>
            <Text style={styles.appName}>Game Mind</Text>

            <TouchableOpacity style={styles.container} onPress={() => onPress("doctor")}>
                <Image style={styles.logo} source={require('@/assets/common/doctor.jpg')} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.container} onPress={() => onPress("patient")}>
                <Image style={styles.logo} source={require('@/assets/common/patient.jpg')} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.container} onPress={() => onPress("caretaker")}>
                <Image style={styles.logo} source={require('@/assets/common/caretaker.jpg')} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  appName: {
      color: '#62a8c3',
      fontSize: 40,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginBottom: 10,
  },
  mainContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
  container: {
      backgroundColor: '#F5F9FA',
      borderRadius: 8,
      padding: 0,
      margin: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      width: '45%'
  },
  logo: {
      width: 150,
      height: 150,
      alignSelf: 'center',
      alignItems: 'center'
  }
});
