// import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  Image,
} from 'react-native';
// import {handleFbLogin} from './lib/auth';

import React, { Component } from 'react';
// import {View} from 'react-native';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { NavigationEvents } from 'react-navigation';

const FBSDK = require('react-native-fbsdk');
const { GraphRequest, GraphRequestManager } = FBSDK;

export default class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      userLoggedIn: false,
      userdata: '',
      userPicture: '',
      dataUpdated: false,
      isLoading: true,
    };
    this.facebookLogin = this.facebookLogin.bind(this);
    this.userInfo = this.userInfo.bind(this);
    this._responseInfoCallback = this._responseInfoCallback.bind(this);
    this.writeUserData = this.writeUserData.bind(this);
  }

  _responseInfoCallback(error, result) {
    if (error) {
      console.log('Error fetching data: ' + JSON.stringify(error));
      this.setState({ dataUpdated: false });
    } else {
      console.log('Success fetching data: ' + JSON.stringify(result));
      this.setState({
        userdata: result,
        dataUpdated: true,
        userPicture: result.picture.data.url,
      });
      this.writeUserData(
        firebase.auth().currentUser.uid,
        result.first_name,
        result.email,
        result.picture,
        result.id,
        result.gender,
      );
      // alert(result.id);
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userLoggedIn: false });
        this.forceUpdate();
      } else {
        this.setState({ userLoggedIn: true });
        this.forceUpdate();
      }
    });
    if (!this.state.dataUpdated) {
      this.userInfo();
    }
  }

  userInfo() {
    const infoRequest = new GraphRequest(
      '/me?fields=id,first_name,picture.type(large),gender,email',
      null,
      this._responseInfoCallback,
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  //writing user data from facebook to firebase
  writeUserData(userId, name, email, imageUrl, id, _gender) {
    firebase
      .database()
      .ref('users/' + userId)
      .update({
        username: name,
        email: email,
        profile_picture: imageUrl.data.url,
        fbid: id,
        gender: _gender,
      });
  }

  async facebookLogin() {
    LoginManager.logOut();
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
        'user_gender',
        'user_friends',
        'user_birthday',
        'user_age_range',
      ]);

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        throw new Error('User cancelled request');
      }
      console.log(
        `Login success with permissions: ${result.grantedPermissions.toString()}`,
      );

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        throw new Error(
          'Something went wrong obtaining the users access token',
        );
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));
    } catch (e) {
      console.error(e);
    }
  }

  async createUserListAndNavigate() {
    let genderTolook = 'female';

    let data = firebase
      .database()
      .ref('users/')
      .orderByChild('gender')
      .equalTo(genderTolook);
    data.once('value', snapshot => {
      console.log(JSON.stringify(snapshot.val()));
    });
    //console.log(JSON.stringify(data));
    //this.navigate('SwipeScreen', { name: 'SwipeScreen' });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ backgroundColor: '#182343', height: '100%' }}>
        <Button
          title="Settings"
          onPress={() => navigate('Profile', { name: 'My Profile' })}
        />
        <View style={{ flex: 1, alignItems: 'center', height: 100 }}>
          <Image
            style={{ alignContent: 'center', top: 50 }}
            source={require('../../Images/hider-logo.png')}
          />
          {this.state.dataUpdated ? (
            <Image
              style={{ alignContent: 'center', top: 50 }}
              source={{
                uri: this.state.userPicture,
              }}
            />
          ) : null}
        </View>
        {this.state.userLoggedIn ? (
          <CustomButton
            title="Sign in with facebook"
            action={this.facebookLogin}
          />
        ) : (
          <CustomButton
            title="Start Your Adventure"
            action={() => navigate('SwipeScreen', { name: 'SwipeScreen' })}
          />
        )}
      </View>
    );
  }
}

const CustomButton = props => {
  return (
    <TouchableHighlight
      style={{
        height: 50,
        marginLeft: 50,
        marginRight: 50,
        bottom: 50,
      }}
      onPress={props.action}
    >
      <Text
        style={{
          color: '#D85A3A',
          backgroundColor: '#182343',
          height: 50,
          alignContent: 'center',
          padding: 12,
          borderColor: '#D85A3A',
          borderWidth: 2,
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          fontFamily: 'Hind',
        }}
      >
        {props.title}
      </Text>
    </TouchableHighlight>
  );
};
