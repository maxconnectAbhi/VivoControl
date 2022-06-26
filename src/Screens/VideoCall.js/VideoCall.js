import React, { useState, useRef, useEffect } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from "react-native";

import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from "react-native-twilio-video-webrtc";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import { GetApi, PostApiToken } from "../../Network/Fetch";
import { DOOR_TRIGGER, VIDEO_TOKEN } from "../../Network/URL";
import { width } from "../../Utils/Scale";

import styleSheet from "./styles";

const styles = StyleSheet.create(styleSheet);

export const VideoCall = ({navigation, route}) => {
 const {room_name, zoneId} = route.params;
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [indicator, setIndicator] = useState(false);
  const [status, setStatus] = useState("disconnected");
  const [participants, setParticipants] = useState(new Map());
  const [videoTracks, setVideoTracks] = useState(new Map());
  const twilioVideo = useRef(null);

  useEffect(() => {
     _onConnect()
  }, [])
  
  const _onConnect =()=>{
    GetApi(VIDEO_TOKEN)
    .then(async (response) => {
     if(response.status == 200){
      _onConnectButtonPress(response.data.token)
     }else{
       alert('Something went wrong!')
     }
    })
  }

  const doorTrigger =()=>{
    setIndicator(true)
    let url = DOOR_TRIGGER + zoneId +'/trigger'
    GetApi(url)
    .then(async (response) => {
      setIndicator(false)
     if(response.status == 200){
      alert('Door opened successfully')
     }else{
       alert('Something went wrong!')
     }
    })
  }

  const _onConnectButtonPress = async (token) => {
    if (Platform.OS === "android") {
      await _requestAudioPermission();
      await _requestCameraPermission();
    }
    twilioVideo.current.connect({roomName: room_name, accessToken: token, enableNetworkQualityReporting: true, dominantSpeakerEnabled: true});
    setStatus("connecting");
  };

  const _onEndButtonPress = () => {
    twilioVideo.current.disconnect();
    navigation.goBack()
  };

  const _onMuteButtonPress = () => {
    twilioVideo.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then((isEnabled) => setIsAudioEnabled(isEnabled));
  };

  const _onFlipButtonPress = () => {
    twilioVideo.current.flipCamera();
  };

  const _onRoomDidConnect = (e) => {
    console.log('e== ', e);
    setStatus("connected");
  };

  const _onRoomDidDisconnect = ({ error }) => {
    console.log("ERROR: ", error);

    setStatus("disconnected");
  };

  const _onRoomDidFailToConnect = (error) => {
    console.log("ERROR: ", error);

    setStatus("disconnected");
  };

  const _onParticipantAddedVideoTrack = ({ participant, track }) => {
    console.log("onParticipantAddedVideoTrack: ", participant, track);

    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ])
    );
  };

  const _onParticipantRemovedVideoTrack = ({ participant, track }) => {
    console.log("onParticipantRemovedVideoTrack: ", participant, track);

    const newVideoTracks = new Map(videoTracks);
    newVideoTracks.delete(track.trackSid);

    setVideoTracks(newVideoTracks);
  };

  const _onNetworkLevelChanged = ({ participant, isLocalUser, quality }) => {
    console.log("Participant", participant, "isLocalUser", isLocalUser, "quality", quality);
    setParticipants(participant)
  };

  const _onDominantSpeakerDidChange = ({ roomName, roomSid, participant }) => {
    console.log("onDominantSpeakerDidChange", `roomName: ${roomName}`, `roomSid: ${roomSid}`, "participant:", participant);
  };

  const _requestAudioPermission = () => {
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "Need permission to access microphone",
        message:
          "To run this demo we need permission to access your microphone",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
  };

  const _requestCameraPermission = () => {
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: "Need permission to access camera",
      message: "To run this demo we need permission to access your camera",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    });
  };

  return (
    <View style={styles.container}>
      {status === "disconnected" && (
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.welcome}>Twilio Video</Text>
          {/* <CustomInput
            outerViewStyle={{marginVertical: '10%'}}
            placeholder="Enter Token"
            autoCapitalize="none"
            value={token}
            onChangeText={(text) => setToken(text)}
          />
          */}
      <Text style={styles.welcome}>Connecting...</Text>
      {/* <CustomButton
            title="Re-Connect"
            onPress={()=>_onConnect()}
          /> */}
        </View>
      )}

      {(status === "connected" || status === "connecting") && (
        <View style={styles.callContainer}>
          {/* <Text style={{position: 'absolute', left: width/4, top: 50}}>Connected User: {participants?.identity ? participants?.identity : '...' }</Text> */}
          {status === "connected" && (
            <View style={styles.remoteGrid}>
              {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                return (
                  <TwilioVideoParticipantView
                  scaleType="fit"
                   style={styles.remoteVideo}
                    key={trackSid}
                    trackIdentifier={trackIdentifier}
                  />
                );
              })}
            </View>
          )}
            <CustomButton buttonStyle={styles.button} indicator={indicator} title={'Open Door'} onPress={()=> doorTrigger()}/>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[styles.optionButton,{backgroundColor: 'red'}]}
              onPress={_onEndButtonPress}
            >
              <Text style={{ fontSize: 12, color: '#FFF' }}>End</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton,{backgroundColor: 'grey'}]}
              onPress={_onMuteButtonPress}
            >
              <Text style={{ fontSize: 12,  color: '#FFF' }}>
                {isAudioEnabled ? "Mute" : "Unmute"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton,{backgroundColor: 'blue'}]}
              onPress={_onFlipButtonPress}
            >
              <Text style={{ fontSize: 12, color: '#FFF' }}>Flip</Text>
            </TouchableOpacity>
            <TwilioVideoLocalView enabled={true} style={styles.localVideo} />
          </View>
        </View>
      )}

      <TwilioVideo
        ref={twilioVideo}
        onRoomDidConnect={_onRoomDidConnect}
        onRoomDidDisconnect={_onRoomDidDisconnect}
        onRoomDidFailToConnect={_onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
        onNetworkQualityLevelsChanged={_onNetworkLevelChanged}
        onDominantSpeakerDidChange={_onDominantSpeakerDidChange}
      />
    </View>
  );
};
