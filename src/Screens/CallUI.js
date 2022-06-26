
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Platform} from 'react-native';
import RNVoipCall, { RNVoipPushKit } from 'react-native-voip-call';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

var ding = new Sound('iphone.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // if loaded successfully
    console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());
  
  });

const CallUI = ({navigation,route}) => {
 const {data} = route.params;
 const IsIos = Platform.OS === 'ios';


  useEffect(() => {
    ding.setVolume(1);
   playRingtune()
    // return () => {
    //   ding.release();
    // };
  }, []);
  
 
  const playRingtune = () => {
    if(IsIos){
      ding.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }else{
      let options = { 
        fileName: 'filename', // file inside android/app/src/main/res/raw 
        loop:true // looping the Ringtune
      }
      RNVoipCall.playRingtune(options.fileName, options.loop);   
    }
  }
  
  const stopRingtune = () => {
    if(IsIos){
      ding.stop(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }else{
      RNVoipCall.stopRingtune();
    }
  }

  const handleAction=(type)=>{
    stopRingtune()
   if(type){
    navigation.replace('VideoCall', {room_name: data.roomName, zoneId: data.zoneId})
   }else{
    navigation.goBack()
   }
  }

  return (
    <View style={styles.container}>
        <View style={styles.circleView}>
      <Text style={styles.title}>Vivo Control</Text>
      <Text style={styles.title}>{data.personName}</Text>
      <Text>calling...</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.circleView}>
          <TouchableOpacity onPress={()=> handleAction(false)}>
            <Image source={require('../Assets/failed.png')} style={styles.circle}/>
          </TouchableOpacity>
          <Text>Decline</Text>
        </View>

        <View style={styles.circleView}>
          <TouchableOpacity onPress={()=> handleAction(true)}>
            <Image source={require('../Assets/correct.png')} style={styles.circle}/>
          </TouchableOpacity>
          <Text>Accept</Text>
        </View>
      </View>
    </View>
  );
};

export default CallUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFF'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
  circle: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 25,
  },
  circleView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
