import React, { Component } from 'react';
import { View, Text, Image, TextInput, Button, Picker } from 'react-native';
import firebase from 'react-native-firebase';

var config = {
  apiKey: 'AIzaSyCLeWLVP6O0TnSfDCbwdmUV2mt-beHKA-0',
  authDomain: 'hider-f92b1.firebaseapp.com',
  databaseURL: 'https://hider-f92b1.firebaseio.com',
  storageBucket: 'bucket.appspot.com',
};
firebase.initializeApp(config);

class Chat extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { user: '', message: '' };
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let database = firebase.database();
    var userId = firebase.auth().currentUser.uid;
    return firebase
      .database()
      .ref('/users/' + userId)
      .once('value')
      .then(function(snapshot) {
        var username =
          (snapshot.val() && snapshot.val().username) || 'Anonymous';
        // ...
      });

    this.setState({ user: userId });
  }

  render() {
    return (
      <View>
        <Text>{this.state.user}</Text>
        <TextInput></TextInput>
      </View>
    );
  }
}

export default Chat;
