import * as React from 'react';

import {Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Wheel from './src/screens/Wheel';
import Home from './src/screens/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from './src/components/Logo';
import {MyContext} from './src/components/MyContext';
import {NavigationContainer} from '@react-navigation/native';
import Team from "./src/screens/Team"
import color from './assets/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, StackView} from '@react-navigation/stack';
import {navigationRef} from "./src/components/RootNavigation"

const Stack = createStackNavigator();



export default function App() {
  return (
    <MyContext>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Home" >
        <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Wheel" component={Wheel} />
      <Stack.Screen name="Team" component={Team} />
        </Stack.Navigator>
     
        

      </NavigationContainer>
    </MyContext>
  );
}
