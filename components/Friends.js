import * as React from 'react';
import { StyleSheet, Button, Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import bg from './bg.jpg';
import { AntDesign } from '@expo/vector-icons';

export default class Friends extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            newFriend: "",
            filter: ""
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
    deletePopUp(item) {
        Alert.alert(
            "Deleting user",
            "Are you sure that you want to remove a user?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.deleteUser(item) }
            ],
            { cancelable: false }
        );
    }
    deleteUser(item) {
        console.log(item);
        let tmpFriends = this.props.logedAc.friends.slice();
        for (let [key, friend] of tmpFriends.entries()) {
            if (item.account === friend.account) {
                tmpFriends.splice(key, 1);
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
                    this.props.changeAc(newObj);
                    for (let elem of this.state.users) {
                        if (elem.account === item.account) {
                            let elemFriends = elem.friends.slice();
                            for (let [index, friend] of elemFriends.entries()) {
                                if (friend.account === this.props.logedAc.account) {
                                    elemFriends.splice(index, 1);
                                    console.log(elemFriends);
                                    fetch("https://rocky-citadel-32862.herokuapp.com/Communicator/users/" + elem.id, {
                                        method: "PUT",
                                        body: JSON.stringify({
                                            email: elem.email,
                                            account: elem.account,
                                            password: elem.password,
                                            img: elem.img,
                                            friends: elemFriends,
                                            id: elem.id
                                        }),
                                        headers: {
                                            "Content-type": "application/json; charset=UTF-8",
                                        },
                                    })
                                }
                            }
                        }
                    }
                })
            }
        }
    }
    search() {
        let corretFlag1 = true;
        let corretFlag2 = true;
        let corretFlag3 = false;
        let newUser;
        if (this.state.newFriend === this.props.logedAc.account) {
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
            alert('User is already in friends list or you sent the invitation already')
        }
        if (corretFlag1 && corretFlag2) {
            for (let item of this.state.users) {
                if (item.account === this.state.newFriend) {
                    corretFlag3 = true;
                    let newFriends = this.props.logedAc.friends.slice();
                    newFriends.push({
                        account: item.account,
                        img: item.img,
                        confirmed: -1,
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
                        for (let elem of this.state.users) {
                            if (elem.account === this.state.newFriend) {
                                let newUser = elem;
                                let newFriends2 = newUser.friends.slice();
                                newFriends2.push({
                                    account: this.props.logedAc.account,
                                    img: this.props.logedAc.img,
                                    confirmed: 0,
                                    messages: [],
                                    id: newUser.friends.length
                                })
                                let newObj2 = {
                                    email: newUser.email,
                                    account: newUser.account,
                                    password: newUser.password,
                                    img: newUser.img,
                                    friends: newFriends2,
                                    id: newUser.id
                                }
                                fetch("https://rocky-citadel-32862.herokuapp.com/Communicator/users/" + newUser.id, {
                                    method: "PUT",
                                    body: JSON.stringify(newObj2),
                                    headers: {
                                        "Content-type": "application/json; charset=UTF-8",
                                    },
                                })
                            }
                        }
                        this.setState({
                            newFriend: ""
                        }, () => {
                            fetch('https://rocky-citadel-32862.herokuapp.com/Communicator/users')
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    this.setState({
                                        users: responseJson
                                    })
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
    accept(item) {
        let tmpFriends = this.props.logedAc.friends.slice();
        for (let [key, friend] of tmpFriends.entries()) {
            if (friend.account === item.account) {
                tmpFriends[key].confirmed = 1;
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
                    this.props.changeAc(newObj);
                    for (let user of this.state.users) {
                        if (user.account === item.account) {
                            let tmpFriends2 = user.friends.slice();
                            for (let [key2, friend] of tmpFriends2.entries()) {
                                if (friend.account === this.props.logedAc.account) {
                                    tmpFriends2[key2].confirmed = 1;
                                    let newObj2 = {
                                        email: user.email,
                                        account: user.account,
                                        password: user.password,
                                        img: user.img,
                                        friends: tmpFriends2,
                                        id: user.id
                                    }
                                    fetch("https://rocky-citadel-32862.herokuapp.com/Communicator/users/" + user.id, {
                                        method: "PUT",
                                        body: JSON.stringify(newObj2),
                                        headers: {
                                            "Content-type": "application/json; charset=UTF-8",
                                        },
                                    })
                                }
                            }
                        }
                    }
                })
            }
        }
    }
    render() {
        const InputVisiblity = () => {
            if (this.props.logedAc.friends.length === 0) {
                return (
                    null
                )
            } else {
                return (
                    <TextInput placeholder="Search for user" style={styles.filterInputContent} value={this.state.filter} onChangeText={(value) => { this.changeInput('filter', value) }} />
                )
            }
        }
        if (this.props.logedAc) {
            return (
                <View style={styles.friends}>
                    <ImageBackground source={bg} style={styles.friendsGradient}>
                        <View style={styles.friendsContent}>
                            <View style={styles.line}>
                                <Image style={styles.bigImage} source={{ uri: this.props.logedAc.img }}></Image>
                                <Text style={styles.bigText}>{this.props.logedAc.account} friends list</Text>
                            </View>
                            <InputVisiblity />
                            {this.props.logedAc.friends.map((item,index) => {
                                if (item.confirmed === 1 && item.messages.length === 0 && item.account.toLowerCase().includes(this.state.filter.toLowerCase())) {
                                    return (
                                        <View key={index} style={styles.friendsLine}>
                                            <TouchableOpacity style={styles.left} onPress={() => this.props.navigation.navigation.push('Details', { name: item })}>
                                                <Image style={styles.smallImage} source={{ uri: item.img }}></Image>
                                                <Text style={styles.smallText}>{item.account}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.middle} onPress={() => this.props.navigation.navigation.push('Details', { name: item })}>
                                                <Text style={styles.smallText2}>No Messages</Text>
                                            </TouchableOpacity>
                                            <View style={styles.right}>
                                                <TouchableOpacity onPress={() => { this.deletePopUp(item) }}>
                                                    <AntDesign name="deleteuser" size={17} color="white" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                } else if (item.confirmed === 1 && item.messages.length > 0 && item.account.toLowerCase().includes(this.state.filter.toLowerCase())) {
                                    return (
                                        <TouchableOpacity onPress={() => this.props.navigation.navigation.push('Details', { name: item })}>
                                            <View style={styles.friendsLine}>
                                                <View style={styles.left}>
                                                    <Image style={styles.smallImage} source={{ uri: item.img }}></Image>
                                                    <Text style={styles.smallText}>{item.account}</Text>
                                                </View>
                                                <View style={styles.middle}>
                                                    <Text style={styles.smallText2}>{item.messages[item.messages.length-1].date}</Text>
                                                </View>
                                                <TouchableOpacity style={styles.right} onPress={() => { this.deletePopUp(item) }}>
                                                    <AntDesign name="deleteuser" size={17} color="white" />
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                } else if (item.confirmed === 0) {
                                    return (
                                        <View style={styles.friendsLine}>
                                            <View style={styles.left}>
                                                <Image style={styles.smallImage} source={{ uri: item.img }}></Image>
                                                <Text style={styles.smallText}>{item.account}</Text>
                                            </View>
                                            <View style={styles.middle}>
                                                <Text style={styles.smallText2}>{item.account} sent you an invitation</Text>
                                            </View>
                                            <View style={styles.right}>
                                                <TouchableOpacity style={styles.marginSet} onPress={() => { this.accept(item) }}>
                                                    <AntDesign name="check" size={24} color="green" />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.marginSet} onPress={() => { this.deletePopUp(item) }}>
                                                    <AntDesign name="close" size={24} color="red" />
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    )
                                } else if (item.confirmed === -1) {
                                    return (
                                        <View style={styles.friendsLine}>
                                            <View style={styles.left}>
                                                <Image style={styles.smallImage} source={{ uri: item.img }}></Image>
                                                <Text style={styles.smallText}>{item.account}</Text>
                                            </View>
                                            <View style={styles.right2}>
                                                <Text style={styles.smallText2}>Invitation Sent</Text>
                                            </View>
                                        </View>
                                    )
                                }

                            })}
                            <View style={styles.line}>
                                <TextInput placeholder="Enter user to add" style={styles.inputContent} value={this.state.newFriend} onChangeText={(value) => { this.changeInput('newFriend', value) }} />
                                <Button onPress={() => this.search()} title="Add" color="#82b8ff"></Button>
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
        width: '45%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    middle: {
        width: '45%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10
    },
    right: {
        width: '10%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 10
    },
    right2: {
        width: '55%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 10
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
    friendsOpacity: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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
    filterInputContent: {
        width: '100%',
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#82b8ff',
        marginVertical: 10
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
    },
    marginSet: {
        marginHorizontal: 1
    }
});