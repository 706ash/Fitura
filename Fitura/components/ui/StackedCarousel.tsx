import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Platform, ScrollView } from 'react-native';

interface CarouselItem {
  title: string;
  image: any;
}

const { width } = Dimensions.get('window');

const data = [
  {
    title: "Brown Boots",
    image: require('../../assets/images/brown_boots.png')
  },
  {
    title: "Black Seiko",
    image: require('../../assets/images/black_seiko.png')
  },
  {
    title: "Aviator Glasses",
    image: require('../../assets/images/aviator_glasses.png')
  },
  {
    title: "Brown Bag",
    image: require('../../assets/images/brown_bag.png')
  },
];

const StackedCarousel: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image 
              source={item.image} 
              style={styles.image} 
              resizeMode="contain" 
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: width,
  },
  card: {
    width: width * 0.8,
    height: 400,
    margin: 10,
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
      },
    }),
  },
  image: {
    width: '80%',
    height: 200,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StackedCarousel;
