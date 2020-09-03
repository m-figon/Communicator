import * as React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

export default function Login({ navigation }) {
    return (
        <View style={styles.home}>
            <LinearGradient
                colors={['gray', 'white']}
                style={styles.homeGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={styles.homeText}>Login</Text>
            </LinearGradient>
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
    homeGradient:{
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