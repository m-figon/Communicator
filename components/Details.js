import * as React from 'react';
import { StyleSheet, Button, Text, View, Image, ImageBackground, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import bg from './bg.jpg';
import moment from 'moment';
import EmojiSelector from 'react-native-emoji-selector'

export default class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            users: null,
            message: ""
        }
    }
    componentDidMount() {
        let previousUser;
        let currentUser = this.props.navigation.route.params.name;
        this.setState({
            user: this.props.navigation.route.params.name
        })
        setInterval(() => {
            previousUser = currentUser;
            currentUser = this.props.navigation.route.params.name;
            if (previousUser !== currentUser) {
                this.setState({
                    user: this.props.navigation.route.params.name
                })
            }
        }, 100)
    }
    changeInput(value) {
        this.setState({
            message: value
        })
    }
    addToInput(value) {
        this.setState({
            message: this.state.message + " " + value
        })
    }
    send() {
        let tmpFriends = this.props.logedAc.friends;
        tmpFriends[this.state.user.id].messages.push({
            account: this.props.logedAc.account,
            content: this.state.message,
            date: moment().format('L')
        })
        let newObj = {
            email: this.props.logedAc.email,
            account: this.props.logedAc.account,
            password: this.props.logedAc.password,
            img: this.props.logedAc.img,
            friends: tmpFriends,
            id: this.props.logedAc.id
        }
        fetch("https://rocky-citadel-32862.herokuapp.com/Communicator/users/" + this.props.logedAc.id, {
            method: "PUT",
            body: JSON.stringify(newObj),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then(() => {
            fetch('https://rocky-citadel-32862.herokuapp.com/Communicator/users')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        users: responseJson
                    }, () => {
                        console.log(this.state.users);
                        for (let item of this.state.users) {
                            if (item.account === this.state.user.account) {
                                let tmpAcFriends = item.friends.slice();
                                for (let elem of tmpAcFriends) {
                                    if (elem.account === this.props.logedAc.account) {
                                        tmpAcFriends[elem.id].messages.push({
                                            account: this.props.logedAc.account,
                                            content: this.state.message,
                                            date: moment().format('L')
                                        })
                                        let newObj2 = {
                                            email: item.email,
                                            account: item.account,
                                            password: item.password,
                                            img: item.img,
                                            friends: tmpAcFriends,
                                            id: item.id
                                        }
                                        fetch("https://rocky-citadel-32862.herokuapp.com/Communicator/users/" + item.id, {
                                            method: "PUT",
                                            body: JSON.stringify(newObj2),
                                            headers: {
                                                "Content-type": "application/json; charset=UTF-8",
                                            },
                                        }).then(() => {
                                            this.props.changeAc(newObj);
                                            this.setState({
                                                message: ""
                                            }, () => {
                                                alert('message sent!');
                                            })
                                        })

                                    }
                                }

                            }
                        }

                    })
                })

        })

    }
    render() {
        if (this.props.logedAc && this.state.user) {
            return (
                <View style={styles.friends}>
                    <ImageBackground source={bg} style={styles.friendsGradient}>
                        <View style={styles.friendsContent}>
                            <ScrollView>
                                <View style={styles.line}>
                                    <Image style={styles.bigImage} source={{ uri: this.state.user.img }}></Image>
                                    <Text style={styles.bigText}>{this.state.user.account}</Text>

                                </View>
                                {this.state.user.messages.map((item) => {
                                    return (
                                        <View>
                                            <Text style={styles.smallText}>{item.date}</Text>
                                            <View style={styles.friendsLine}>
                                                <View style={styles.left}>
                                                    <Text style={styles.smallText}>{item.account}</Text>
                                                </View>
                                                <View style={styles.right}>
                                                    <Text style={styles.smallText2}>{item.content}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })}
                                <View style={styles.line}>
                                    <TextInput placeholder="New message" style={styles.inputContent} value={this.state.message} onChangeText={(value) => { this.changeInput(value) }} />
                                    <Button onPress={() => this.send()} title="Send" color="#82b8ff"></Button>
                                </View>
                                {/* <EmojiSelector showSearchBar={false} onEmojiSelected={emoji => this.addToInput(emoji)} /> */}
                            </ScrollView>
                        </View>

                    </ImageBackground>
                </View>
            );
        } else {
            return (
                <View style={styles.home}>
                    <ImageBackground source={bg} style={styles.homeGradient}>
                        <View style={styles.homeText}>
                            <Text style={styles.whiteText}>You use friends list you have to be logged</Text>
                            <View style={styles.line}>
                                <Text style={styles.whiteText}>To use app, sign in</Text>
                            </View>
                            <View style={styles.line}>
                                <Text style={styles.whiteText}>Don't have an account? sign up</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            )
        }

    }

}

const styles = StyleSheet.create({
    friends: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    friendsGradient: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    friendsContent: {
        width: "100%",
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    bigText: {
        fontSize: 20,
        marginVertical: 10,
        color: '#82b8ff'
    },
    smallText: {
        fontSize: 15,
        color: 'white',
        paddingLeft: 15
    },
    left: {
        width: '40%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    right: {
        width: '60%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    smallText2: {
        fontSize: 15,
        color: 'white',
        paddingRight: 15
    },
    smallImage: {
        width: 50,
        height: 50,
    },
    friendsLine: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        width: '100%',
        borderColor: '#82b8ff',
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 1
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    bigImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#82b8ff',
    },
    inputContent: {
        width: '80%',
        marginRight: 10,
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#82b8ff'
    },
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
    }
});