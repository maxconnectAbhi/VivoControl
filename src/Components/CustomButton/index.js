import React from 'react';
import {
   Text,
   TouchableOpacity,
   Image,
   ActivityIndicator
} from 'react-native';
import { ColorConstants } from '../../Utils/Constants';
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
   indicator,
   hollow
}) => {
   return (
      indicator ?
      <TouchableOpacity onPress={onPress} style={hollow ? styles.hollowbuttonStyle : [styles.buttonStyle, buttonStyle]} disabled>
         <ActivityIndicator color={hollow ? ColorConstants.BUTTON_COLOR : '#FFF'} size='large'/>
         </TouchableOpacity>
         :
      <TouchableOpacity onPress={onPress} style={hollow ? [styles.hollowbuttonStyle, buttonStyle] : [styles.buttonStyle, buttonStyle]}>
         {leftImage
            &&
            <Image style={[styles.leftImageStyle, leftImageStyle]}
               resizeMode="contain"
               source={leftImage}>
            </Image>
         }
         <Text style={[styles.textStyle, titleStyle, {color: hollow ? ColorConstants.BUTTON_COLOR  : '#FFF'}]}>
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