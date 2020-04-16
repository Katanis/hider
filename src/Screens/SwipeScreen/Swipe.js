import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Picker,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import firebase from 'react-native-firebase';
import ViewPager from '../../Components/ViewPager/ViewPager';
import Swipe from '../../Components/SwipeComponent/Swipe';
import { Card, Button } from 'react-native-elements';

class SwipeScreen extends Component {
  state = {
    users: {},
    usersRetrieved: false,
    liked: 0,
    passed: 0,
  };

  handleLiked = () => {
    this.setState(({ liked }) => ({
      liked: liked + 1,
    }));
  };

  handlePassed = () => {
    this.setState(({ passed }) => ({
      passed: passed + 1,
    }));
  };

  addNewMatch(_matchId) {
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid + '/matches/' + _matchId)
      .set({ matched: true });
  }

  getUsersList() {
    let genderTolook = 'female';
    let data = firebase.database().ref('users/');
    // .orderByChild('gender')
    // .equalTo(genderTolook);
    data.once('value').then(async snapshot => {
      let usersData = snapshot.val();
      this.setState({ users: usersData, usersRetrieved: true });
    });
  }

  componentDidMount() {
    this.getUsersList();
  }

  renderCards([key, user]) {
    return (
      <Card title={user.username} titleStyle={{ fontSize: 14 }} key={key}>
        <View style={{ height: 200 }}>
          <Image
            source={{
              uri: user.profile_picture,
            }}
            style={{ width: '100%', height: 200 }}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{user.username}</Text>
          <Text>{user.username}</Text>
        </View>
        <Text numberOfLines={4}>{user.username}</Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No More cards">
        <Button
          title="Do something"
          large
          icon={{ name: 'my-location' }}
          backgroundColor="#03A9F4"
        />
      </Card>
    );
  };

  render() {
    let userMap = Object.entries(this.state.users);

    return (
      // <ViewPager
      //   users={userMap}
      //   usersRetrieved={this.state.usersRetrieved}
      //   addNewMatch={this.addNewMatch}
      //   navigation={this.props.navigation}
      // />
      <SafeAreaView style={styles.container}>
        <TouchableHighlight
          style={{ height: '10%' }}
          onPress={() =>
            this.props.navigation.navigate('SympathyList', {
              name: 'SympathyList',
            })
          }
        >
          <Text style={{ position: 'absolute', right: 0, padding: 15 }}>
            Chat
          </Text>
        </TouchableHighlight>
        <View style={styles.statusStyle}>
          <Text style={{ color: 'red' }}>Passed: {this.state.passed}</Text>
          <Text style={{ color: 'blue' }}>Like: {this.state.liked}</Text>
        </View>
        <Swipe
          data={userMap}
          keyProp="jobId"
          onSwipeRight={this.handleLiked}
          onSwipeLeft={this.handlePassed}
          renderCard={this.renderCards}
          addNewMatch={this.addNewMatch}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </SafeAreaView>
    );
  }
}

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
