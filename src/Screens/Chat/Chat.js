import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import firebase from 'react-native-firebase';
import FirebaseConf from '../../config/firebase';

import { GiftedChat } from 'react-native-gifted-chat';
// firebase.initializeApp(config);
firebase.app();

class Chat extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      userId: '',
      message: '',
      messages: [],
      chats: [],
      chatId: '',
      chatIdChanged: false,
    };
    // this.handleClick = this.handleClick.bind(this);
    //this.sendMessage = this.sendMessage.bind(this);
    //this.getChats = this.getChats.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  get user() {
    return {
      name: 'Emilis',
      _id: firebase.auth().currentUser.uid,
    };
  }

  componentDidMount() {
    var _userId = firebase.auth().currentUser.uid;
  }

  getMessages = (_chatId, messages) => {
    let _messages = [];
    var query = firebase
      .database()
      .ref('chats/' + _chatId + '/messages/')
      .orderByKey();
    query.once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
        console.log('MY MESSAGE : ' + JSON.stringify(childData));
        // Object.assign(messages, childData);
        _messages.push(childData);
        this.setState({ messages: _messages });
        console.log(JSON.stringify(_messages));

        //DESTUKTURIZUOTI VIDUJE IR SUSIKURTI OBJEKTA PANASU I PAVIZDZIO
      });
    });

    this.setState({ messages: _messages });
    console.log(
      'Sudarytas zinuciu objektas ' + JSON.stringify(this.state.messages),
    );
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    const { params } = this.props.navigation.state;
    let data = params ? params.data : null;
    // console.log(data);
    if (!this.state.chatIdChanged) {
      console.log('I am inside IF STATEMENT');
      this.setState({ chatId: data, chatIdChanged: true });
      FirebaseConf.shared.setChatId(data);
      this.getMessages(data, this.state.messages);
      FirebaseConf.shared.on(message => {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
        }));
      });
    }

    return (
      <GiftedChat
        messages={this.state.messages}
        user={this.user}
        onSend={messages =>
          FirebaseConf.shared.send(messages, this.state.chatId)
        }
        showUserAvatar={true}
      />
    );
  }
}

export default Chat;
