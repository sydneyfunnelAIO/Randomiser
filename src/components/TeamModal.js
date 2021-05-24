import React, {useState} from 'react';
import {Button, Text,StyleSheet, View, FlatList, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp, widthPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import color from '../../assets/colors';
import LinearGradient from "react-native-linear-gradient";


function MyModal(props) {
  
  const { toggleModal, isModalVisible,data } = props
  const {headerTextView,modalView,headerView,teamStyle,teamChildStyle,teamTextStyle} = styles
  
  const renderItem = ({item,index})=>{
    return(
      <View style={teamStyle} >
        <Text>
          Team {index+1}
        </Text>
       <ScrollView nestedScrollEnabled={true} contentContainerStyle={teamChildStyle} >
         {item.map((data,index)=>{
          return( <Text numberOfLines={1} ellipsizeMode="tail" style={teamTextStyle} key={index} > {index+1}. {data} </Text>)
         })}
       </ScrollView>
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>

<Modal
        isVisible={isModalVisible}
        onBackdropPress={() => toggleModal()}
        backdropOpacity={0.3}
        animationIn="zoomIn"
        animationOut="zoomOut">
       
        <LinearGradient style={modalView} colors={['#ff4f8c', '#fff']}>
        <View style={headerView} > 
            <Text style={headerTextView} >
                TEAMS
            </Text>
        </View>
        <FlatList
        style={{margin:hp(3), paddingBottom:hp(10)}}
        data={data}
        renderItem={renderItem}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyExtractor={(item,index)=> index.toString()}
        >
            
        </FlatList>
        
        </LinearGradient>
        
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  teamTextStyle:{
    fontSize:11
  },

  teamChildStyle:{
    backgroundColor:color.white,
    height:hp(12),
    width:wp(25),
    borderRadius:hp(2),
    alignItems:"center",
    overflow:"hidden",
    padding:hp(0.2),
    flexGrow:1

  },
  teamStyle:{
    
    backgroundColor:color.yellow,
    height:hp(15),
    width:wp(30),
    borderRadius:hp(2),
    marginHorizontal:wp(1),
    marginTop:hp(2),
    alignItems:"center",
    justifyContent:"space-between",
    
  },
modalView:{
    width: wp(80),
    height: hp(62),
    display: 'flex',
    marginHorizontal: wp(5),
    alignSelf: 'center',
    borderBottomLeftRadius:wp(3),
    borderBottomRightRadius:wp(3),
    borderTopLeftRadius:wp(3),
    borderTopRightRadius:wp(3),
    
   borderWidth:1,
   borderColor:color.yellow,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    overflow:"hidden"
    
},
headerView:{
backgroundColor:color.primary,
width:"100%",
alignItems:"center",
height:hp(5),
justifyContent:"center",
borderTopStartRadius:wp(20),
borderTopEndRadius:wp(20),
borderBottomStartRadius:wp(100),
borderBottomEndRadius:wp(100),
borderColor:color.yellow,
borderWidth:1,marginTop:hp(-1),

},
headerTextView:{
color:color.yellow,
fontSize:hp(2.5),
paddingTop:hp(1),
}
})

export default MyModal;