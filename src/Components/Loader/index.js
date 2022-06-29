import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ColorConstants } from '../../Utils/Constants'

const Loader = () => {
  return (
    <View style={styles.loader}>
     <ActivityIndicator size={'large'} color={ColorConstants.HEADER_COLOR}/>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    loader:{
        flex:1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    }
})