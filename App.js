import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import FriendsNavigation from './components/FriendsNavigation';

const Drawer = createDrawerNavigator();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logedAc: null
    }
    this.changeAc = this.changeAc.bind(this);
  }
  changeAc(value) {
    this.setState({
      logedAc: value
    })
  }
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home">
            {navigation => <Home navigation={navigation} changeAc={this.changeAc} logedAc={this.state.logedAc} />}
          </Drawer.Screen>
          <Drawer.Screen
            name="Friends List">
            {navigation => <FriendsNavigation navigation={navigation} changeAc={this.changeAc} logedAc={this.state.logedAc} />}
          </Drawer.Screen>
          <Drawer.Screen
            name="Login">
            {navigation => <Login navigation={navigation} changeAc={this.changeAc} logedAc={this.state.logedAc} />}
          </Drawer.Screen>
          <Drawer.Screen name="Register" component={Register} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

}