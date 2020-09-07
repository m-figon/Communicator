import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import bg from './bg.jpg';
import { LinearGradient } from 'expo-linear-gradient';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            account: "",
            password: ""
        }
    }
    componentDidMount() {
        fetch('https://rocky-citadel-32862.herokuapp.com/Communicator/users')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    users: responseJson
                })
            })
    }
    changeInput = (value, type) => {
        this.setState({
            [type]: value
        })
    }
    loginFunc = () => {
        // console.log(this.state.users);
        //console.log(this.state.account);
        //console.log(this.state.password);
        if (this.state.users) {
            let correctFlag = false;
            for (let item of this.state.users) {
                if (this.state.account === item.account && this.state.password === item.password) {
                    correctFlag = true;
                    this.setState({
                        account: "",
                        password: ""
                    }, () => {
                        this.props.changeAc(item);
                        Alert.alert('You loged', 'Correct user data', [
                            { text: 'Understood', onPress: () => this.props.navigation.navigation.jumpTo('Home') }
                        ])
                    })

                }
            }
            if (!correctFlag) {
                Alert.alert('Ooops!', 'Invalid user data', [
                    { text: 'Understood', onPress: () => console.log('alert closed') }
                ])
            }
        }

    }
    logout() {
        this.props.changeAc(null);
        this.props.navigation.navigation.jumpTo('Home');
    }
    render() {
        if (!this.props.logedAc) {
            return (
                <ImageBackground source={bg} style={styles.login}>
                    <LinearGradient
                        colors={['#82b8ff', 'black']}
                        style={styles.loginContent}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.titleText}>Login</Text>
                        <TextInput placeholder="Enter Account Name" value={this.state.account} onChangeText={(value) => this.changeInput(value, 'account')} style={styles.inputContent}></TextInput>
                        <TextInput placeholder="Enter Password" value={this.state.password} secureTextEntry={true} onChangeText={(value) => this.changeInput(value, 'password')} style={styles.inputContent}></TextInput>
                        <Button onPress={() => this.loginFunc()} title="Login" color="#82b8ff"></Button>
                    </LinearGradient>

                </ImageBackground>
            );
        } else {
            return (
                <ImageBackground source={bg} style={styles.login}>
                    <LinearGradient
                        colors={['#82b8ff', 'black']}
                        style={styles.loginContent}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <TouchableOpacity onPress={() => { this.logout() }}>
                            <Text style={styles.logoutText}>Logout {this.props.logedAc.account}</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                </ImageBackground>
            );

        }

    }
}

const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginContent: {
        width: 250,
        backgroundColor: 'white',
        borderWidth: 1,
        paddingHorizontal: 30,
        paddingVertical: 30,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    inputContent: {
        marginVertical: 12,
        width: '100%',
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#82b8ff'
    },
    titleText: {
        fontSize: 15,
        marginBottom: 5
    },
    logoutText: {
        fontSize: 20,
        color: 'white'
    }
});