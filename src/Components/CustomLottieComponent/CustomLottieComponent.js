import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import Home from '../../Container/AppContainer/Home/Home';

const CustomLottieComponent =  ({ text = 'No Record Found' }) => {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottieStyle}
        resizeMode="cover"
        autoPlay={true}
        loop={true}
        source={require('../../assets/Lottie/nothingFound.json')}
      />
      <Text style={styles.textStyle}>{text}</Text>
      
    </View>
  )
}

export default React.memo(CustomLottieComponent)
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    textStyle: {
      marginBottom: 10,
    //   ...Fonts.SemiBold(),
    },
    lottieStyle: { height:300 },
  });
  