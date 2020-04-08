import React, { Component, isValidElement } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
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
    var readedData = firebase
      .database()
      .ref('chats')
      .orderByChild('members/' + _userId)
      .equalTo(true);
    readedData.once('value', snapshot => {
      this.setState({ chats: snapshot.val() });
      console.log(this.state.chats);
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    console.log('chats: ' + this.state.chats);
    let allChats = Object.keys(this.state.chats).map(key => key);

    return <ListItems navigate={navigate} data={allChats} />;
  }
}

export default SympathyList;

function Item({ id, title, selected, onSelect, navigate, data }) {
  return (
    <View
      style={{
        borderColor: 'gray',
        borderWidth: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 10,
      }}
    >
      <Image
        style={{ height: 50, width: 50 }}
        source={{
          uri: 'https://facebook.github.io/react/logo-og.png',
        }}
      />
      <Text style={{ padding: 12 }}>{title}</Text>
      <TouchableHighlight
        style={{ right: 0, position: 'absolute' }}
        title={data}
        onPress={() => navigate('Chat', { name: 'Chat', data: data })}
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
    </View>
  );
}

const ListItems = props => {
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.data}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
            navigate={props.navigate}
            data={item}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#182343',
    height: '100%',
    // marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
