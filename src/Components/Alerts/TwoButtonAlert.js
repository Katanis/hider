import React, { useState } from 'react';
import { Alert } from 'react-native';
const createTwoButtonAlert = props =>
  Alert.alert(
    props.title,
    'My Alert Msg',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: props.deleteChat() },
    ],
    { cancelable: false },
  );

export default createTwoButtonAlert;
