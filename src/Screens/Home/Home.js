import { View, Text } from 'react-native'
import React from 'react'
import QRScan from '../QRScan/QRScan'
import CustomButton from '../../Components/CustomButton'
import GlobalStyles from '../../Utils/GlobalStyles'
import Auth0 from 'react-native-auth0';
import { setAsync } from '../../Utils/AsyncStorage'
import AsyncKeys from '../../Utils/AsyncKeys'
import { AUTH0_CLIENTID, AUTH0_DOMAIN } from '../../Utils/Constants'
import IncomingCall from '../VideoCall.js/IncomingCall'
import { GetApi } from '../../Network/Fetch'
import { VIDEO_TOKEN } from '../../Network/URL'
const Home = ({navigation}) => {
  const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: AUTH0_CLIENTID });
 const [indicator, setindicator] = React.useState(false)
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

  const Connect =()=>{
    setindicator(true)
    GetApi(VIDEO_TOKEN)
    .then(async (response) => {
      setindicator(false)
     if(response.status == 200){
      navigation.navigate('VideoCall',{token: response.data.token}) 
     }else{
       alert('Something went wrong!')
     }
    })
  }

  return (
    <View style={[GlobalStyles.container, GlobalStyles.padding_20]}>
      <QRScan navigation={navigation}/>
     {/* <IncomingCall navigation={navigation}/> */}
     {/* <CustomButton title={'Logout'} onPress={()=> Logout()}/> */}
     <CustomButton title={'Connect'} indicator={indicator} onPress={()=> Connect()}/>
    </View>
  )
}

export default Home