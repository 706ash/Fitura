import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet, Dimensions, PanResponder } from 'react-native';
import { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

export const InteractiveBackground = () => {
  const [gradientColors, setGradientColors] = useState({
    start: 'rgb(108, 0, 162)',
    end: 'rgb(0, 17, 82)',
  });

  const pointerX = useSharedValue(0);
  const pointerY = useSharedValue(0);

  const handleMove = (e: any) => {
    const { pageX, pageY } = e.nativeEvent;
    pointerX.value = pageX;
    pointerY.value = pageY;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(pointerX.value, { damping: 15 }) },
        { translateY: withSpring(pointerY.value, { damping: 15 }) },
      ],
    };
  });

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: handleMove,
    onPanResponderRelease: () => {},
  });

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <View
        style={[styles.gradientBackground, { backgroundColor: gradientColors.start }]}
      >
        <BlurView intensity={50} style={styles.blurBackground} />
      </View>

      {/* Animated Circles */}
      <Animated.View
        style={[
          styles.animatedCircle,
          animatedStyle,
          { backgroundColor: 'rgba(18, 113, 255, 0.5)' },
        ]}
        {...panResponder.panHandlers}
      >
        <BlurView intensity={30} style={styles.blurCircle} />
      </Animated.View>

      <View style={styles.additionalGradients}>
        <View style={[styles.gradient, { backgroundColor: 'rgba(221, 74, 255, 0.8)' }]} />
        <View style={[styles.gradient, { backgroundColor: 'rgba(100, 220, 255, 0.6)' }]} />
        <View style={[styles.gradient, { backgroundColor: 'rgba(200, 50, 50, 0.6)' }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: -1,
    borderRadius: 15,
  },
  blurBackground: {
    flex: 1,
    borderRadius: 15,
  },
  animatedCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    top: height / 2 - 50,
    left: width / 2 - 50,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  additionalGradients: {
    position: 'absolute',
    top: height / 2 - 100,
    left: width / 2 - 100,
  },
  gradient: {
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.6,
    position: 'absolute',
  },
});

