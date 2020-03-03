import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableHighlight,
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';

const MyPager = props => {
  return (
    <ViewPager style={styles.viewPager} initialPage={0}>
      <View key="1">
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
        <TouchableHighlight
          style={{ height: '70%' }}
          onPress={() =>
            props.navigation.navigate('ProfilePreview', {
              name: 'Nickname of a person',
            })
          }
        >
          <Image
            source={{
              uri: 'https://facebook.github.io/react/logo-og.png',
            }}
            style={{ width: '100%', height: '100%' }}
          />
        </TouchableHighlight>
        <View style={{ flexDirection: 'row' }}>
          <TouchableHighlight onPress={() => alert('no')}>
            <Text style={{ height: '100%', padding: 50 }}>Not For Me</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => alert('Yes')}>
            <Text style={{ height: '100%', padding: 50 }}>Send Love</Text>
          </TouchableHighlight>
          {/* <Button style={{flex: 1, width: '50%'}} title="Maybe not" />
          <Button style={{flex: 1, width: '50%'}} title="Afair ;)" /> */}
          {/* if its a match redirect to another screen */}
        </View>
      </View>
      <View key="2">
        <Text>Second page</Text>
        <Image
          source={{
            uri: 'https://facebook.github.io/react/logo-og.png',
          }}
          style={{ width: '100%', height: '80%' }}
        />
      </View>
    </ViewPager>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});

export default MyPager;
