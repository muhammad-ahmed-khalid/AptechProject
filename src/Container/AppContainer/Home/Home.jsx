import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomLottieComponent from '../../../Components/CustomLottieComponent/CustomLottieComponent'

const Home = () => {
  return (
    <View style={styles.root}>
      <CustomLottieComponent />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    root:{
        flex: 1,
    }
})