import React from 'react'
import { Text, View, TextInput, Button, Alert,StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

const AddEvents = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      eventName: '',
      startDate: '',
      endDate: '',
      participants: '',
    }
  });
  const onSubmit = data => console.log(data);
  return (
    <View>
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="First name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="eventName"
      />
      {errors.eventName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Start Date"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="startDate"
      />
      {errors.startDate && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="End Date"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="endDate"
      />
      {errors.endDate && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Participants"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="participants"
      />
      {errors.participants && <Text>This is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

export default AddEvents

const styles = StyleSheet.create({})