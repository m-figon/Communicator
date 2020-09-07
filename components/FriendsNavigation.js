import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Friends from './Friends.js';
import Details from './Details.js';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
            name="Friends">
            {navigation => <Friends navigation={navigation} changeAc={this.props.changeAc} logedAc={this.props.logedAc} />}
          </Stack.Screen>
          <Stack.Screen
            name="Details">
            {navigation => <Details navigation={navigation} changeAc={this.props.changeAc} logedAc={this.props.logedAc} />}
          </Stack.Screen>
        </Stack.Navigator>
    );
  }
}