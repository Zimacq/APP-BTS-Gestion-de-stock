import React from 'react';
import { View } from 'react-native';
import LoginScreen from './LoginScreen';
import firebase from './firebaseConfig'; // Importez firebaseConfig.js

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LoginScreen />
    </View>
  );
}
