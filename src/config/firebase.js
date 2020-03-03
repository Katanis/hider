import firebase from 'react-native-firebase';
firebase.app();

class Fire {
  constructor(chatId) {
    this.chatId = chatId;
  }

  onAuthStateChanged = user => {
    firebase.auth().currentUser.uid;
  };

  get uid() {
    return firebase.auth().currentUser.uid;
  }

  //   ref() {
  //     // alert('chats/' + this.chatId + '/messages/');

  //     return firebase.database().ref('chats/' + this.chatId + '/messages/');
  //   }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    firebase
      .database()
      .ref('chats/' + this.chatId + '/messages/')
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = (messages, ref) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message, ref);
    }
  };

  setChatId = chatId => {
    this.chatId = chatId;
    // alert(chatId);
  };

  append = (message, ref) =>
    firebase
      .database()
      .ref('chats/' + ref + '/messages/')
      .push(message);

  // close the connection to the Backend
  //   off() {
  //     this.ref.off();
  //   }
}
Fire.shared = new Fire();
export default Fire;
