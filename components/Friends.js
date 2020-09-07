import * as React from 'react';
import { StyleSheet, Button, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import bg from './bg.jpg';

export default class Friends extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null
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