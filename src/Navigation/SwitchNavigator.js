import React, {  } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigatorComponent from './StackNavigator';
import Splash from '../Screens/Splash/Splash';
import Login from '../Screens/Login/Login';


const MainStackNavigator = createStackNavigator();

const Navigator = () => {
  return (
    <MainStackNavigator.Navigator
      initialRouteName='Splash'
      screenOptions={{
        headerShown: false
      }}>
        <MainStackNavigator.Screen name='Splash' component={Splash} />
          <MainStackNavigator.Screen name='Login' component={Login} />
          <MainStackNavigator.Screen name='Home' component={StackNavigatorComponent} />
    </MainStackNavigator.Navigator>
  )
}

export default Navigator;
