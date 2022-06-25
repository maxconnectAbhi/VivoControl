import { View, Text, Platform, TextInput, } from 'react-native'
import React, {useState, useEffect} from 'react'
import QRScan from '../QRScan/QRScan'
import CustomButton from '../../Components/CustomButton'
import GlobalStyles from '../../Utils/GlobalStyles'
import Auth0 from 'react-native-auth0';
import { setAsync } from '../../Utils/AsyncStorage'
import AsyncKeys from '../../Utils/AsyncKeys'
import { AUTH0_CLIENTID, AUTH0_DOMAIN } from '../../Utils/Constants'
import PushNotification from "react-native-push-notification";
import RNVoipCall, { RNVoipPushKit } from 'react-native-voip-call';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidCategory, AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import { width } from '../../Utils/Scale'

const IsIos = Platform.OS === 'ios';

// let options = {
//   appName:'RNVoip App', // Required
//   imageName:  'logo',  //string (optional) in ios Resource Folder
//   ringtoneSound : '', //string (optional) If provided, it will be played when incoming calls received
//   includesCallsInRecents: false, // boolean (optional) If provided, calls will be shown in the recent calls 
//   supportsVideo : true //boolean (optional) If provided, whether or not the application supports video calling (Default: true)
// }

// Initlize Call Kit IOS is Required
// RNVoipCall.initializeCall(options).then(()=>{
//  //Success Call Back
// }).catch(e=>console.log(e));


const Home = ({navigation}) => {
const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: AUTH0_CLIENTID });
const [indicator, setindicator] = React.useState(false)
const [scan, setScan] = React.useState(false)
const [callStatus ,setCallStatus] = useState('no call initlized');
const [token, setToken] = useState('');

  
 useEffect(()=>{  
  callKit();
  rnVoipCallListners();
},[])


// Bootstrap sequence function
async function bootstrap() {
  const initialNotification = await notifee.getInitialNotification();
console.log("Notification caused application to open", initialNotification);
  if (initialNotification) {
    console.log('Notification caused application to open', initialNotification.notification);
    console.log('Press action used to open the app', initialNotification.pressAction);
  }
}

// useEffect(() => {
//   bootstrap()
//     .then(() => setLoading(false))
//     .catch(console.error);
// }, []);



const rnVoipCallListners = async () => {
  RNVoipCall.onCallAnswer(data => {
   setCallStatus('call Answed')
    console.log(data);
  });
  
  RNVoipCall.onEndCall(data=> {
   setCallStatus('call Ended');
   console.log("call endede",data);
  })
} 


useEffect(() => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage.data));
    navigation.navigate('CallUI',{data: remoteMessage.data})
  });

  return () => {
    unsubscribe
  }
}, [])






  // notifee.registerForegroundService(() => {
  //   return new Promise(() => {
  //     // Example task subscriber
  //     // onTaskUpdate(async task => {
  //     //   if (task.complete) {
  //     //       await notifee.stopForegroundService()
  //     //   }
  //     // });
  //   });
  // });
  

  const callKit = async() => { 

    PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    // onRegister: function (token) {
    //   console.log("TOKEN:", token);
    // },
  
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification.data);
      navigation.navigate('CallUI',{data: notification.data})
      // process the notification
  
      // (required) Called when a remote is received or opened, or local notification is opened
     // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
  
    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
  
      // process the action
    },
  
    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
  
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  
    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
  
    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });

  const token = await messaging().getToken()
  setToken(token)
      messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
       navigation.navigate('CallUI',{data: remoteMessage.data})
      const channelId = await notifee.createChannel({
        id: 'call',
        name: 'call',
      });

        let data;
        if(remoteMessage.data){
          data = remoteMessage.notification;
        }
       if(data){
          // let callOptions = {
          //    callerId:data.uuid, // Important uuid must in this format
          //    ios:{
          //     phoneNumber:'12344', // Caller Mobile Number
          //     name: data.name, // caller Name
          //     hasVideo:true
          //    },
          //    android:{
          //     ringtuneSound: true, // defualt true
          //     ringtune: 'ringtune', // add file inside Project_folder/android/app/res/raw --Formats--> mp3,wav
          //     duration: 30000, // defualt 30000
          //     vibration: true, // defualt is true
          //     channel_name: 'call', // 
          //     notificationId: 1123,
          //     notificationTitle: 'Incomming Call',
          //     notificationBody: data.name + ' is Calling...',
          //     answerActionTitle: 'Answer',
          //     declineActionTitle: 'Decline',
          //    }
          //  }
          //  RNVoipCall.displayIncomingCall(callOptions).then((data)=>{
          //   console.log('displayIncomingCall= ', data)
          // }).catch(e=>console.log('error= ',e))


           // Display a notification
    // await notifee.displayNotification({
    //   title: data.title,
    //   body: data.body,
    //   android: {
    //    // autoCancel: false,
    //     channelId,
    //     category: AndroidCategory.CALL,
    //     importance: AndroidImportance.HIGH,
    //     visibility: AndroidVisibility.PUBLIC,
    //   //   fullScreenAction: {
    //   //     id: 'default',
    //   //     mainComponent: 'app',
    //   //     launchActivity: 'default'
    //   //   },
    //   //  // asForegroundService: true,
    //   //   pressAction: {
    //   //     id: 'press',
    //   //     launchActivity: 'default',
    //   //     mainComponent: 'app',
    //   //   },
    //     actions: [
    //       {
    //         title: 'Decline',
    //         icon: 'https://my-cdn.com/icons/open-chat.png',
    //         pressAction: {
    //           id: 'decline',
    //           launchActivity: 'default',
    //         },
    //       },
    //       {
    //         title: 'Accept',
    //         icon: 'https://my-cdn.com/icons/open-chat.png',
    //         pressAction: {
    //           id: 'accept',
    //           launchActivity: 'default',
    //         },
    //       },
    //     ],
    //   //  smallIcon: 'ic_notification',
		// 	vibrationPattern: [300,500],
    //   },
    // });
       }
    });
}


