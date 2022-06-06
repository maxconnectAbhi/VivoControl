/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import {
  Text,
  StatusBar,
  TextInput,
  LogBox,
  SafeAreaView
} from 'react-native';
import NetworkStatusProvider from './Contexts/networkStatus/NetworkStatusProvider';
import Navigator from './Navigation/SwitchNavigator';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Override Text scaling
    if (Text.defaultProps) {
      Text.defaultProps.allowFontScaling = false;
    } else {
      Text.defaultProps = {};
      Text.defaultProps.allowFontScaling = false;
    }

    // Override Text scaling in input fields
    if (TextInput.defaultProps) {
      TextInput.defaultProps.allowFontScaling = false;
    } else {
      TextInput.defaultProps = {};
      TextInput.defaultProps.allowFontScaling = false;
    }
    /* disable warnings */
    LogBox.ignoreAllLogs(true)
    StatusBar.setTranslucent(true)
    StatusBar.setBackgroundColor('transparent')
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle='dark-content' />
        <NetworkStatusProvider>
          <NavigationContainer
            ref={nav => { this.navigator = nav; }}
          >
            <Navigator />
          </NavigationContainer>
        </NetworkStatusProvider>
      </SafeAreaView>
    )
  }
}