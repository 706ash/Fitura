import { Platform, View, TouchableOpacity, StyleSheet , Text, Image, ScrollView} from 'react-native';
import { useState, useRef } from 'react';
// import { BackgroundGradientAnimation } from '../../components/BackgroundGradientAnimation/BackgroundGradientAnimation';

export default function Dashboard() {
    const [menuOpen, setMenuOpen] = useState(false);
    const scrollViewRef = useRef(null);

    const scollToSection2 = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({y: 928, animated: true});
        }
    };

    return (
        <View style={styles.container}>
            <View style = {styles.navbar}>
                <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
                        <Image source={require('../../assets/icons/menu_icon.png')} style={styles.menu_icon}/>
                </TouchableOpacity>
                <View style={styles.tag_div}>
                    <Image source={require('../../assets/images/CASUAL_text.png')} style={styles.tag} />
                </View>
                
            </View>
            
            <ScrollView ref={scrollViewRef}>                
                <View style={styles.section_1}>
                    {/* <BackgroundGradientAnimation /> */}
                    {/* TOP MENU */}                
                    
                    <View>
                        {/*RECOMMENDED OUTFIT*/}
                        
                    </View>
                </View>

                <View style={styles.section_2}>
                    {/*MIDDLE SECTION*/}            
                </View>
            </ScrollView>
            
            
        </View>

        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,        
    },

    navbar: {
        height: 131,
        backgroundColor: '#1E1E1E',
        position: 'sticky',
    },

    tag_div: {
        paddingLeft: Platform.OS === 'android' ? 45 : 0,
        paddingTop: Platform.OS === 'android' ? 20 : 0,
        justifyContent: 'center',
        alignItems: 'center',
    },

    tag: {
        width: Platform.OS === 'android' ? 250 : 320,
        height: Platform.OS === 'android' ? 40 : 50
    },

    menu_icon: {
        height: Platform.OS === 'android' ? 30 : 40,
        width: Platform.OS === 'android' ? 30 : 40,
        top: 40,
        left: 30
    },

    section_1: {
        height: 928,
        backgroundColor:'rgb(212, 56, 56)',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    
    section_2: {
        height: 928,
        backgroundColor: 'grey'
    }
});
