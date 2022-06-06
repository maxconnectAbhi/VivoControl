import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import NetInfo from '@react-native-community/netinfo';
import {
  Text, View,
} from 'react-native';
import NetworkStatusContext from './NetworkStatusContext';
import styles from './styles';
import Modal from 'react-native-modal';
import CustomButton from '../../Components/CustomButton';

const TAG = 'NetworkStatusProvider: ';
const NetworkStatusProvider = ({ children }) => {
  const [isNetworkConnected, setConnected] = useState(true);
  const [retrying, setRetrying] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const { isConnected, isInternetReachable } = state;
      console.log(TAG, isConnected, isInternetReachable);
      if (isConnected !== isInternetReachable && isInternetReachable !== null) {
        setConnected(isInternetReachable);
      }
      else {
        setConnected(isConnected);
      }
    });
    if (retrying) setRetrying(false);
    return () => {
      unsubscribe();
    };
  }, [retrying]);

  const mProps = {};

  const handleRetryPress = () => {
    if (!retrying) setRetrying(true);
  };

  return (
    <NetworkStatusContext.Provider value={mProps}>
      <Modal
          isVisible={!isNetworkConnected}
          backdropColor="black"
          backdropOpacity={0.4}
          style={styles.modalStyle}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.text}>Connection Lost!</Text>
            <Text style={styles.msgText}>
            Looks like you have lost connection with WiFi or other internet connection
            </Text>
            <CustomButton title='Try Again' onPress={handleRetryPress} indicator={retrying} />
          </View>
        </Modal>
      {children}
    </NetworkStatusContext.Provider>
  );
};

NetworkStatusProvider.propTypes = {
  children: propTypes.any,
};
export default NetworkStatusProvider;
