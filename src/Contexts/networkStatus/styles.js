import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../Utils/Scale';

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    height:'40%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    justifyContent: 'space-around',
  },
  text: {
    textAlign: 'center',
    fontSize: scale(22),
    color: '#212b36',
    fontWeight: 'bold'
  },
  msgText: {
    marginHorizontal:scale(20),
    textAlign: 'center',
    fontSize: scale(16),
    color: '#212b36',
  },
  button: {
     width: '80%', 
     marginTop: verticalScale(35)
  },
  modalStyle: {
    justifyContent: 'flex-end',
    margin: 0,
  }
});

export default styles;
