import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native';
import bg from './bg.jpg';
import { LinearGradient } from 'expo-linear-gradient';


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            account: "",
            email: "",
            password: "",
            password2: "",
            img: "",
            emailShow: false,
            accountShow: false,
            passwordShow: false,
            password2Show: false,
            avatar: null
        }
    }
    settingState = (type, value) => {
        this.setState({
            [type]: value
        })
    }
    settingInput = (value, type) => {
        this.setState({
            [type]: value
        })
    }
    registerFunc = () => {
        let registerFlag = true;
        if (
            !(this.state.email.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) ===
                null
            )
        ) {
            this.settingState('emailShow', false);
        } else {
            this.settingState('emailShow', true);
            registerFlag = false;
        }
        if (
            !(this.state.account.match(/^[a-zA-Z0-9\.\-_]{4,10}$/) === null)
        ) {
            this.settingState('accountShow', false);
        } else {
            this.settingState('accountShow', true);
            registerFlag = false;
        }
        if (
            !(
                this.state.password.match(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/
                ) === null
            )
        ) {
            this.settingState('passwordShow', false);
        } else {
            this.settingState('passwordShow', true);
            registerFlag = false;
        }
        if (
            this.state.password === this.state.password2 &&
            !(
                this.state.password.match(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/
                ) === null
            )
        ) {
            this.settingState('password2Show', false);
        } else {
            this.settingState('password2Show', true);
            registerFlag = false;
        }
        if (registerFlag) {
            fetch("https://rocky-citadel-32862.herokuapp.com/Communicator/users", {
                method: "POST",
                body: JSON.stringify({
                    email: this.state.email,
                    account: this.state.account,
                    password: this.state.password,
                    img: this.state.img,
                    friends: [],
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }).then(() => {
                Alert.alert('New user created', 'Correct user data', [
                    {
                        text: 'Understood', onPress: () => this.setState({
                            account: "",
                            email: "",
                            password: "",
                            password2: "",
                            emailShow: false,
                            accountShow: false,
                            passwordShow: false,
                            password2Show: false
                        })
                    }
                ])

            });

        }
    }
    selectImg(url, num){
        this.setState({
            img: url,
            avatar: num
        })
    }
    render() {
        return (
            <ImageBackground source={bg} style={styles.login}>
                <LinearGradient
                    colors={['#82b8ff', 'black']}
                    style={styles.loginContent}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.titleText}>Registration</Text>
                    <TextInput placeholder="Enter Email Address" value={this.state.email} onChangeText={(value) => this.settingInput(value, 'email')} style={styles.inputContent}></TextInput>
                    <Text style={[
                        styles.warning,
                        this.state.emailShow ?
                            { display: 'flex' }
                            : { display: 'none' }]} > Please enter correct email</Text>
                    <TextInput placeholder="Enter Account Name" value={this.state.account} onChangeText={(value) => this.settingInput(value, 'account')} style={styles.inputContent}></TextInput>
                    <Text style={[
                        styles.warning,
                        this.state.accountShow ?
                            { display: 'flex' }
                            : { display: 'none' }]} >Account name must be 4-10 letters or digits</Text>
                    <TextInput placeholder="Enter Password" value={this.state.password} secureTextEntry={true} onChangeText={(value) => this.settingInput(value, 'password')} style={styles.inputContent}></TextInput>
                    <Text style={[
                        styles.warning,
                        this.state.passwordShow ?
                            { display: 'flex' }
                            : { display: 'none' }]} >Password name must be 8-13 characters, at least one upper and lower case letter, special sign, a digit</Text>
                    <TextInput placeholder="Confirm Password" value={this.state.password2} secureTextEntry={true} onChangeText={(value) => this.settingInput(value, 'password2')} style={styles.inputContent}></TextInput>
                    <Text style={[
                        styles.warning,
                        this.state.password2Show ?
                            { display: 'flex' }
                            : { display: 'none' }]} >Password must be correct and same as password confirmation</Text>
                    <View style={styles.line}>
                        <TouchableOpacity onPress={()=>this.selectImg('https://robohash.org/77set=set6',1)}>
                        <Image style={[
                        styles.avatarImg,
                        this.state.avatar===1 ?
                            { borderWidth: 2 }
                            : { borderWidth: 0 }]} source={{ uri: 'https://robohash.org/77set=set6' }}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(e)=>this.selectImg('https://robohash.org/77set=set6',2)}>
                        <Image style={[
                        styles.avatarImg,
                        this.state.avatar===2 ?
                            { borderWidth: 2 }
                            : { borderWidth: 0 }]} source={{ uri: 'https://robohash.org/77set=set10' }}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(e)=>this.selectImg('https://robohash.org/77set=set6',3)}>
                        <Image style={[
                        styles.avatarImg,
                        this.state.avatar===3 ?
                            { borderWidth: 2 }
                            : { borderWidth: 0 }]} source={{ uri: 'https://robohash.org/77set=set20' }}></Image>
                        </TouchableOpacity>
                    </View>
                    <Button onPress={() => this.registerFunc()} title="Register" color="#82b8ff"></Button>
                </LinearGradient>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginContent: {
        width: 300,
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
        borderBottomWidth: 1,
        width: '100%',
        color: 'white',
        borderBottomColor: '#82b8ff'
    },
    warning: {
        color: 'red',
        marginBottom: 7
    },
    line: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    avatarImg: {
        height: 50,
        width: 50,
        borderRadius: 30,
        borderColor: 'green'
    },
    titleText: {
        fontSize: 15,
        marginBottom: 5
    }
});