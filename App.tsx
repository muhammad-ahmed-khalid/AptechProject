/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Home from './src/Container/AppContainer/Home/Home';
import Routes from './src/Navigations/Routes';

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Toast />
      <Routes />
    </View>
  );
}

const styles = StyleSheet.create({
container:{
  flex: 1,
}
});

export default App;
