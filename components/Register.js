import * as React from 'react';
import { StyleSheet, Button, Text, View, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import bg from './bg.jpg';

export default function Register({ navigation }) {
    return (
        <View style={styles.home}>
            <ImageBackground source={bg} style={styles.homeGradient}>
                <Text style={styles.homeText}>Register</Text>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeGradient: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    homeText: {
        width: 300,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        borderWidth: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 20
    }
});