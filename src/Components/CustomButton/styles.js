import {
    StyleSheet,
} from 'react-native';
import { ColorConstants } from '../../Utils/Constants';
import { scale, verticalScale } from '../../Utils/Scale';

export default styles = StyleSheet.create({
    buttonStyle: {
        flexDirection: "row",
        height: verticalScale(43),
        width: "90%",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorConstants.BLUE,
        alignSelf: 'center',
    },
    textStyle: {
        fontSize: scale(16),
        lineHeight: 24,
        color: 'white',
        textAlign: 'center',
    },
    leftImageStyle: {
        height: scale(17),
        width: scale(17),
        marginEnd: scale(5)
    },
    rightImageStyle: {
        height: scale(17),
        width: scale(17),
        marginHorizontal: scale(5)
    },

})