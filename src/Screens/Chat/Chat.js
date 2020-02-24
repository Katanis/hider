import React, { Component } from 'react';
import { View, Text, Image, TextInput, Button, Picker } from 'react-native';
import firebase from 'react-native-firebase';

import { GiftedChat } from 'react-native-gifted-chat';

// firebase.initializeApp(config);
firebase.app();

class Chat extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { userId: '', message: '', messages: [], chats: [] };
    // this.handleClick = this.handleClick.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getChats = this.getChats.bind(this);
  }

  componentDidMount() {
    var _userId = firebase.auth().currentUser.uid;

    this.setState({ userId: _userId });

    this.getChats(_userId);
  }

  sendMessage = message => {
    firebase
      .database()
      .ref('messages/' + this.state.userId + '/m' + Date.now())
      .set({
        message: message,
        name: 'testName',
        timestamp: Date.now(),
      });
    console.log(message);
  };

  getChats = _userId => {
    var readedData = firebase.database().ref('chats/');
    readedData.on('value', snapshot => {
      this.setState({ chats: snapshot.val() });
    });
  };

  render() {
    return (
      <View>
        <Text>{this.state.user}</Text>
        <Text>{JSON.stringify(this.state.chats)}</Text>
        <TextInput onChangeText={text => this.setState({ message: text })} />
        <Button
          title="Send"
          onPress={() => this.sendMessage(this.state.message)}
        />
      </View>
    );
  }
}

export default Chat;
