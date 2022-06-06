import { View, Text } from 'react-native'
import React from 'react'
import AsyncKeys from '../../Utils/AsyncKeys';
import { getAsync } from '../../Utils/AsyncStorage';
import GlobalStyles from '../../Utils/GlobalStyles';

const Splash = ({navigation}) => {

    React.useEffect(() => {
        setTimeout(() => {
        decideNavigation();
        }, 1000);
      }, []);
    
      async function decideNavigation() {
        const token = await getAsync(AsyncKeys.ASYNC_USER_TOKEN);
        console.log('t= ', token);
        if(token == null){
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