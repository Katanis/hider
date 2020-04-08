import React, { Component } from 'react';
import { View, Text, Image, TextInput, Button, Picker } from 'react-native';
import firebase from 'react-native-firebase';
import ViewPager from '../../Components/ViewPager/ViewPager';

class SwipeScreen extends Component {
  state = {
    users: {},
    usersRetrieved: false,
  };

  addNewMatch(_matchId) {
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid + '/matches/' + _matchId)
      .set({ matched: true });
  }

  getUsersList() {
    let genderTolook = 'female';
    let data = firebase
      .database()
      .ref('users/')
      .orderByChild('gender')
      .equalTo(genderTolook);
    data.once('value').then(async snapshot => {
      let usersData = snapshot.val();
      this.setState({ users: usersData, usersRetrieved: true });
    });
  }

  componentDidMount() {
    this.getUsersList();
  }

  render() {
    let userMap = Object.entries(this.state.users);

    return (
      <ViewPager
        users={userMap}
        usersRetrieved={this.state.usersRetrieved}
        addNewMatch={this.addNewMatch}
        navigation={this.props.navigation}
      />
    );
  }
}

export default SwipeScreen;
