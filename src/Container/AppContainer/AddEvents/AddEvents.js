import React from 'react';
import {Text, View, TextInput, Button, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {createEvent, updateEvent} from '../../../APIServices/App';
import NavigationStrings from '../../../constants/NavigationStrings';
import { useNavigation } from '@react-navigation/native';
import { queryClient } from '../../../constants/common';
import { STORAGE_KEYS } from '../../../constants/queryKeys';

const AddEvents = props => {
  const {route} = props || {};
  const {params} = route || {};
  const {EventData} = params || {};
  console.log(EventData, 'Edit Event Data');

   // Get the navigation object using the useNavigation hook
   const navigation = useNavigation();

  const {mutate: updateEventEventMutation} = useMutation(updateEvent, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([STORAGE_KEYS.GET_ALL_EVENTS])
      navigation.navigate(NavigationStrings.VIEW_EVENTS);
    },
    onError: (data) => {
      console.log(data.message.validationErrors, 'errrrrrrrrrr ');
    },
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: EventData?.name || '',
      startDate: EventData?.startDate || '',
      endDate: EventData?.endDate || '',
      participants: EventData?.participants || ``,
    },
  });
 
  const onSubmit = async data => {
    const { name, startDate, endDate, participants } = data;
    let formdata = new FormData();
    formdata.append('name', name);
    formdata.append('startDate', startDate);
    formdata.append('endDate', endDate);
    formdata.append('participants', participants);
    if(EventData) {
      formdata.append('Edit', 'true');
      formdata.append('userId', EventData?.userId);
      formdata.append('id', EventData?.PK_ID);
      
    } else{
      formdata.append('Create', 'true');
    } 
    formdata.append('token', 1);
    console.log(formdata, 'Final Form Data');
    if (EventData == null || EventData == undefined) {
      createEventMutation(formdata)   
    }
    else{
      updateEventEventMutation(formdata)
    }
}


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
      {errors.startDate && <Text style={styles.errorText}>This is required.</Text>}

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
      {errors.endDate && <Text style={styles.errorText}>This is required.</Text>}

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
      {errors.participants && <Text style={styles.errorText}>This is required.</Text>}
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.btnWrapper}>
        <Text style={styles.btnText}>{EventData ? "Update Event" : "Create Event"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddEvents;

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 25
  },
  inputStyle:{
    borderWidth:1,
    borderColor: "#000",
    marginBottom: 15,
    borderRadius: 100,
    paddingHorizontal: 25
  },
  btnWrapper:{
    backgroundColor: '#ccc',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 100,
  },
  btnText:{
    color: '#000'
  },
  errorText:{
    color: 'red',
    marginBottom: 10,
    marginTop: -10
  }
});
