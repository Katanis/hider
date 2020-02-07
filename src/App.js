// import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
// import {handleFbLogin} from './lib/auth';

import React, {Component} from 'react';
// import {View} from 'react-native';
import {AccessToken, LoginManager, LoginButton} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import {handleFbLogin} from './lib/auth/index';

export default class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.facebookLogin = this.facebookLogin.bind(this);
  }

  async facebookLogin() {
    LoginManager.logOut();
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
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

      console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <View>
        <Button
          onPress={this.facebookLogin}
          title="Sign in with facebook"
          color="#3c50e8"
        />
        <Button title="SIGN IN EXAMPLE"></Button>
      </View>
      // <View>
      //   <LoginButton
      //     onLoginFinished={(error, result) => {
      //       if (error) {
      //         console.log('login has error: ' + result.error);
      //       } else if (result.isCancelled) {
      //         console.log('login is cancelled.');
      //       } else {
      //         AccessToken.getCurrentAccessToken().then(data => {
      //           {handleFbLogin}
      //           console.log('success');
      //           console.log(data.accessToken.toString());
      //         });
      //       }
      //     }}
      //     onLogoutFinished={() => console.log('logout.')}
      //   />
      // </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
// });
