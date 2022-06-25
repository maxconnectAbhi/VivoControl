/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Text,
  StatusBar,
  TextInput,
  LogBox,
  SafeAreaView} from 'react-native';
import NetworkStatusProvider from './Contexts/networkStatus/NetworkStatusProvider';
import Navigator from './Navigation/SwitchNavigator';



function App() {
  useEffect(() => {
    componentMount()
  }, []);


   const componentMount=()=> {
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

export default App;