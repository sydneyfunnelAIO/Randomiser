import { Context, MyContext } from '../components/MyContext'
import React, { useContext, useEffect, useState, navigation } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, Animated, Alert, View } from 'react-native'
import { Picker } from "@react-native-community/picker"
import { heightPercentageToDP as hp, widthPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import color from '../../assets/colors';
import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/AntDesign';
import Canvas from "react-native-canvas"
import MyModal from "../components/WheelModal"
import {TouchableOpacity} from "react-native-gesture-handler"
export default function Wheel() {
    const { viewStyle, textStyle, wheelStyle, textBoxStyle, whiteBox, logoStyle, imageStyle, inputStyle, miniButtonStyle, participantStyle, participantTextStyle, deleteStyle, startStyle, startTextStyle } = styles;
    const [List, setList] = useState(["", ""])
    const [Radius, setRadius] = useState(60)
    const [Offset, setOffset] = useState(0)
    const combinedStyle = StyleSheet.flatten([wheelStyle, { transform: [{ rotate: `-${Math.floor(Offset)}deg` }] }])
    const [ParticipantInput, setParticipantInput] = useState("")
    const [RotateValue, setRotateValue] = useState(new Animated.Value(0))
    const [IsCreated, setIsCreated] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const [Winner, setWinner] = useState(0)

    const handleCanva = (canvas) => {
        if (IsCreated == false) {
            if (canvas !== null) {
                canvas.width = 400;
                canvas.height = 400;
                let numOptions = List.length
                let arcSize = (2 * Math.PI) / numOptions
                topPosition(numOptions, arcSize)
                let angle = 0;
                for (let i = 0; i < numOptions; i++) {
                    let text = List[i];
                    renderSector(i + 1, text, angle, arcSize, getColor(i), canvas);
                    angle += arcSize;
                }
                setIsCreated(true)
            }
        }




    }
    const startAnimation = () => {
        RotateValue.setValue(0);
        Animated.timing(RotateValue, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start()
        setTimeout(() => {
            toggleModal()
        }, 900);
    }
    const rotateData = RotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", `-${(Winner * (360/List.length)) + 360  }deg`]
    })
    const topPosition = (num, arc) => {
        let topSpot = null;
        let degreesOff = null;
        if (num % 2 == 0) {
            setOffset(360 / (num * 2) + (num / 2) * 360 / (num * 2))
        }
        else {
            setOffset(360 / (num * 2) + (num) * 360 / (num * 4))
        }
    }
    const renderSector = async (index, text, start, arc, color, canvas) => {
        const ctx = canvas.getContext('2d');
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let radius = Radius;
        let startAngle = start;
        let endAngle = start + arc;
        let angle = index * arc;
        let baseSize = radius * 3.34;
        let textRadius = baseSize - 150;
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle, false)
        ctx.lineWidth = radius * 2;
        ctx.strokeStyle = color;
        ctx.fillStyle = "black"
        ctx.stroke()
        ctx.save();
        ctx.font = "15px Arial"
        ctx.translate(
            baseSize + Math.cos(angle - arc / 2) * textRadius,
            baseSize + Math.sin(angle - arc / 2) * textRadius
        )
        ctx.rotate(angle - arc / 2 + Math.PI / 2)
        ctx.fillText(text, -text.length * 3, -40)

        ctx.restore()

    }
    const getColor = (num) => {
        if (List.length == 2 && List[num] == "" && num == 0) {
            return `rgba(255,16,140,0.75)`
        }
        else if (List.length == 2 && List[num] == "" && num == 1) {
            return `rgba(255,16,250,0.25)`
        }
        let r = 255;
        let g = randomNumber(20, 250,25);
        let b = randomNumber(100, 250,25)
        return `rgba(${r},${g},${b},0.75)`
    }
    const randomNumber = (min, max,x) => {

        return Math.round((Math.random() * (max - min) + min) / x) * x;

    }
    const AddParticipant = (data) => {
        if(ParticipantInput == "" || ParticipantInput.includes(" ")){
            Alert.alert("Participant Can not be Empty","Make sure you filled participant",[{
                text:"Done",
            }])
        }
        else{
            if (List.length <= 2 && (List[0] && List[1]) == "") {
                setList([data])
            }
            else {
                setList([data, ...List])
            }
            setParticipantInput("")
            setIsCreated(false)
        }
        
    }
    const deleteParticipant = (data)=>{
       let newData =  data.filter((data,index)=> index !== 0)
       if(newData.length == 0){
           setList(["",""])
       }
       else{
           setList(newData)

       }
       setIsCreated(false)

    }
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
    const getWinner = ()=>{
        if(List.length<1 || (List.length==2 &&  (List[0] == "" || List[1]== "" )) ){
            Alert.alert("Participant Can not be Empty","Make sure you filled participant",[{
                text:"Done",
            }])
        }
        else{
            let number = randomNumber(0,List.length , 1)
        console.log(number)
        console.log(number * (360/List.length))
        setWinner(number)
        console.log(List[number])
        startAnimation()
        }
    }
    
    return (

        <LinearGradient style={viewStyle} colors={['#ff4f8c', '#fff']}>
            <MyModal toggleModal={toggleModal}  isModalVisible={isModalVisible} data={List[Winner]}  />
            <View style={logoStyle} >
                <Image style={imageStyle} source={require("../../assets/logo.png")} />
            </View>

            <View style={{ flexDirection: "row" }} >
                <View style={{ marginTop: hp(5) }} >

                    <View style={textBoxStyle} >
                        <Text style={textStyle} >Participants</Text>
                        <View style={whiteBox} >
                            <Icon name="doubleright" />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: hp(5.5), marginLeft: wp(10) }} >

                    <View style={{ flexDirection: "row" }} >
                        <TextInput value={ParticipantInput} onChangeText={setParticipantInput} style={inputStyle} />
                        <TouchableOpacity onPress={()=> AddParticipant(ParticipantInput)} style={miniButtonStyle} >
                            <Text>+</Text>
                        </TouchableOpacity>

                    </View>
                    <View>
                        <View style={{ flexDirection: "row" }} >
                            <ScrollView style={participantStyle} >
                                {
                                    List.map((data, index) => {
                                        if(data !== ""){
                                            return (
                                                <View key={index} style={{ justifyContent: "center", alignItems: "center", marginTop: hp(0.5), marginBottom: hp(0.5) }} >
                                                    <Text style={participantTextStyle} >
                                                        {data}
                                                    </Text>
                                                </View>
    
                                            )
                                        }
                                       
                                    })
                                }





                            </ScrollView>
                            <TouchableOpacity onPress={() => {
                                deleteParticipant(List)
                            }} style={deleteStyle} >
                                <Icon name="delete" size={15} />
                            </TouchableOpacity>
                        </View>

                    </View>



                </View>


            </View>
            <TouchableOpacity onPress={() => getWinner()} style={startStyle} >
                <Text style={startTextStyle} >Pick Random</Text>
            </TouchableOpacity>
            <View style={combinedStyle} >
                <Animated.View style={{ transform: [{ rotate: rotateData }] }} >
                    <Canvas ref={handleCanva} />
                </Animated.View>
            </View>

        </LinearGradient>

    )
}
const styles = StyleSheet.create({
    wheelStyle: {
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        marginTop: hp(-10)



    },
    startTextStyle: {
        color: color.white,
        fontFamily: "Roboto",
        fontWeight: "bold",
        fontSize: wp(5)
    },
    startStyle: {
        backgroundColor: color.primary,
        width: wp(50),
        height: hp(5),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        margin: hp(3),
        borderRadius: wp(2),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    logoStyle: {
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 1.5,
        borderTopWidth: 0,
        borderColor: color.yellow,
        borderBottomRightRadius: wp(100),
        borderBottomLeftRadius: wp(100),
        width: wp(100),
        marginTop: wp(-5),
        width: wp(105),
        marginLeft: wp(-2.5)
    },
    imageStyle: {
        resizeMode: "contain",
        width: wp(45),
        paddingBottom: hp(-100),
        marginTop: hp(1),
        marginBottom: hp(-1.2)
    },
    deleteStyle: {
        backgroundColor: color.white,
        width: wp(8),
        height: wp(8),
        marginTop: hp(0.5),
        marginLeft: wp(0.5),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: wp(2),

    },
    participantTextStyle: {
        color: color.text,
        backgroundColor: color.white,
        width: wp(32),
        height: hp(4),
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        paddingTop: hp(0.6),
        borderRadius: wp(1.7)
    },
    participantStyle: {
        backgroundColor: color.secondary,
        width: wp(37),
        marginLeft: wp(-1),
        height: hp(22),
        borderRadius: wp(1.7),
        opacity: 0.9
    },
    miniButtonStyle: {
        backgroundColor: color.white,
        width: wp(8),
        height: wp(8),
        marginTop: hp(1),
        marginLeft: wp(1.5),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: wp(2),

    },
    inputStyle: {
        backgroundColor: color.white,
        width: wp(35),
        height: hp(4),
        borderRadius: wp(2),
        marginTop: hp(1),
        marginBottom: hp(1),
        padding: wp(1)
    },
    viewStyle: {
        height: hp(100),
    },
    whiteBox: {
        width: wp(7),
        height: hp(2.5),
        borderRadius: wp(1),
        alignItems: "flex-end",
        padding: wp(0.8),
        marginLeft: wp(3),



        backgroundColor: color.white,
    },
    textBoxStyle: {
        backgroundColor: color.primary,
        marginTop: hp(1),
        marginLeft: wp(5),
        height: hp(5),
        width: wp(40),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: wp(2),
        flexDirection: "row",
        justifyContent: "space-between",



    },
    textStyle: {
        color: color.bordercolor,
        fontFamily: "Roboto",
        fontWeight: "normal",
        padding: wp(2),
        width: wp(33),

    }
    ,
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
        fontWeight: "bold"
    },

});
