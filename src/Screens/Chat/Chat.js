import React, { Component } from 'react';
import { View, Text, Image, TextInput, Button, Picker } from 'react-native';
import firebase from 'react-native-firebase';

var config = {
  apiKey: 'AIzaSyCLeWLVP6O0TnSfDCbwdmUV2mt-beHKA-0',
  authDomain: 'hider-f92b1.firebaseapp.com',
  databaseURL: 'https://hider-f92b1.firebaseio.com',
  storageBucket: 'bucket.appspot.com',
};
// firebase.initializeApp(config);
firebase.app();

class Chat extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { userId: '', message: '', messages: [] };
    // this.handleClick = this.handleClick.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  componentDidMount() {
    let database = firebase.database();
    var _userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref('/users/' + _userId)
      .once('value')
      .then(function(snapshot) {
        var username =
          (snapshot.val() && snapshot.val().username) || 'Anonymous';
        // ...
      });

    this.setState({ userId: _userId });

    this.getMessages(_userId);
  }

  sendMessage(message) {
    firebase
      .database()
      .ref('messages/' + this.state.userId + '/m' + Date.now())
      .set({
        message: message,
        name: 'testName',
        timestamp: Date.now(),
      });
    console.log(message);
  }

  getMessages(_userId) {
    var readedData = firebase.database().ref('messages/' + _userId);
    readedData.on('value', function(snapshot) {
      // this.setState({ messages: snapshot.val() });
      // this.setState(postElement, snapshot.val());
    });
  }

  render() {
    return (
      <View>
        <Text>{this.state.user}</Text>
        <Text>{JSON.stringify(this.state.messages)}</Text>
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
