import React from 'react';
import {
   Text,
   TouchableOpacity,
   Image,
   ActivityIndicator
} from 'react-native';
import styles from './styles';

export default CustomButton = ({
   title,
   onPress = () => { },
   buttonStyle,
   titleStyle,
   leftImage,
   rightImage,
   leftImageStyle,
   rightImageStyle,
   indicator
}) => {
   return (
      indicator ?
      <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, buttonStyle]} disabled>
         <ActivityIndicator color={'#FFF'} size='large'/>
         </TouchableOpacity>
         :
      <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, buttonStyle]}>
         {leftImage
            &&
            <Image style={[styles.leftImageStyle, leftImageStyle]}
               resizeMode="contain"
               source={leftImage}>
            </Image>
         }
         <Text style={[styles.textStyle, titleStyle]}>
            {title}
         </Text>
         {rightImage
            &&
            <Image style={[styles.rightImageStyle, rightImageStyle]}
               resizeMode="contain"
               source={rightImage}>
            </Image>
         }
      </TouchableOpacity>

   )
};