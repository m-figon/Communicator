import * as React from 'react';
import { StyleSheet, Button, Text, View, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import bg from './bg.jpg';

export default class Friends extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            newFriend: ""
        }
    }
    changeInput(type, value) {
        this.setState({
            [type]: value
        })
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
    search() {
        let corretFlag1 = true;
        let corretFlag2 = true;
        let corretFlag3 = false;
        if(this.state.newFriend === this.props.logedAc.account){
            corretFlag1 = false;
        }
        if (!corretFlag1) {
            alert('You can not add youself')
        }
        for (let elem of this.props.logedAc.friends) {
            if (elem.account === this.state.newFriend) {
                corretFlag2 = false;
            }
        }
        if (!corretFlag2) {
            alert('User is already in friends list')
        }
        if(corretFlag1 && corretFlag2) {
            for (let item of this.state.users) {
                if (item.account === this.state.newFriend) {
                    corretFlag3 = true;
                    let newFriends = this.props.logedAc.friends.slice();
                    newFriends.push({
                        account: item.account,
                        img: item.img,
                        messages: [],
                        id: this.props.logedAc.friends.length
                    })
                    let newObj = {
                        email: this.props.logedAc.email,
                        account: this.props.logedAc.account,
                        password: this.props.logedAc.password,
                        img: this.props.logedAc.img,
                        friends: newFriends,
                        id: this.props.logedAc.id
                    }
                    fetch("https://rocky-citadel-32862.herokuapp.com/Communicator/users/" + this.props.logedAc.id, {
                        method: "PUT",
                        body: JSON.stringify(newObj),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    }).then(() => {
                        this.props.changeAc(newObj);
                        this.setState({
                            newFriend: ""
                        }, () => {
                            fetch('https://rocky-citadel-32862.herokuapp.com/Communicator/users')
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    this.setState({
                                        users: responseJson
                                    })
                                }).then(() => {
                                    alert('New user added');
                                })
                        })
                    })
                }
            }
            if (!corretFlag3) {
                alert('User not found');
            }
        }


    }
    render() {
        if (this.props.logedAc) {
            return (
                <View style={styles.friends}>
                    <ImageBackground source={bg} style={styles.friendsGradient}>
                        <View style={styles.friendsContent}>
                            <View style={styles.line}>
                                <Image style={styles.bigImage} source={{ uri: this.props.logedAc.img }}></Image>
                                <Text style={styles.bigText}>{this.props.logedAc.account} friends list</Text>
                            </View>
                            {this.props.logedAc.friends.map((item) => {
                                if (item.messages.length === 0) {
                                    return (
                                        <TouchableOpacity onPress={() => this.props.navigation.navigation.push('Details', { name: item })}>
                                            <View style={styles.friendsLine}>
                                                <View style={styles.left}>
                                                    <Image style={styles.smallImage} source={{ uri: item.img }}></Image>
                                                    <Text style={styles.smallText}>{item.account}</Text>
                                                </View>
                                                <View style={styles.right}>
                                                    <Text style={styles.smallText2}>No Messages</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                } else {
                                    return (
                                        <TouchableOpacity onPress={() => this.props.navigation.navigation.push('Details', { name: item })}>
                                            <View style={styles.friendsLine}>
                                                <View style={styles.left}>
                                                    <Image style={styles.smallImage} source={{ uri: item.img }}></Image>
                                                    <Text style={styles.smallText}>{item.account}</Text>
                                                </View>
                                                <View style={styles.right}>
                                                    <Text style={styles.smallText2}>Last message {item.messages[item.messages.length - 1].date}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }

                            })}
                            <View style={styles.line}>
                                <TextInput placeholder="Search for user" style={styles.inputContent} value={this.state.newFriend} onChangeText={(value) => { this.changeInput('newFriend', value) }} />
                                <Button onPress={() => this.search()} title="Send" color="#82b8ff"></Button>
                            </View>
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
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    bigText: {
        fontSize: 20,
        marginVertical: 10,
        color: '#82b8ff'
    },
    smallText: {
        fontSize: 15,
        color: 'white'
    },
    left: {
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    right: {
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
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
        marginVertical: 10
    },
    inputContent: {
        width: '80%',
        marginRight: 10,
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#82b8ff'
    },
    bigImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#82b8ff',
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