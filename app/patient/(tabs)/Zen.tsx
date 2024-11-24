import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '@/context/authContext';
import VideoCategory from '@/components/VideoCategory';
import { useRouter } from "expo-router";

const cards = [
  { id: '1', title: 'Meditation', description: 'Cultivate mindfulness and enhance your mental clarity through guided meditation sessions designed to promote relaxation and stress relief.', imageUrl: require('@/assets/mindfullness/meditation.png') },
  { id: '2', title: 'Yoga', description: 'Improve flexibility, balance, and overall well-being through yoga practices tailored to unify the body, mind, and spirit.', imageUrl: require('@/assets/mindfullness/yoga.png') },
]

const Zen = () => {
  const router = useRouter();
  const { state, setState } = useContext(AuthContext);
  const [name] = useState(state?.user?.name || "");
  return (
    <View style={{ flex: 1 }}>
      {/* header */}
      <View style={styles.userContainer}>
        <View style={styles.detailsAndProgress}>
          <Text style={styles.detailsText}>Calm your mind {name}!</Text>
        </View>
      </View>

      {/* category */}
      <ScrollView>
        {cards.map((card) => (

          <TouchableOpacity onPress={() => router.push(`/patient/${card.title}`)} key={card.id}>

            <VideoCategory
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
            />
          </TouchableOpacity>
        ))}

      </ScrollView>
    </View>


  );
};

export default Zen;

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
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    paddingLeft: 8,
    marginBottom: 5
  },
  smallText: {
    color: '#000000'
  },
  back: {
    backgroundColor: "#f4f1f4"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',

  },

})