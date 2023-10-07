import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomLottieComponent from '../../../Components/CustomLottieComponent/CustomLottieComponent'
import NavigationStrings from '../../../constants/NavigationStrings'
import { clearAllData, getItem, removeItem, setItem } from '../../../Services/storageServices'
import { useAuth } from '../../../Services/AuthContext'
const Home = ({navigation}) => {
  const { setIsAuthenticated } = useAuth();
  const handlePressAddEvent = () => {
    console.log("Add Event");
    navigation.navigate(NavigationStrings.ADD_EVENTS)
  }
  const handlePressViewEvents = () => {
    console.log("handlePress View Event")
    navigation.navigate(NavigationStrings.VIEW_EVENTS)
  }
  let storedData;
  const retrieveData = async () => {
    // Use getItem to retrieve data
    storedData = await getItem('myLogin');
    
    if (storedData !== null) {
      console.log('Retrieved data2:', storedData);
      return storedData;
    } else {
      console.log('No data found for key: myKey');
    }
  };
  retrieveData()
  console.log(retrieveData(), "Appp",storedData)

  const clearAllStores = async() => {
    removeItem("myLogin")
    setIsAuthenticated(false)
  }
  return (
    <View style={styles.root}>
        <TouchableOpacity onPress={() => clearAllStores()} style={styles.logoutBtnWrapper}>
          <Text style={styles.logoutBtnTxt}>Logout</Text>
        </TouchableOpacity>
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
    logoutBtnWrapper:{
      position: 'absolute',
      top: 20,
      right: 20,
      paddingHorizontal: 20,
      backgroundColor: '#000',
      paddingVertical: 10,
      borderRadius: 100
    },
    logoutBtnTxt:{
      color: '#fff'
    }
})