const displayIncommingCall = () => {
  let callOptions = {
    callerId:'825f4094-a674-4765-96a7-1ac512c02a71', // Important uuid must in this format
     ios:{
      phoneNumber:'12344', // Caller Mobile Number
      name:'Ajith', // caller Name
      hasVideo:true
     },
     android:{
      ringtuneSound: true, // defualt true
      ringtune: 'ringtune', // add file inside Project_folder/android/app/res/raw
      duration: 20000, // defualt 30000
      vibration: true, // defualt is true
      channel_name: 'call1asd', // 
      notificationId: 1121,
      notificationTitle: 'Incomming Call',
      notificationBody: 'Some One is Calling...',
      answerActionTitle: 'Answer',
      declineActionTitle: 'Decline',
  
      missedCallTitle: 'Ajith A B',
      missedCallBody: 'You have a Missed Call From Ajith A B'
     }
   }

   RNVoipCall.displayIncomingCall(callOptions).then((data)=>{
     console.log(data)
   }).catch(e=>console.log(e))
  
  
}


const showMissedCall = () => {
  RNVoipCall.showMissedCallNotification("title","body","user-id");
}

const stopCallNotification = () => {
  RNVoipCall.endAllCalls();
}

const playRingtune = () => {
  if(!IsIos){
    let options = { 
      fileName: 'filename', // file inside android/app/src/main/res/raw 
      loop:true // looping the Ringtune
    }
    RNVoipCall.playRingtune(options.fileName, options.loop);   
  }
}

const stopRingtune = () => {
  if(!IsIos){
    RNVoipCall.stopRingtune();
  }
}


 const Logout=()=>{
    auth0.webAuth
    .clearSession({})
    .then(async(success) => {
      await setAsync(AsyncKeys.ASYNC_USER_TOKEN, null)
        alert('Logged out!')
        navigation.reset({routes: [{ name: 'Login'}], index:0})
    })
    .catch(error => {
        console.log('Log out cancelled');
    });
  }

  // if (loading) {
  //   return null;
  // }

  return (
    <View style={[GlobalStyles.container, GlobalStyles.padding_20, GlobalStyles.alignCenter]}>
        
      {scan ?
      <QRScan navigation={navigation}/>
      :
      <CustomButton title={'Scan QR Code'} onPress={()=> setScan(true)}/>
      }
     {/* <CustomButton title={'Show Call'} onPress={()=> navigation.navigate('CallUI')//displayIncommingCall()
    }/> */}
     {/* <Button onPress={()=>showMissedCall()} title="Show Missed Call" />
        <Button title="end Call " onPress={() => stopCallNotification()} />
        
        <Button title="Show MissedCall" onPress={() => showMissedCall()} />
        <Button title="Play Ringtune (Android only)" onPress={() => playRingtune()} />
        <Button title="stop Ringtune (Android only)" onPress={() => stopRingtune()} /> */}
     {/* <CustomButton title={'Video Call'} indicator={indicator} onPress={()=> Connect()}/> */}
     <View>
     <Text>Copy/Paste this token to postman for Notification</Text>
     <TextInput value={token} style={{width: width-50, borderColor: 'grey', borderWidth: 1}} multiline/>
     </View>
     <CustomButton hollow title={'Logout'} buttonStyle={{marginTop: 20}} onPress={()=> Logout()}/>

    </View>
  )
}

export default Home