import * as React from 'react';
import { StyleSheet, Button, Text, View, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import bg from './bg.jpg';

export default class Friends extends React.Component {
    constructor() {
        super();
        this.state = {
            logedAc: "SlickJoe",
            user: null
        }
    }
    componentDidMount() {
        fetch('https://rocky-citadel-32862.herokuapp.com/Communicator/users')
            .then((response) => response.json())
            .then((responseJson) => {
                let tmpUsers = responseJson;
                for (let item of tmpUsers) {
                    if (item.account === this.state.logedAc) {
                        this.setState({
                            user: item
                        }, () => {
                            console.log(this.state.user);
                        })
                    }
                }
            })
    }
    render() {
        if (this.state.user) {
            return (

                <View style={styles.friends}>

                    <ImageBackground source={bg} style={styles.friendsGradient}>
                        <View style={styles.friendsContent}>

                            <Text style={styles.bigText}>{this.state.logedAc} friends list</Text>
                            {this.state.user.friends.map((item) => {
                                if (item.messages.length === 0) {
                                    return (
                                        <View style={styles.friendsLine}>
                                            <View style={styles.left}>
                                                <Image style={styles.smallImage} source={{ uri: item.img }}></Image>
                                                <Text style={styles.smallText}>{item.account}</Text>
                                            </View>
                                            <View style={styles.right}>
                                                <Text style={styles.smallText2}>No Messages</Text>
                                            </View>
                                        </View>
                                    )
                                } else {
                                    return (
                                        <View style={styles.friendsLine}>
                                            <View style={styles.left}>
                                                <Image style={styles.smallImage} source={{ uri: item.img }}></Image>
                                                <Text style={styles.smallText}>{item.account}</Text>
                                            </View>
                                            <View style={styles.right}>
                                                <Text style={styles.smallText2}>Last message 13:30</Text>
                                            </View>
                                        </View>
                                    )
                                }

                            })}
                        </View>

                    </ImageBackground>
                </View>
            );
        } else {
            return (
                <View style={styles.friends}>
                    <LinearGradient
                        colors={['#82b8ff', 'black']}
                        style={styles.friendsGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.smallText}>Loading...</Text>
                    </LinearGradient>
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
    }
});