import React from 'react';
import {
   TextInput,
   View,
   TouchableOpacity,
   Image
} from 'react-native';
import styles from './styles';

export default CustomInput = ({
   placeholder,
   value,
   placeholderTextColor = '#7D7D7D',
   onChangeText,
   secureTextEntry = false,
   rightImage,
   outerViewStyle,
   inputViewStyle,
   rightImageViewStyle,
   rightImageStyle,
   rightImageOnPress = () => { },
   editable = true,
   keyboardType,
   maxLength,
}) => {
   return (
      <View style={[styles.outerView, outerViewStyle]}>
         <TextInput style={[styles.inputView, inputViewStyle, { width: rightImage ? '90%' : '100%' }]}
            onChangeText={onChangeText}
            value={value}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={placeholderTextColor}
            placeholder={placeholder}
            editable={editable}
            keyboardType={keyboardType && keyboardType}
            maxLength={maxLength && maxLength}
            autoCapitalize={'none'}
            autoCorrect={false}
         >
         </TextInput>
         {rightImage
            &&
            <TouchableOpacity style={[styles.rightImageViewStyle, rightImageViewStyle]} onPress={rightImageOnPress}>
               <Image style={[styles.rightImageStyle, rightImageStyle]}
                  resizeMode="contain"
                  source={rightImage}>
               </Image>
            </TouchableOpacity>
         }
      </View>

   )
};