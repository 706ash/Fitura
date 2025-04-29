import React, { useRef, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Dimensions, 
  Platform, 
  ScrollView, 
  NativeSyntheticEvent, 
  NativeScrollEvent,
  ViewStyle 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Changed import

interface CarouselItem {
  title: string;
  image: any;
}

const { width, height } = Dimensions.get('window');

const data: CarouselItem[] = [
  {
    title: "BROWN BOOTS",
    image: require('../../assets/images/brown_boots.png')
  },
  {
    title: "BLACK SEIKO",
    image: require('../../assets/images/black_seiko.png')
  },
  {
    title: "AVIATOR GLASSES",
    image: require('../../assets/images/aviator_glasses.png')
  },
  {
    title: "BROWN BAG",
    image: require('../../assets/images/brown_bag.png')
  },
];

const BREAKPOINT_WIDTH = 768; // Breakpoint for mobile web view

const StackedCarousel: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(data.length);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < BREAKPOINT_WIDTH);
      };
      
      handleResize(); // Initial check
      window.addEventListener('resize', handleResize);
      
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const cardWidth = Platform.OS === 'web' 
    ? isSmallScreen ? width * 0.8 : 250 
    : width * 0.8;
    
  const spacing = Platform.OS === 'web' ? 30 : 20;
  const totalWidth = cardWidth + spacing;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (Platform.OS === 'android') {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / totalWidth);
      setCurrentIndex(index);
    }
  };

  const normalizedIndex = ((currentIndex % data.length) + data.length) % data.length;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={Platform.OS === 'android' || !isSmallScreen}
        pagingEnabled={Platform.OS === 'android'}
        decelerationRate={Platform.OS === 'android' ? "fast" : "normal"}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContent,
          Platform.OS === 'web' && (
            isSmallScreen ? styles.webScrollViewContentSmall : styles.webScrollViewContent
          )
        ]}
        snapToInterval={Platform.OS === 'android' ? totalWidth : undefined}
      >
        {(Platform.OS === 'android' ? [...data, ...data, ...data] : data).map((item, index) => (
          <View
            key={`${item.title}-${index}`}
            style={[
              styles.card, 
              { width: cardWidth },
              Platform.OS === 'web' && isSmallScreen && styles.cardSmallScreen
            ]}
          >
            <LinearGradient
              colors={['#FF4E50', '#F9D423']}
              start={{ x: 0.3, y: 0.3 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            />
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>

      {Platform.OS === 'android' && (
        <View style={styles.pagination}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: normalizedIndex === index ? '#fff' : '#666' }
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        userSelect: 'none',
      }
    })
  },
  scrollView: {
    width: width,
  },
  scrollViewContent: {
    paddingHorizontal: width * 0.1, // 10% padding on each side
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  dot: {
    bottom: 0,
    width: 10,
    height: 10,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  webScrollViewContent: {
    top: 80,
    // paddingHorizontal: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    height: '100%',
  },
  webScrollViewContentSmall: {
    paddingHorizontal: 20,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    minHeight: '100%',
  },
  cardSmallScreen: {
    top: 0,
    width: 300,
    height: 300,
    marginTop: 160,
    marginBottom: 20,
  },
  card: {
    position: 'relative',
    marginTop: Platform.OS === 'android' ? height * 0.2 : height * 0,
    height: 270,
    marginHorizontal: 10,
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

  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 20,
    overflow: 'hidden', // Move overflow to gradient instead of card
  },

  image: {
    position: 'absolute',
    top: -120,
    width: Platform.OS === 'web' ? '80%' : width * 0.8,
    height: 200,
  } as const,

  title: {
    marginTop: 20,
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  webScrollView: Platform.select({
    web: {
      scrollBehavior: 'smooth',
      cursor: 'grab',
    },
    default: {}
  }) as ViewStyle,
});

export default StackedCarousel;
