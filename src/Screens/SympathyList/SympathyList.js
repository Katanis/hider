import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';
import firebase from 'react-native-firebase';

firebase.app();

class SympathyList extends Component {
  constructor(props) {
    super(props);
    this.state = { chats: [] };
    this.getChats = this.getChats.bind(this);
  }

  componentDidMount() {
    var _userId = firebase.auth().currentUser.uid;

    this.getChats(_userId);
  }

  getChats = _userId => {
    var readedData = firebase.database().ref('chats/');
    readedData.on('value', snapshot => {
      this.setState({ chats: snapshot.val() });
      console.log(this.state.chats);
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    console.log('chats: ' + this.state.chats);
    let allChats = Object.keys(this.state.chats).map(key => key);

    return (
      <ScrollView style={{ backgroundColor: '#182343', height: '100%' }}>
        {console.log(
          'Chat before map ' + allChats + ' length :' + allChats.length,
        )}
        {allChats.length > 0 ? (
          allChats.map(rez => {
            {
              console.log('inside loop');
            }
            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                flexDirection: 'row',
                backgroundColor: 'white',
                margin: 10,
                height: 70,
              }}
            >
              <Image
                style={{ height: 50, width: 50 }}
                source={{
                  uri: 'https://facebook.github.io/react/logo-og.png',
                }}
              />
              <Text style={{ padding: 12 }}>Persons Name</Text>
              <TouchableHighlight
                style={{ right: 0, position: 'absolute' }}
                title="Chat"
                onPress={() => navigate('Chat', { name: 'Chat' })}
              >
                <Text
                  style={{
                    color: 'white',
                    backgroundColor: 'orange',
                    height: 50,
                    alignContent: 'center',
                    padding: 12,
                    borderColor: '#182343',
                    borderWidth: 2,
                    borderRadius: 5,
                  }}
                >
                  Chat
                </Text>
              </TouchableHighlight>
            </View>;
          })
        ) : (
          <Text>Nepaejo</Text>
        )}
      </ScrollView>
    );
  }
}

export default SympathyList;

// <View
//               style={{
//                 borderColor: 'gray',
//                 borderWidth: 1,
//                 flexDirection: 'row',
//                 backgroundColor: 'white',
//                 margin: 10,
//               }}
//             >
//               <Image
//                 style={{ height: 50, width: 50 }}
//                 source={{
//                   uri: 'https://facebook.github.io/react/logo-og.png',
//                 }}
//               />
//               <Text style={{ padding: 12 }}>Persons Name</Text>
//               <TouchableHighlight
//                 style={{ right: 0, position: 'absolute' }}
//                 title="Chat"
//                 onPress={() => navigate('Chat', { name: 'Chat' })}
//               >
//                 <Text
//                   style={{
//                     color: 'white',
//                     backgroundColor: 'orange',
//                     height: 50,
//                     alignContent: 'center',
//                     padding: 12,
//                     borderColor: '#182343',
//                     borderWidth: 2,
//                     borderRadius: 5,
//                   }}
//                 >
//                   Chat
//                 </Text>
//               </TouchableHighlight>
//             </View>;
