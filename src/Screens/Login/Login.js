import { View, Text } from 'react-native'
import React,{useState} from 'react'
import GlobalStyles from '../../Utils/GlobalStyles'
import CustomButton from '../../Components/CustomButton'
import Auth0 from 'react-native-auth0';
import { setAsync } from '../../Utils/AsyncStorage'
import AsyncKeys from '../../Utils/AsyncKeys'
import { AUTH0_CLIENTID, AUTH0_DOMAIN } from '../../Utils/Constants';

const Login = ({navigation}) => {
  const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: AUTH0_CLIENTID });
   const [indicator, setindicator] = useState(false)
   const onLogin=()=>{
    setindicator(true)
    auth0
    .webAuth
    .authorize({scope: 'openid profile email'})
    .then(async(credentials) => {
      // Successfully authenticated
      // Store the accessToken
     // console.log('credentials== ', credentials)
      await setAsync(AsyncKeys.ASYNC_USER_TOKEN, credentials.accessToken)
      setindicator(false)
      navigation.reset({routes: [{ name: 'Home'}], index:0})
    }
    )
    .catch(error => {console.log(error)
    setindicator(false)});
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