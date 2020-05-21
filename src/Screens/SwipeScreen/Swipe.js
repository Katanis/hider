/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import firebase from 'react-native-firebase';
import Swipe from '../../Components/SwipeComponent/Swipe';
import { Card, Button } from 'react-native-elements';

function SwipeScreen(props) {
  SwipeScreen.navigationOptions = {
    title: 'PEOPLE',
    headerRight: (
      <TouchableHighlight
        onPress={() => props.navigation.navigate('SympathyList')}
      >
        <Text
          style={{
            color: '#FB4C61',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: 18,
            paddingRight: 15,
          }}
        >
          Chat
        </Text>
      </TouchableHighlight>
    ),
  };
  const [users, setUsers] = useState({});
  const [facebookFriends, setFbFriends] = useState({});
  const [liked, setLiked] = useState(0);
  const [passed, setPassed] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredUserList, updateFilteredUserList] = useState([]);

  const addNewMatch = _matchId => {
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid + '/matches/' + _matchId)
      .set({ matched: true });
  };

  useEffect(() => {
    getUsersList();
  }, [getUsersList]);

  useEffect(() => {
    getFacebookFriends();
  }, [getFacebookFriends]);

  const getUsersList = useCallback(() => {
    const genderTolook = 'female';
    const data = firebase.database().ref('users/');
    data.once('value').then(async snapshot => {
      setUsers(snapshot.val());
    });
  }, []);

  const getFacebookFriends = useCallback(() => {
    const data = firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid + '/friends/data');
    data.once('value').then(async snapshot => {
      setFbFriends(snapshot.val());
    });
  }, []);

  const renderCards = ([key, user]) => (
    <View key={key} style={{ height: 400, margin: 20 }}>
      <ImageBackground
        source={{ uri: user.profile_picture }}
        style={styles.image}
      >
        <Text style={styles.textBig}>{user.username + ', ' + user.age}</Text>
        <Text style={styles.textSmall}>{user.description}</Text>
        <Button
          style={{ margin: 20, backgroundColor: '#FFFFFF' }}
          onPress={() => setModalVisible(true)}
          title="Preview profile"
        />
      </ImageBackground>
    </View>
  );

  const renderNoMoreCards = () => (
    <Card title="No More cards">
      <Button
        title="Do something"
        large
        icon={{ name: 'my-location' }}
        backgroundColor="#03A9F4"
      />
    </Card>
  );

  let userMap = Object.entries(users);
  let result = [];
  Object.entries(facebookFriends).map(([key, value]) => {
    result = userMap.filter(x => !x.some(({ fbid }) => fbid === value.id));
    userMap = result;
    console.log(JSON.stringify(value.id));
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Image
          style={styles.imageButton}
          source={require('../../Images/x_button.png')}
        />
        <Image
          style={styles.imageButton}
          source={require('../../Images/heart_button.png')}
        />
      </View>

      <Swipe
        data={result}
        keyProp="jobId"
        onSwipeRight={() => setLiked(liked + 1)}
        onSwipeLeft={() => setPassed(passed + 1)}
        renderCard={renderCards}
        addNewMatch={addNewMatch}
        renderNoMoreCards={renderNoMoreCards}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageButton: {
    width: 50,
    height: 100,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 999,
    alignItems: 'center',
    top: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusStyle: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    height: 360,
    borderRadius: 10,
    overflow: 'hidden',
  },
  textBig: {
    color: '#FFFFFF',
    textTransform: 'capitalize',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    margin: 5,
  },
  textSmall: {
    color: '#FFFFFF',
    textTransform: 'capitalize',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    margin: 5,
  },
});

export default SwipeScreen;
