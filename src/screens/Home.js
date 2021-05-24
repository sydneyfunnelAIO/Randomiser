import { Context, MyContext } from '../components/MyContext'
import React, { useContext, useEffect, useState , navigation} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Logo from "../components/Logo"
import color from '../../assets/colors';
import LinearGradient from "react-native-linear-gradient"
import { navigationRef } from '../components/RootNavigation';


export default function Home({navigation}) {

  const { viewStyle, squareStyle, buttonStyle, buttonTextStyle } = styles;

  return (

    <LinearGradient style={viewStyle} colors={['#ff4f8c', '#fff']}>
      <View style={squareStyle} >
        <Logo />
        <TouchableOpacity style={buttonStyle} onPress={()=> navigation.push("Team") } >
          <Text style={buttonTextStyle} >
            Team Maker
              </Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle} onPress={()=> navigation.push("Wheel")} >
          <Text style={buttonTextStyle} >
            Pick a Person
              </Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>

  )
}
const styles = StyleSheet.create({
  viewStyle: {

    height: hp(100),
    justifyContent: "center"

  },
  squareStyle: {
    height: hp(40),
    width: wp(90),
    backgroundColor: color.primary,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: wp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,


  },
  buttonStyle: {
    width: wp(35),
    height: hp(5),
    margin: wp(2),
    backgroundColor: color.yellow,
    borderRadius: wp(1.5),
    justifyContent: 'center',
    alignItems: "center"


  },
  buttonTextStyle: {
    color: color.text,
    fontFamily: 'Roboto',
    fontWeight:"bold"
  }
});
