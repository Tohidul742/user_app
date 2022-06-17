import React, { useEffect } from "react";
import { Text,Button,StyleSheet } from "react-native"
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client'
const socket = io.connect('http://122.163.121.176:3060')
let myVar;
const Home = () => {

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });
    //backgroung message
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(remoteMessage)
    })
    //direct_message
    messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  }, [])
  useEffect(() => {
    socket.emit('send_socket_id')
  }, [])
  socket.on('get_socket_id', async (data) => {
    console.log(data)
    await AsyncStorage.setItem('@socket_key', data)
    //sessionStorage.setItem('socket_id', data)
  })
  async function myFunction() {
    let socket_id =await AsyncStorage.getItem('@socket_key')
    myVar = setInterval(() => {
      socket.emit('send_location', { "data": 'I love code', "socket_id": socket_id })
    }, 3000)
  }

  socket.on('recive_location', (data) => {
    console.log('log data', data)
  })

  return (
    <>

      <Text>home page</Text>
      <Button style={style_sheet.button}
        onPress={()=>console.log('')}
        title="send location"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
       <Button style={style_sheet.button}
        onPress={()=>{myFunction()}}
        title="send location"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button style={style_sheet.button}
        onPress={()=>{clearTimeout(myVar)}}
        title="stop"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </>
  )
}
export default Home

const style_sheet= StyleSheet.create({
 button: {
    marginTop: 60,
    paddingHorizontal: 24,
  },
})