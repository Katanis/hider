import React, { Component } from 'react';
import { TextInput } from 'react-native';

export default function UselessTextInput() {
  const [value, onChangeText] = React.useState('Nickname');

  return (
    <TextInput
      style={{ height: 40, borderBottomColor: '#D85A3A', borderBottomWidth: 2, color: '#D85A3A' }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
  );
}
