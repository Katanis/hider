import React, { useState } from 'react';
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
    <View style={styles.viewPager}>
      {/* Chat Button Here */}
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
      {/* Users to match with list */}
      <ViewPager style={styles.viewPager} initialPage={0}>
        {props.usersRetrieved && props.users ? (
          props.users.map(([key, user]) => (
            <View key={key}>
              <TouchableHighlight
                style={{ height: '70%' }}
                onPress={() =>
                  props.navigation.navigate('ProfilePreview', {
                    name: user.username,
                  })
                }
              >
                <Image
                  source={{
                    uri: user.profile_picture,
                  }}
                  style={{ width: '100%', height: '100%' }}
                />
              </TouchableHighlight>
              {/* TODO ON press yes or no it should get another person data, if there is no other person it
          should say no users right now awailable, else if its a match and message should be allerted */}
              <View style={{ flexDirection: 'row' }}>
                <TouchableHighlight onPress={() => alert('no')}>
                  <Text style={{ height: '100%', padding: 50 }}>
                    Not For Me
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => props.addNewMatch(key)}>
                  <Text style={{ height: '100%', padding: 50 }}>Send Love</Text>
                </TouchableHighlight>
              </View>
            </View>
          ))
        ) : (
          <Text>Loading</Text>
        )}
      </ViewPager>
    </View>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});

export default MyPager;
