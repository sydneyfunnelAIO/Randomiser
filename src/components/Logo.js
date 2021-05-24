import { Image, Text, View, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react'
import {heightPercentageToDP as hp, widthPercentageToDP, widthPercentageToDP as wp} from 'react-native-responsive-screen';
export default function Logo() {
    const {image} = styles;
    return (
       <View style={{flexDirection:"row", justifyContent:"center" }} >
          
           <Image style={image} source={require("../../assets/logo.png")} />
       </View>
    )
}

const styles = StyleSheet.create({
    image:{
        resizeMode:"contain",
        width:wp(55),
        padding :hp(10)

        
    }
})