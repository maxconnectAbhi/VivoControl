import { View, Text } from 'react-native'
import React from 'react'
import AsyncKeys from '../../Utils/AsyncKeys';
import { getAsync } from '../../Utils/AsyncStorage';
import GlobalStyles from '../../Utils/GlobalStyles';

const Splash = ({navigation}) => {

    React.useEffect(() => {
        decideNavigation();
      }, []);
    
      async function decideNavigation() {
        const access_token = await getAsync(AsyncKeys.USER_LOGIN);
        console.log('access_token= ', access_token);
        //const access_token = JSON.stringify(token)
        if(access_token === null){
          navigation.reset({routes: [{ name: 'Login'}], index:0})
        }else{
          navigation.reset({routes: [{ name: 'Home'}], index:0});

        }
      }

  return (
    <View style={[GlobalStyles.container,GlobalStyles.justifyCenter]}>
      <Text style={GlobalStyles.title}>Vivo Control</Text>
    </View>
  )
}

export default Splash