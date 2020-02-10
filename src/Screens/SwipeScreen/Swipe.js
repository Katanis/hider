import React, {Component} from 'react';
import {View, Text, Image, TextInput, Button, Picker} from 'react-native';

class SwipeScreen extends Component {
  render() {
    return (
      <View>
        <Image
          source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
          style={{width: '100%', height: '80%'}}
        />
      </View>
    );
  }
}

export default SwipeScreen;
