import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import { GetApi } from '../../Network/Fetch'
import { UNIT_DATA } from '../../Network/URL'
import { ColorConstants } from '../../Utils/Constants'
import { scale, verticalScale } from '../../Utils/Scale'

const Profile = ({data}) => {

  return (
    <View style={styles.container}>
         <Text style={styles.title}>Vivo Control</Text>
        <View style={styles.greyBg}>
            <View style={{width: '65%'}}>
        <Text style={styles.header}>Welcome, {data?.display_name}</Text>
        <Text>Unit {data?.unit_number}</Text>
        </View>
        </View>
        <View style={styles.avatar}/>
        <View style={styles.bottomContainer}>
        <Text>{data?.address_line1} {data?.building_name}</Text>
        <Text>{data?.address_line2}</Text>
        </View>

      
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container:{
      width: '100%'
    },
    title:{
        fontSize: scale(25),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: verticalScale(10)
    },
    greyBg:{
        backgroundColor: ColorConstants.GRAY1,
        paddingBottom: '3%',
        paddingTop: '14%',
        padding: '8%'
    },
    header:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    avatar:{
        width: scale(100),
        height: scale(100),
        borderRadius: scale(50),
        backgroundColor: ColorConstants.GRAY,
        position: 'absolute',
        right: '8%',
        bottom: 0
    },
    bottomContainer:{
        paddingTop: '3%',
        paddingLeft: '8%'
    }
})