import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Platform } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
import messaging from '@react-native-firebase/messaging';
import Route from './routes/Route'; 
const App = () => {
  useEffect(() => {
    requestUserPermission();
    
  }, [])
  // request permission
  async function requestUserPermission() {
    if (Platform.OS === 'android') {
      const authStatus = await messaging().requestPermission();
      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken();
      }
    }
  }
  //token genewrate function
  const getFcmToken = async () => {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        console.log('new token', fcmtoken);
      }
    } catch (err) {
      console.log("getFCMToker TryCatch in App.js", err);
    }
  }

  return (
    <>
    <Route />
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
