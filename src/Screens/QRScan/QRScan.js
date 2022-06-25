import React, { Component } from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  View,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import CustomButton from '../../Components/CustomButton';
import { callNumber } from '../../Utils/CallNumber';

export default class QRScan extends Component {
  onSuccess = e => {
    Alert.alert(
      "Success",
       e.data,
      [
        {
          text: "Phone Call",
          onPress: () => callNumber(e.data),
        },
        { text: "Video Call", 
        onPress: () => this.props.navigation.navigate('VideoCall',{number: e.data}) }
      ]
    );
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        showMarker
       // cameraContainerStyle={{height: '90%', backgroundColor:'red'}}
       cameraStyle={{height:'90%'}}
        //containerStyle={{backgroundColor:'yellow', alignItems:'flex-end'}}
        flashMode={RNCamera.Constants.FlashMode.torch}
        //   flashMode={1}
        // topContent={
        //   <Text style={styles.centerText}>
        //     Scan QR Code
        //   </Text>
        // }
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
      />
      
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
   // flex: 1,
    fontSize: 18,
   // padding: 32,
    fontWeight: '500',
    //color: '#000',
    color: 'rgb(0,122,255)'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16,
  }
});
