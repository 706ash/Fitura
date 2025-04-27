import { Platform, View, TouchableOpacity, StyleSheet , Text, Image, ScrollView} from 'react-native';
import { useState, useRef } from 'react';
import { Dimensions, ScrollView as RNScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StackedCarousel from '../../components/ui/StackedCarousel'

export default function Dashboard() {
    const [menuOpen, setMenuOpen] = useState(false);
    const scrollViewRef = useRef<RNScrollView>(null);
    const [isPressed, setIsPressed] = useState(false);

    const scollToSection2 = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({y: 928, animated: true});
        }
    };

    return (
        <View style={styles.container}>
            
            {/*NAVBAR*/}
            <View style = {styles.navbar}>
                <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.touch}>
                        <Image source={require('../../assets/icons/menu_icon.png')} style={styles.menu_icon}/>
                </TouchableOpacity>
                <View style={styles.tag_div}>
                    <Image source={require('../../assets/images/CASUAL_text.png')} style={styles.tag} />
                </View>                
            </View>


            
            <ScrollView ref={scrollViewRef}>   
                <View>
                    {/* TOP MENU */}                
                    <LinearGradient
                        colors = {['#FF4E50', '#F9D423']}
                        start = {{ x: 0.5, y : 0.06}}
                        end = {{x: 0.5, y: 1}}
                        style={styles.section_1}
                        >
                        
                        <View style ={styles.outfit}>
                            {/*RECOMMENDED OUTFIT*/}
                            <Image source={require('../../assets/recommendations/demo_shirt.png')} style = {styles.outfit_image1}/>
                            <Image source={require('../../assets/recommendations/demo_cargo_pant.png')} style = {styles.outfit_image2}/>
                        </View>

                        <TouchableOpacity
                            style={[styles.roundedButton, isPressed && styles.buttonPressed]}
                            activeOpacity={0.7}
                            onPressIn={()=> setIsPressed(true)}
                            onPressOut={()=> setIsPressed(false)}
                        >
                            <Text style={styles.buttonText}>TRY-ON</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>


                <View style={styles.section_2}>
                    {/*MIDDLE SECTION*/}  
                    <Text style={styles.middle_section_text}>STYLE MEETS COMFORT. PAIR THIS LOOK WITH</Text>          
                    <StackedCarousel />
                </View> 

            </ScrollView>
            
            
        </View>

        
    );
}

const {width, height} = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1,        
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
        height: Platform.OS === 'android' ? 40 : 50
    },

    touch: {      
        position: 'absolute',  
        top: Platform.OS === 'android' ? 53: 40,
        left: 30
    },

    menu_icon: {
        height: Platform.OS === 'android' ? 30 : 40,
        width: Platform.OS === 'android' ? 30 : 40,
    },

    section_1: {
        position: 'relative',
        height: height,
        alignItems: 'center',
    },
    
    outfit: {
        position: 'absolute',
        top: 20,
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
    },

    roundedButton: {
        top: Platform.OS ==='android'? height * 0.74 : height * 0.71,
        backgroundColor: '#1E1E1E',
        borderRadius: 40,
        paddingHorizontal: 40,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 8},
        elevation: 8,
        shadowOpacity: 0.4,
        shadowRadius: 8
    },
    
    buttonPressed: {
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        transform: [{translateY: 4}],
    },

    buttonText: {
        color: 'white',
        fontSize: 20,
        letterSpacing: 5
    },

    section_2: {
        position: 'relative',
        height: height,
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
    },

    middle_section_text: {
        top: Platform.OS ==='android'? 50 : 105,
        color: 'white',
        fontSize: Platform.OS ==='android'? 28 : 50,
        letterSpacing: 3,
        textAlign: 'center'
    },
});
