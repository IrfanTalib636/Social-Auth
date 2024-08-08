import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { StackActions, useNavigation } from '@react-navigation/native'

const Splash = () => {
    const navigation=useNavigation();
    useEffect(()=>{
        setTimeout(()=>{
            navigation.dispatch(StackActions.replace("Login"))
        },2000)
    },[])
  return (
    <View style={{flex:1,backgroundColor:"#fff",justifyContent:"center",alignItems:"center"}}>
      <Text>Splash</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})