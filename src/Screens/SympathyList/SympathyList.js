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
    this.state = { chats: [], usersData: [], userIDs: [] };
    this.getChats = this.getChats.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
  }

  componentDidMount() {
    var _userId = firebase.auth().currentUser.uid;
    this.getChats(_userId);
  }

  getChats = _userId => {
    let data;
    let usersData = [];
    var readedData = firebase
      .database()
      .ref('chats')
      .orderByChild('members/' + _userId)
      .equalTo(true);
    readedData.once('value', snapshot => {
      data = snapshot.val();

      // const temp = { ...data };
      const filtered = Object.entries(data).map(([key, value]) =>
        Object.keys(value)
          .filter(value => value !== _userId)
          .filter(value => value !== 'members')
          .filter(value => value !== 'messages'),
      );

      // console.log('filtered data: ' + JSON.stringify(data[filtered[0]);

      this.setState({ chats: data, usersData: usersData, userIDs: filtered });
      return true;
    });
  };

  async deleteAll(items, _userId) {
    for (let element of items) {
      await this.deleteOne(element.members);
      await this.deleteOne(element._userId);
    }
    return items;
  }

  render() {
    const { navigate } = this.props.navigation;
    const { chats } = this.state;
    // console.log('chats: ' + this.state.chats);
    const chatKeys = Object.keys(chats);
    let allChats = Object.keys(this.state.chats).map(key => key);
    const userIDS = this.state.userIDs;
    return (
      <ListItems
        navigate={navigate}
        data={allChats}
        usersData={chats}
        userIDS={userIDS}
        // extraData={this.state.usersData}
      />
    );
  }
}

export default SympathyList;

function Item({
  id,
  title,
  selected,
  onSelect,
  navigate,
  data,
  profile_picture,
}) {
  return (
    <View
      style={{
        // borderColor: 'gray',
        borderBottomWidth: 0.75,
        borderBottomColor: '#BFBFBF',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        margin: 10,
      }}
    >
      <Image
        style={{ height: 50, width: 50, borderRadius: 10, marginBottom: 10 }}
        source={{
          uri: profile_picture,
        }}
      />
      <Text
        style={{
          padding: 12,
          color: '#171717',
          textTransform: 'capitalize',
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontWeight: 'bold',
        }}
      >
        {title}
      </Text>
      {/* {console.log('Chat duomenys: ' + JSON.stringify(data))} */}

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

  const { userIDS } = props.userIDS;

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );
  if (!props.userIDS.length) return null;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.data}
        renderItem={({ item, index }) => (
          <Item
            id={item.id}
            title={props.usersData[item][props.userIDS[index][0]].username}
            selected={!!selected.get(item.id)}
            profile_picture={
              props.usersData[item][props.userIDS[index][0]].profile_picture
            }
            onSelect={onSelect}
            navigate={props.navigate}
            data={item}
            key={item}
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
    backgroundColor: '#FFFFFF',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
