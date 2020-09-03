import * as React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import bg from './bg.jpg';
export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.home}>
            <ImageBackground source={bg} style={styles.homeGradient}>
                <View style={styles.homeText}>
                    <Text style={styles.whiteText}>Welcome to Communcator App, swipe to navigate!</Text>
                    <View style={styles.line}>
                        <Text style={styles.whiteText}>To use app,</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                            <Text style={styles.blueText}>sign in</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.whiteText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Register') }}>
                            <Text style={styles.blueText}>sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        width: 340,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        borderWidth: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    whiteText: {
        color: 'white'
    },
    blueText: {
        color: '#82b8ff',
        marginHorizontal: 10
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});