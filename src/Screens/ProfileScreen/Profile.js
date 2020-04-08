import React from 'react';
import { View, Text, Image, TextInput, Button, Picker } from 'react-native';

import GenderInterest from '../../Components/GenderInterest/GenderInterest';
import InputField from '../../Components/InputField/Input';
import firebase from 'react-native-firebase';

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };
  state = {
    nickname: '',
    id: '',
    profilePictureUrl: 'https://facebook.github.io/react/logo-og.png',
  };

  writeDataToFirebase() {
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      // eslint-disable-next-line prettier/prettier
      .update({ nickname: this.state.nickname });
  }

  readUserData() {
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .once('value')
      .then(snapshot => {
        let data = snapshot.val();
        this.setState({
          id: data.fbid,
          profilePictureUrl: data.profile_picture,
          nickname: data.nickname,
        });
        console.log(data);
      });
  }
  componentDidMount() {
    this.readUserData();
    if (this.state.nicknameChanged === true) {
      this.writeDataToFirebase();
      this.setState({ nicknameChanged: false });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ backgroundColor: '#182343', height: '100%' }}>
        {/* PROFILE PHOTO FROM FB */}
        <Image
          source={{ uri: this.state.profilePictureUrl }}
          style={{ width: 150, height: 150 }}
        />
        {/* NICNAME FOR USER */}
        {/* <View style={{ flexDirection: 'row', paddingTop: 10 }}>
          <Text style={{ paddingTop: 10, color: '#D85A3A' }}>
            Your nickname:{' '}
          </Text>
          <TextInput
            onChange={input =>
              this.setState({ nickname: input, nicknameChanged: true })
            }
            style={{ width: 100, color: '#D85A3A' }}
            value={this.state.nickname}
          />
        </View> */}
        {/* DESCRIPTION ABOUT YOUR SELF */}
        <TextInput
          style={{
            borderColor: '#D85A3A',
            borderWidth: 1,
            paddingTop: 20,
            width: 200,
            marginTop: 10,
            color: '#D85A3A',
          }}
          onChange={input => this.setState({ description: input })}
        />

        {/* INTEREST CHOISE */}
        <View style={{ flexDirection: 'row', paddingTop: 10, height: 60 }}>
          <Text style={{ paddingTop: 15, color: '#D85A3A' }}>
            What are you in to?
          </Text>
          <GenderInterest />
        </View>
        {/* SUBMIT BUTTON */}
        <Button
          onPress={() => this.writeDataToFirebase()}
          title="Save"
          style={{ width: 50 }}
        />
      </View>
    );
  }
}

export default Profile;
