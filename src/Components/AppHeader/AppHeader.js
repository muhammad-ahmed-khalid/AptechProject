import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AppHeader = (props) => {
    console.log(props, "AOO")
    const { options } = props || {}
    const {title} = options || {}
  return (
    <View>
      <Text>{title} :This is Header</Text>
    </View>
  )
}

export default AppHeader

const styles = StyleSheet.create({})