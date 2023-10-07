import React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {createEvent, updateEvent} from '../../../APIServices/App';
import NavigationStrings from '../../../constants/NavigationStrings';
import {useNavigation} from '@react-navigation/native';
import {queryClient} from '../../../constants/common';
import {STORAGE_KEYS} from '../../../constants/queryKeys';
import SimpleModal from '../../../Components/SimpleModal/SimpleModal';

const AddEvents = props => {
  const {route} = props || {};
  const {params} = route || {};
  const {EventData} = params || {};
  console.log(EventData, 'Edit Event Data');

  // Get the navigation object using the useNavigation hook
  const navigation = useNavigation();


  const getAllRelations = [
    {
      id: 0,
      name: 'Spouse',
    },
    {
      id: 1,
      name: 'Daughter/Son',
    },
    {
      id: 2,
      name: 'Brother/Sister',
    },
    {
      id: 3,
      name: 'Relative',
    },
    {
      id: 4,
      name: 'Friends',
    },
    {
      id: 5,
      name: 'Others',
    },
  ];
  const [selectedLanguageValue, setSelectedLanguageValue] = React.useState({
    id: 0,
    name:  'Spouse',
  });
  const [isLanguageModalVisible, setisLanguageModalVisible] =
    React.useState(false);
  const changeLanguageModalVisible = (bool: boolean) => {
    setisLanguageModalVisible(bool);
  };
  const handleCallbackValue = (data: any) => {
    setValue('parti', data.name);
    setSelectedLanguageValue(data);
  };

  const {mutate: updateEventEventMutation} = useMutation(updateEvent, {
    onSuccess: data => {
      queryClient.invalidateQueries([STORAGE_KEYS.GET_ALL_EVENTS]);
      navigation.navigate(NavigationStrings.VIEW_EVENTS);
    },
    onError: data => {
      console.log(data.message.validationErrors, 'errrrrrrrrrr ');
    },
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      name: EventData?.name || '',
      startDate: EventData?.startDate || '',
      endDate: EventData?.endDate || '',
      participants: EventData?.participants || ``,
      parti: selectedLanguageValue?.name || '',
    },
  });

  const onSubmit = async data => {
    const {name, startDate, endDate, participants,parti} = data;
    console.log(data, "datadatadata")
    let formdata = new FormData();
    formdata.append('name', name);
    formdata.append('startDate', startDate);
    formdata.append('endDate', endDate);
    formdata.append('participants', participants);
    formdata.append('parti', parti);
    if (EventData) {
      formdata.append('Edit', 'true');
      formdata.append('userId', EventData?.userId);
      formdata.append('id', EventData?.PK_ID);
    } else {
      formdata.append('Create', 'true');
    }
    formdata.append('token', 1);
    console.log(formdata, 'Final Form Data');
    if (EventData == null || EventData == undefined) {
      // createEventMutation(formdata);
    } else {
      // updateEventEventMutation(formdata);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.inputStyle}
            placeholder="First name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      {errors.name && <Text style={styles.errorText}>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.inputStyle}
            placeholder="Start Date"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="startDate"
      />
      {errors.startDate && (
        <Text style={styles.errorText}>This is required.</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.inputStyle}
            placeholder="End Date"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="endDate"
      />
      {errors.endDate && (
        <Text style={styles.errorText}>This is required.</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.inputStyle}
            placeholder="Participants"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="participants"
      />
        {errors.participants && (
        <Text style={styles.errorText}>This is required.</Text>
      )}

     
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TouchableOpacity onPress={() => changeLanguageModalVisible(true)}>
            <TextInput
              style={styles.inputStyle}
              placeholder="Participants Modal"
              onBlur={onBlur}
              onChangeText={onChange}
              value={selectedLanguageValue?.name}
              editable={false}
              pointerEvents="none"
              isDisabled={true}
              
            />
            
        </TouchableOpacity>
          )}
          name="parti"
        />
      {errors.parti && (
        <Text style={styles.errorText}>This is required.</Text>
      )}
   

    
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styles.btnWrapper}>
        <Text style={styles.btnText}>
          {EventData ? 'Update Event' : 'Create Event'}
        </Text>
      </TouchableOpacity>
      {/* modal for other  */}
      <SimpleModal
        changeModalVisible={changeLanguageModalVisible}
        setisLanguageModalVisible={setisLanguageModalVisible}
        isLanguageModalVisible={isLanguageModalVisible}
        data={getAllRelations}
        selectedLangValue={selectedLanguageValue}
        cbValue={handleCallbackValue}
        title={'Participants'}
      />
    </View>
  );
};

export default AddEvents;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 15,
    borderRadius: 100,
    paddingHorizontal: 25,
    color: "#000"
  },
  btnWrapper: {
    backgroundColor: '#ccc',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 100,
  },
  btnText: {
    color: '#000',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginTop: -10,
  },
});
