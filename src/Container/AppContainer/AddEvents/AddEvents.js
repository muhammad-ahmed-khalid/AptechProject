import React from 'react';
import {Text, View, TextInput, Button, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {createEvent} from '../../../APIServices/App';

const AddEvents = props => {
  const {route} = props || {};
  const {params} = route || {};
  const {EventData} = params || {};
  console.log(EventData, 'Edit Event Data');

  const {mutate: createEventMutation} = useMutation(createEvent, {
    onSuccess: (data: any) => {
      console.log(data, 'EVENT CREATED');
    },
    onError: (data: any) => {
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
    console.log(data, 'DATA CONSOLE');
    const {name, startDate, endDate, participants} = data;
    let formdata = new FormData();
    formdata.append('name', name);
    formdata.append('startDate', startDate);
    formdata.append('endDate', endDate);
    formdata.append('participants', participants);
    formdata.append('Create', 'true');
    console.log(formdata, 'Final Form Data');

    // createEventMutation(formdata)
    if (EventData == null || EventData == undefined) {
      try {
        const response = await fetch(
          'https://ahmed-khalid.com/controllers/event',
          {
            method: 'POST',
            body: formdata,
            headers: {
              Authorization: 'Bearer sk-asd',
            },
          },
        );
        const responseBody = await response.text(); // Read the response body once

        console.log('Response:', responseBody);

        if (response.ok) {
          const data = await response.json();
          setResponseMessage(data.message);
        } else {
          throw new Error('Request failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
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
