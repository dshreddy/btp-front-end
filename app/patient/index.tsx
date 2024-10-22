// app/patient/index.tsx
import { StyleSheet, Text, View } from 'react-native';

export default function PatientScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Patient!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
