import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  Picker,
  StyleSheet,
} from 'react-native';

import GenderInterest from '../../Components/GenderInterest/GenderInterest';
import InputField from '../../Components/InputField/Input';
import firebase from 'react-native-firebase';
import ImageUpload from '../../Components/ImageUpload/index';

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile Settings',
  };
  state = {
    nickname: '',
    id: '',
    profilePictureUrl: 'https://facebook.github.io/react/logo-og.png',
    userInterest: '',
    description: '',
    images: null,
  };

  // settingsDataResponse = e => this.setState({ userInterest: e });
  settingsDataResponse(data) {
    this.setState({ userInterest: data });
  }

  writeDataToFirebase() {
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      // eslint-disable-next-line prettier/prettier
      .update({
        userInterest: this.state.userInterest,
        description: this.state.description,
      });
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
          userInterest: data.userInterest,
          description: data.description,
          images: data.images,
        });
        // console.log(data);
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
        {this.state.images !== null ? (
          <ImagesToDisplay images={this.state.images} />
        ) : null}
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
        <Text>DESCRIPTION</Text>
        <TextInput
          style={{
            borderColor: '#D85A3A',
            borderWidth: 1,
            paddingTop: 20,
            width: 200,
            marginTop: 10,
            color: '#D85A3A',
          }}
          placeholder={this.state.description}
          onChangeText={input => this.setState({ description: input })}
          defaultValue={this.state.description}
        />

        {/* INTEREST CHOISE */}
        <View style={{ flexDirection: 'row', paddingTop: 10, height: 60 }}>
          <Text style={{ paddingTop: 15, color: '#D85A3A' }}>
            What are you in to?
          </Text>
          <View style={{ width: 150, borderWidth: 1, borderColor: '#D85A3A' }}>
            <Picker
              selectedValue={this.state.userInterest}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ userInterest: itemValue })
              }
            >
              <Picker.Item color="#D85A3A" label="Male" value="Male" />
              <Picker.Item color="#D85A3A" label="Female" value="Female" />
              <Picker.Item color="#D85A3A" label="Both" value="Both" />
            </Picker>
          </View>
        </View>
        <ImageUpload />
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

const ImagesToDisplay = images => {
  let imagesMap = Object.entries(images.images);
  return (
    <View style={styles.container}>
      {imagesMap.map(([key, value]) => {
        return <Image style={styles.avatar} key={key} source={value} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    alignItems: 'stretch',
  },
  touchableOpacity: {
    width: 100,
    height: 100,
  },
  avatar: {
    // borderRadius: 75,
    width: 50,
    height: 50,
    backgroundColor: '#F5FCFF',
    margin: 10,
  },
});
