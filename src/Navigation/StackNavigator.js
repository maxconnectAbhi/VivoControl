import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home/Home';
import { VideoCall } from '../Screens/VideoCall.js/VideoCall';
import IncomingCall from '../Screens/VideoCall.js/IncomingCall';
const StackNavigator = createStackNavigator();

const StackNavigatorComponent = () => {
  return (
    <StackNavigator.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false
      }}>
      <StackNavigator.Screen name='Home' component={Home} />
      <StackNavigator.Screen name='VideoCall' component={VideoCall} />
      <StackNavigator.Screen name='IncomingCall' component={IncomingCall} />

    </StackNavigator.Navigator>
  )
}

export default StackNavigatorComponent;