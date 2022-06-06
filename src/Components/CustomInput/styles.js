import {
    StyleSheet,
} from 'react-native';
import { ColorConstants } from '../../Utils/Constants';
import { scale, verticalScale } from '../../Utils/Scale';

export default styles = StyleSheet.create({
    outerView: {
        flexDirection: "row",
        backgroundColor: ColorConstants.WHITE,
        height: verticalScale(48),
      //  marginTop: verticalScale(20),
        width: "90%",
        fontWeight: '400',
        borderRadius: 10,
        borderColor: ColorConstants.gray,
        borderWidth:1,
        // elevation: 5,
        // shadowColor: '#000000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowRadius: 10,
        // shadowOpacity: 0.1,
        paddingHorizontal: scale(15),
        alignSelf: 'center',
        // shadowOffset: {
        //     height: 1,
        //     width: 1
        // },
    },
    inputView: {
        width: '100%',
        fontWeight: "400",
        height: '100%',
        textAlignVertical: 'center',
        color: ColorConstants.BLACK,
    },
    rightImageViewStyle: {
        width: '10%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    rightImageStyle: {
        height: scale(20),
        width: scale(20),
    },
})