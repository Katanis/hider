import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  Picker,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableHighlight,
} from 'react-native';

import GenderInterest from '../../Components/GenderInterest/GenderInterest';
import InputField from '../../Components/InputField/Input';
import firebase from 'react-native-firebase';
import ImageUpload from '../../Components/ImageUpload/index';
import DeleteBraces from '../../Components/DeletePopUp/delete';

Profile.navigationOptions = {
  title: 'Profile Settings',
};

function Profile(props) {
  // static navigationOptions = {
  //   title: 'Profile Settings',
  // };
  // state = {
  //   nickname: '',
  //   id: '',
  //   profilePictureUrl: 'https://facebook.github.io/react/logo-og.png',
  //   userInterest: '',
  //   description: '',
  //   images: null,
  //   showModal: false,
  // };
  const [nickname, setNickname] = useState('');
  const [id, setId] = useState('');
  const [profilePictureUrl, setProfilePicture] = useState(
    'https://facebook.github.io/react/logo-og.png',
  );
  const [description, setDescription] = useState('');
  const [userInterest, setUserInterest] = useState('');
  const [images, setImages] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // settingsDataResponse = e => this.setState({ userInterest: e });
  // settingsDataResponse(data) {
  //   this.setState({ userInterest: data });
  // }

  // const writeDataToFirebase = () => {
  //   firebase
  //     .database()
  //     .ref('users/' + firebase.auth().currentUser.uid)
  //     // eslint-disable-next-line prettier/prettier
  //     .update({
  //       userInterest: userInterest,
  //       description: description,
  //     });
  // }
  const writeDataToFirebase = () => {
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      // eslint-disable-next-line prettier/prettier
      .update({
        userInterest: userInterest,
        description: description,
      });
  };

  // const readUserData = () => {
  //   firebase
  //     .database()
  //     .ref('/users/' + firebase.auth().currentUser.uid)
  //     .once('value')
  //     .then(snapshot => {
  //       let data = snapshot.val();
  //       this.setState({
  //         id: data.fbid,
  //         profilePictureUrl: data.profile_picture,
  //         nickname: data.nickname,
  //         userInterest: data.userInterest,
  //         description: data.description,
  //         images: data.images,
  //       });
  //       // console.log(data);
  //     });
  // }
  const readUserData = useCallback(() => {
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .once('value')
      .then(snapshot => {
        let data = snapshot.val();
        setId(data.fbid);
        setProfilePicture(data.profile_picture);
        setNickname(data.nickname);
        setUserInterest(data.userInterest);
        setDescription(data.description);
        setImages(data.images);
      });
  }, []);

  // componentDidMount() {
  //   this.readUserData();
  //   if (this.state.nicknameChanged === true) {
  //     this.writeDataToFirebase();
  //     this.setState({ nicknameChanged: false });
  //   }
  // }
  useEffect(() => {
    readUserData();
  },[]);

  // useEffect(() => {
  //   writeDataToFirebase();
  // });

  // render() {
  const { navigate } = props.navigation;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        {/* PROFILE PHOTO FROM FB */}
        <Image source={{ uri: profilePictureUrl }} style={styles.mainImage} />
        {images !== null ? <ImagesToDisplay images={images} /> : null}
        <ImageUpload />
        <Text style={styles.title}>DESCRIPTION</Text>
        <TextInput
          style={styles.input}
          placeholder={description}
          onChangeText={input => setDescription(input)}
          defaultValue={description}
        />

        {/* INTEREST CHOISE */}
        <Text style={styles.title}>What are you in to?</Text>
        {/* <View style={{ flexDirection: 'row', paddingTop: 10, height: 60, width: 300 }}> */}
        <Picker
          // style={(styles.input, { borderColor: '#182343', borderWidth: 1 })}
          selectedValue={userInterest}
          onValueChange={(itemValue, itemIndex) => setUserInterest(itemValue)}
        >
          <Picker.Item color="#182343" label="Male" value="Male" />
          <Picker.Item color="#182343" label="Female" value="Female" />
          <Picker.Item color="#182343" label="Both" value="Both" />
        </Picker>
        {/* </View> */}

        {/* SUBMIT BUTTON */}
        <Button
          onPress={() => writeDataToFirebase()}
          title="Save"
          style={{ width: 50 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
// }

export default Profile;

const ImagesToDisplay = images => {
  let imagesMap = Object.entries(images.images);
  return (
    <View style={styles.container}>
      {imagesMap.map(([key, value]) => {
        return <Image style={styles.avatar} key={key} source={value} />;
        // return (
        //   <DeleteBraces>
        //     <Image style={styles.avatar} key={key} source={value} />
        //   </DeleteBraces>
        // );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // margin: 5,
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
    borderRadius: 10,
  },
  mainImage: {
    width: 300,
    height: 200,
    // margin: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textTransform: 'capitalize',
  },
  input: {
    // border: '1px solid #182343',
    borderColor: '#182343',
    borderWidth: 1,
  },
});
