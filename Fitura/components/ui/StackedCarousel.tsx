import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Platform, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

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
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(data.length);
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const cardWidth = width * 0.8;
  const spacing = 20;
  const totalWidth = cardWidth + spacing;

  const scrollToIndex = (index: number, animated: boolean = true) => {
    scrollViewRef.current?.scrollTo({
      x: totalWidth * index,
      animated
    });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isScrolling) return;
    
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / totalWidth);
    
    if (index < data.length) {
      requestAnimationFrame(() => {
        scrollToIndex(index + data.length, false);
        setCurrentIndex(index + data.length);
      });
    } else if (index >= data.length * 2) {
      requestAnimationFrame(() => {
        scrollToIndex(index - data.length, false);
        setCurrentIndex(index - data.length);
      });
    } else {
      setCurrentIndex(index);
    }
  };

  const startAutoScroll = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (!isScrolling) {
        const nextIndex = currentIndex + 1;
        scrollToIndex(nextIndex);
        setCurrentIndex(nextIndex);
      }
      startAutoScroll();
    }, 3000);
  };

  useEffect(() => {
    // Initial scroll to middle set
    scrollToIndex(data.length, false);
    startAutoScroll();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const normalizedIndex = ((currentIndex % data.length) + data.length) % data.length;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollBeginDrag={() => {
          setIsScrolling(true);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        }}
        onScrollEndDrag={() => {
          setIsScrolling(false);
          startAutoScroll();
        }}
        onMomentumScrollEnd={() => {
          setIsScrolling(false);
          startAutoScroll();
        }}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {[...data, ...data, ...data].map((item, index) => (
          <View
            key={`${item.title}-${index}`}
            style={[styles.card, { width: cardWidth }]}
          >
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>

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
    </View>
  );
};
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  card: {
    top: 0.37 * height,
    height: 305,
    width: 329,
    marginHorizontal: 10, // Equal margins on both sides
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
