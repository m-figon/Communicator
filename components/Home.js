import * as React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.home}>
            {/* <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      /> */}
            <LinearGradient
                colors={['gray', 'white']}
                style={styles.homeGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
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
    },
    whiteText: {
        color: 'white'
    },
    blueText: {
        color: 'blue',
        marginHorizontal: 10
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});