import {
    StyleSheet,
} from 'react-native';
import { scale, verticalScale } from './Scale';
import { ColorConstants } from './Constants';

export default globalStyles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: ColorConstants.WHITE
    },
    justifyCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textStyle: {
        fontSize: scale(16),
        lineHeight: 24,
        textAlign: 'center',
    },
    title:{
        fontSize: scale(30),
        fontWeight: 'bold'
    },
    padding_20:{
        paddingVertical: verticalScale(20)
    }

})