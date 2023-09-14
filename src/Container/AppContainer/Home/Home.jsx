import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import CustomLottieComponent from '../../../Components/CustomLottieComponent/CustomLottieComponent'
const Home = () => {
  const handlePressAddEvent = () => {
    console.log("Add Event")
  }
  const handlePressViewEvents = () => {
    console.log("handlePress View Event")
  }
  return (
    <View style={styles.root}>
      <View style={styles.innerContainer}>
           <CustomLottieComponent text='Add Event' isAddEvent={true} handlePress={handlePressAddEvent}/>  
           <CustomLottieComponent text='View Event' handlePress ={handlePressViewEvents} />  
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    root:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerContainer:{
      flexDirection: 'row',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20
    },
    lottieStyle: {height: 300},
})