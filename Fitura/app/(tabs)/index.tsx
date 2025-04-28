import { Platform, View, TouchableOpacity, StyleSheet, Text, Image, ScrollView, Dimensions } from 'react-native';
import { useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import StackedCarousel from '../../components/ui/StackedCarousel';

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isPressed, setIsPressed] = useState(false);

  const scrollToSection2 = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: section2Offset, animated: true });
    }
  };

  // On web use viewport height
  const sectionHeight = Platform.OS === 'web' ? '100vh' : Dimensions.get('window').height;
  const section2Offset = Platform.OS === 'web' ? window.innerHeight : Dimensions.get('window').height; 

  return (
    <View style={styles.container}>
      {/* NAVBAR */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.touch}>
          <Image source={require('../../assets/icons/menu_icon.png')} style={styles.menu_icon} />
        </TouchableOpacity>
        <View style={styles.tag_div}>
          <Image source={require('../../assets/images/CASUAL_text.png')} style={styles.tag} />
        </View>                
      </View>

      <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
        {/* SECTION 1 */}
        <LinearGradient
          colors={['#FF4E50', '#F9D423']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[styles.section_1, { minHeight: sectionHeight }]}
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
        <View style={[styles.section_2, { minHeight: sectionHeight }]}>
          <Text style={styles.middle_section_text}>STYLE MEETS COMFORT. PAIR THIS LOOK WITH</Text>          
          <StackedCarousel />
        </View>
      </ScrollView>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Important for web
  },

  navbar: {
    height: 121,
    backgroundColor: '#1E1E1E',
  },

  tag_div: {
    paddingLeft: Platform.OS === 'android' ? 45 : 0,
    paddingTop: Platform.OS === 'android' ? 50 : 38,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tag: {
    width: Platform.OS === 'android' ? 250 : 320,
    height: Platform.OS === 'android' ? 40 : 50,
  },

  touch: {      
    position: 'absolute',  
    top: Platform.OS === 'android' ? 53 : 40,
    left: 30,
  },

  menu_icon: {
    height: Platform.OS === 'android' ? 30 : 40,
    width: Platform.OS === 'android' ? 30 : 40,
  },

  section_1: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  outfit: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
    marginTop: -20,
  },

  roundedButton: {
    marginTop: 40,
    backgroundColor: '#1E1E1E',
    borderRadius: 40,
    paddingHorizontal: 40,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    shadowOpacity: 0.4,
    shadowRadius: 8,
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
    paddingTop: 50,
  },

  middle_section_text: {
    color: 'white',
    fontSize: Platform.OS === 'android' ? 28 : 50,
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 20,
  },
});
