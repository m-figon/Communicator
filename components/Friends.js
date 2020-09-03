import * as React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

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
                    <LinearGradient
                        colors={['gray', 'white']}
                        style={styles.friendsGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text>Welcome to friends list</Text>
                        {this.state.user.friends.map((item) => {
                            return (
                                <Text>{item.account}</Text>
                            )
                        })}
                    </LinearGradient>
                </View>
            );
        } else {
            return (
                <View>
                    <Text>Loading...</Text>
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
});