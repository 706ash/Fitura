import { Platform, View, TouchableOpacity, StyleSheet, Text, Image, ScrollView, Dimensions } from 'react-native';
import { useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import StackedCarousel from '../../components/ui/StackedCarousel';

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [navbarContent, setNavbarContent] = useState<'image' | 'text2'>('image');
  const [sectionOffsets, setSectionOffsets] = useState<{section2: number, section3: number}>({section2: 0, section3: 0});

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    if (sectionOffsets.section3 > 0 && y >= sectionOffsets.section3 - 50) {
      setNavbarContent('text2');
    } else {
      setNavbarContent('image');
    }
  };

  return (
    <View style={styles.container}>
      {/* NAVBAR */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.touch}>
          <Image source={require('../../assets/icons/menu_icon.png')} style={styles.menu_icon} />
        </TouchableOpacity>
        <View style={styles.tag_div}>
          {navbarContent === 'image' && (
            <Image source={require('../../assets/images/CASUAL_text.png')} style={styles.tag} />
          )}
          {navbarContent === 'text2' && (
            <Text style={styles.outfit_section_navbar_text}>OUTFIT HISTORY</Text>
          )}
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* SECTION 1 */}
        <LinearGradient
          colors={['#FF4E50', '#F9D423']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[styles.section_1, { minHeight: Dimensions.get('window').height }]}
        >
          <View style={styles.outfit}>
            <Image source={require('../../assets/recommendations/demo_shirt.png')} style={styles.outfit_image1} />
            <Image source={require('../../assets/recommendations/demo_cargo_pant.png')} style={styles.outfit_image2} />
          </View>
          <TouchableOpacity
            style={[styles.roundedButton, isPressed && styles.buttonPressed]}
            activeOpacity={0.7}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
          >
            <Text style={styles.buttonText}>TRY-ON</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* SECTION 2 */}
        <View
          style={[styles.section_2, { minHeight: Dimensions.get('window').height }]}
          onLayout={e => {
            const y = e?.nativeEvent?.layout?.y;
            if (typeof y === 'number') {
              setSectionOffsets(offsets => ({ ...offsets, section2: y }));
            }
          }}
        >
          <Text style={styles.middle_section_text}>STYLE MEETS COMFORT. PAIR THIS LOOK WITH</Text>
          <StackedCarousel />
        </View>

        {/* SECTION 3 */}
        <LinearGradient
          colors={['#F9D423', '#FF4E50']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[styles.section_1, { minHeight: Dimensions.get('window').height * 1.5 }]}
          onLayout={e => {
            const y = e?.nativeEvent?.layout?.y;
            if (typeof y === 'number') {
              setSectionOffsets(offsets => ({ ...offsets, section3: y }));
            }
          }}
        >
          <View style={styles.outfit}>
            <Image source={require('../../assets/outfit_history/polaroid_1.png')} style={styles.polaroid_1} />
            <Image source={require('../../assets/outfit_history/polaroid_2.png')} style={styles.polaroid_2} />
            <Image source={require('../../assets/outfit_history/polaroid_3.png')} style={styles.polaroid_3} />
          </View>
          <View style={styles.section_3_button}>
            <TouchableOpacity
              style={[styles.roundedButton, isPressed && styles.buttonPressed]}
              activeOpacity={0.7}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
            >
              <Text style={styles.buttonText}>SEE-MORE</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },

  navbar: {
    height: 121,
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 20 : (Platform.OS === 'android' ? 30 : 50),
    justifyContent: 'space-between',
  },

  tag_div: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tag: {
    width: 250,
    height: 50,
    resizeMode: 'contain',
  },

  touch: {
    padding: 10,
    zIndex: 1,
  },

  menu_icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },

  outfit_section_navbar_text: {
    color: 'white',
    fontSize: 28,
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 10,
  },

  section_1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },

  outfit: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  outfit_image1: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  outfit_image2: {
    width: 290,
    height: 290,
    resizeMode: 'contain',
    marginTop: -10,
  },

  roundedButton: {
    marginTop: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 40,
    paddingHorizontal: 40,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },

  buttonPressed: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    transform: [{ translateY: 4 }],
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    letterSpacing: 5,
    textAlign: 'center',
  },

  section_2: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#1E1E1E',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },

  middle_section_text: {
    color: 'white',
    fontSize: 30,
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 30,
  },

  polaroid_1: {
    marginTop: 40,
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  polaroid_2: {
    marginTop: 40,
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  polaroid_3: {
    marginTop: 40,
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },

  section_3_button: {
    marginTop: 40,
    alignItems: 'center',
  },
});
