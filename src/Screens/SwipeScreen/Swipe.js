/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import firebase from 'react-native-firebase';
import Swipe from '../../Components/SwipeComponent/Swipe';
import { Card, Button } from 'react-native-elements';

const SwipeScreen = props => {
  const [users, setUsers] = useState({});
  const [liked, setLiked] = useState(0);
  const [passed, setPassed] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const addNewMatch = _matchId => {
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid + '/matches/' + _matchId)
      .set({ matched: true });
  };
  useEffect(() => {
    getUsersList();
  }, [getUsersList]);

  const getUsersList = useCallback(() => {
    const genderTolook = 'female';
    const data = firebase.database().ref('users/');
    data.once('value').then(async snapshot => {
      setUsers(snapshot.val());
    });
  }, []);

  const renderCards = ([key, user]) => (
    <Card title={user.username} titleStyle={{ fontSize: 14 }} key={key}>
      <View style={{ height: 200 }}>
        <Image
          source={{ uri: user.profile_picture }}
          style={{ width: '100%', height: 200 }}
        />
      </View>
      <Button onPress={() => setModalVisible(true)} title="Preview profile" />
      <View style={styles.detailWrapper}>
        <Text>{user.username}</Text>
        <Text>{user.username}</Text>
      </View>
      <Text numberOfLines={4}>{user.username}</Text>
      {/* <ProfilePreview user={user} /> */}
    </Card>
  );

  const ProfilePreview = user => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        alert('closed');
      }}
    >
      <Image
        source={{ uri: user.profile_picture }}
        style={{ width: '100%', height: 200 }}
      />
      {/* TODO RENDER USER PHOTOS HERE */}
      <Button onPress={() => setModalVisible(false)} title="Close preview" />
    </Modal>
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

  const userMap = Object.entries(users);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight
        style={{ height: '10%' }}
        onPress={() =>
          props.navigation.navigate('SympathyList', {
            name: 'SympathyList',
          })
        }
      >
        <Text style={{ position: 'absolute', right: 0, padding: 15 }}>
          Chat
        </Text>
      </TouchableHighlight>
      <View style={styles.statusStyle}>
        <Text style={{ color: 'red' }}>Passed: {passed}</Text>
        <Text style={{ color: 'blue' }}>Like: {liked}</Text>
      </View>
      <Swipe
        data={userMap}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  statusStyle: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default SwipeScreen;
