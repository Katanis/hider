// import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import {handleFbLogin} from './lib/auth';

import React, { Component } from 'react';
// import {View} from 'react-native';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { NavigationEvents } from 'react-navigation';

export default class App extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.facebookLogin = this.facebookLogin.bind(this);
    }

    // componentDidMount() {
    //     firebase.auth().onAuthStateChanged(user => {
    //         // ********* If a user is logged in firebase will return the user object. THEY ARE NOT LOGGED IN THOUGH *********
    //         if (user) {
    //             console.log('onAuthStateChanged', user);
    //             // ********* Then we call an official Firebase login function through actions *********
    //             this.props.loginRequest(user);
    //         } else {
    //             console.log('No user signed in');
    //         }
    //     });
    // }

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

            console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#182343', height: '100%' }}>
                <Button
                    onPress={this.facebookLogin}
                    title="Sign in with facebook"
                    color="#3c50e8"
                />
                <Button
                    title="SIGN IN EXAMPLE"
                    onPress={() => navigate('Profile', { name: 'MyProfile' })}
                />
                <Button
                    title="Find your afair"
                    onPress={() =>
                        navigate('SwipeScreen', { name: 'SwipeScreen' })
                    }
                />
            </View>
        );
    }
}
