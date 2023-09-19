import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {STORAGE_KEYS} from '../../../constants/queryKeys';
import {getAllEvents} from '../../../APIServices/App';
import CustomModal from '../../../Components/CustomModal/CustomModal';
import {DeleteIcon} from '../../../assets/images';
import {innerContainer, triggerStyles} from '../../../constants/common';

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import NavigationStrings from '../../../constants/NavigationStrings';

const ViewEvents = ({navigation}) => {
  const {data: getAllEventsData, isLoading: getAllEventsDataLoading} = useQuery(
    [STORAGE_KEYS.GET_ALL_EVENTS],
    getAllEvents,
    {
      onSuccess(data) {
        // console.log(data, "On Success Data")
      },
      enabled: true,
    },
  );

  const [modalData, setModalData] = React.useState({});
  const handlePressModal = item => {
    setisDeleteAccountVisible(true);
    setModalData(item);
  };

  const handlePressEdit = data => {
    navigation.navigate(NavigationStrings.EVENT_CRUD, {EventData: data});
  };
  const handlePressDelete = ID => {
    console.log(ID, 'DELTE');
  };

  const GetEventData = () => {
    return (
      <View style={styles.modalChildWrapper}>
        <Text style={styles.sameText}>Event: {modalData?.name}</Text>
        <Text style={styles.sameText}>Start Date: {modalData?.startDate}</Text>
        <Text style={styles.sameText}>End Date:{modalData?.endDate}</Text>
        <Text style={styles.sameText}>
          Participants :{modalData?.participants}
        </Text>
      </View>
    );
  };
  const renderItem = (val, index) => {
    const {item} = val || {};
    const {participants} = item || {};
    // Check if participants is a string containing an array-like format
    const participantsArray =
      typeof participants === 'string'
        ? participants.split(',').map(participant => participant.trim())
        : participants;

    // Check if participantsArray is an array
    const participantsString = Array.isArray(participantsArray)
      ? `participants: ${participantsArray.join(', ')}`
      : '';
    return (
      <TouchableOpacity style={styles.renderRowWrapper} key={index}>
        <Text style={styles.eventName}>Event Name: {item?.name}</Text>
        <View style={styles.actionBtnWrapper}>
          <TouchableOpacity onPress={() => handlePressModal(item)}>
            {/* <DeleteIcon /> */}
            <Text>View</Text>
          </TouchableOpacity>
          <View style={styles.cheronWrapper}>
            <Menu>
              <MenuTrigger customStyles={triggerStyles}>
                {/* <PopMenuIcon /> */}
                <Text>Click</Text>
              </MenuTrigger>
              <MenuOptions customStyles={innerContainer}>
                <MenuOption onSelect={() => handlePressEdit(item)}>
                  <View style={styles.menuInnerWrapper}>
                    <View style={styles.menuIconInnerWrapper}>
                      {/* <EditIcon /> */}
                      <Text>Edit</Text>
                    </View>
                    <Text>Edit</Text>
                    {/* <H6 style={styles.menuFont} text={'Edit'} /> */}
                  </View>
                </MenuOption>
                <MenuOption>
                  <View style={styles.menuSeperator} />
                </MenuOption>
                <MenuOption onSelect={() => handlePressDelete(item?.PK_ID)}>
                  <View style={styles.menuInnerWrapper}>
                    <View style={styles.menuIconInnerWrapper}>
                      {/* <DeleteIcon /> */}
                      <Text>Dele</Text>
                    </View>
                    <Text>DELTED</Text>
                    {/* <H6 style={styles.menuFont} text={'Remove'} /> */}
                  </View>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const [isDeleteAccountVisible, setisDeleteAccountVisible] =
    React.useState(false);

  const changeDeleteModalVisible = isLogout => {
    console.log(isLogout, 'isLogoutisLogoutisLogout');
    if (isLogout == true) {
      setisDeleteAccountVisible(!isDeleteAccountVisible);
    } else {
      setisDeleteAccountVisible(!isDeleteAccountVisible);
    }
  };

  return (
    <View style={styles.container}>
      {getAllEventsDataLoading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList data={getAllEventsData?.data} renderItem={renderItem} />
      )}
      <CustomModal
        changeDeleteModalVisible={changeDeleteModalVisible}
        setisDeleteAccountVisible={setisDeleteAccountVisible}
        isDeleteAccountVisible={isDeleteAccountVisible}
        title={modalData?.name}>
        <GetEventData />
      </CustomModal>
    </View>
  );
};

export default ViewEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  renderRowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
  },
  eventName: {
    fontSize: 15,
    color: '#000',
  },
  modalChildWrapper: {
    // backgroundColor: 'green',
  },
  sameText: {
    marginBottom: 10,
    fontSize: 15,
    color: '#000',
  },
});
