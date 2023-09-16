import { FlatList, StyleSheet, Text,  View, TouchableOpacity } from 'react-native'
import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { STORAGE_KEYS } from '../../../constants/queryKeys';
import { getAllEvents } from '../../../APIServices/App';
import CustomModal from '../../../Components/CustomModal/CustomModal';
import { DeleteIcon } from '../../../assets/images';

const ViewEvents = () => {

  const { data: getAllEventsData, isLoading: getAllEventsDataLoading } = useQuery(
    [STORAGE_KEYS.GET_ALL_EVENTS],
    getAllEvents,
    {
      onSuccess(data) {
        // console.log(data, "On Success Data")
      },
      enabled: true,
    },
  );
  const renderItem = (val, index) => {
    const { item } = val || {}
    const { participants } = item || {};
 // Check if participants is a string containing an array-like format
 const participantsArray = typeof participants === 'string' ? participants.split(',').map(participant => participant.trim()) : participants;

 // Check if participantsArray is an array
 const participantsString = Array.isArray(participantsArray)
   ? `participants: ${participantsArray.join(', ')}`
   : '';
    console.log(participantsString, "participantsString")
    return (
      <TouchableOpacity style={styles.renderRowWrapper} key={index}>
      <Text>Event Name: {item?.name}</Text>
      <View style={styles.actionBtnWrapper}>
          <TouchableOpacity  onPress={() => setisDeleteAccountVisible(true)}>
            {/* <DeleteIcon /> */}
          </TouchableOpacity>
      </View>
      </TouchableOpacity>
    )
  }
  const [isDeleteAccountVisible, setisDeleteAccountVisible] =
    React.useState(false);

  const changeDeleteModalVisible = isLogout => {
    console.log(isLogout, "isLogoutisLogoutisLogout")
    if (isLogout == true) {
      setisDeleteAccountVisible(!isDeleteAccountVisible);
    } else {
      setisDeleteAccountVisible(!isDeleteAccountVisible);
    }
  };
  return (
  <View style={styles.container}>
    {getAllEventsDataLoading ? <Text>Loading</Text> : 
       <FlatList 
       data={getAllEventsData?.data}
       renderItem={renderItem}
     />}
       <CustomModal
        changeDeleteModalVisible={changeDeleteModalVisible}
        setisDeleteAccountVisible={setisDeleteAccountVisible}
        isDeleteAccountVisible={isDeleteAccountVisible}
        title={'sign out'}
        // desc={'signOutAccou ntConformation'}
      >
          <Text>AOOo</Text>
        </CustomModal>
  </View>
  )
}

export default ViewEvents

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  renderRowWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})