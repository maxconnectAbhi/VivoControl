import { View, Text, Platform } from 'react-native'
import React,{useState} from 'react'
import GlobalStyles from '../../Utils/GlobalStyles'
import CustomButton from '../../Components/CustomButton'
import Auth0 from 'react-native-auth0';
import { setAsync } from '../../Utils/AsyncStorage'
import AsyncKeys from '../../Utils/AsyncKeys'
import { AUTH0_CLIENTID, AUTH0_DOMAIN } from '../../Utils/Constants';
import { PostApi, PostApiToken } from '../../Network/Fetch';
import { APP_DEVICES } from '../../Network/URL';
import { getUniqueId, getManufacturer, getModel } from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';

const Login = ({navigation}) => {
  const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: AUTH0_CLIENTID });
   const [indicator, setindicator] = useState(false)
   const onLogin=()=>{
    setindicator(true)
    auth0
    .webAuth
    .authorize({scope: 'openid profile email'})
    .then(async(credentials) => {
      await setAsync(AsyncKeys.ASYNC_USER_TOKEN, credentials.accessToken)
      sendDeviceId()
    }
    )
    .catch(error => {console.log(error)
    setindicator(false)});
    }

    const sendDeviceId = async()=>{
    const token = await messaging().getToken()
      const body = {
        app_device:{
           device_id: getUniqueId(),
           fcm_token: token,
           manufacturer:await getManufacturer(),
           os:Platform.OS,
           model_number: getModel()
        }
      }
      PostApiToken(APP_DEVICES, body)
      .then(async (response) => {
       if(response.status == 200){
        setindicator(false)
        navigation.reset({routes: [{ name: 'Home'}], index:0})
       }else{
         alert('Something went wrong!')
       }
      })
    }


  return (
    <View style={[GlobalStyles.container,GlobalStyles.justifyCenter]}>
      <View style={{flex:0.45,justifyContent: 'space-around', width: '100%', alignItems: 'center'}}>
      <Text style={GlobalStyles.title}>Login</Text>
      {/* <CustomInput placeholder={'Email'}/>
      <CustomInput placeholder={'Password'}/> */}
      <CustomButton title={'Login'} onPress={()=> onLogin()} indicator={indicator}/>
      </View>
    </View>
  )
}

export default Login