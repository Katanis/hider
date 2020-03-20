import React, { Component } from 'react';
import { View, Text, Image, TextInput, Button, Picker } from 'react-native';
import firebase from 'react-native-firebase';
import ViewPager from '../../Components/ViewPager/ViewPager';

class SwipeScreen extends Component {
  addNewMatcgit h(_matchId) {
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid + '/matches/' + _matchId)
      .set({ matched: true });
    console.log('Added new match');
  }

  render() {
    return (
      <ViewPager
        addNewMatch={this.addNewMatch}
        navigation={this.props.navigation}
      />
    );
  }
}

export default SwipeScreen;
