import React, { Component } from 'react';
import { TouchableHighlight, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './Screens/MainScreen/MainScreen';
import ProfileScreen from './Screens/ProfileScreen/Profile';
import Swipe from './Screens/SwipeScreen/Swipe';
import SympathyList from './Screens/SympathyList/SympathyList';
import Chat from './Screens/Chat/Chat';
import ProfilePreview from './Screens/ProfilePreview/ProfilePreview';

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Profile: { screen: ProfileScreen },
  SwipeScreen: {
    screen: Swipe,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#182343',
        height: 80,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: '#FB4C61',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      cardStyle: { backgroundColor: '#182343' },
    },
  },
  SympathyList: {
    screen: SympathyList,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#182343',
        height: 80,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: '#FB4C61',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      cardStyle: { backgroundColor: '#182343' },
      title: 'MESSAGES',
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#182343',
        height: 80,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: '#FB4C61',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        // fontSize: '26px',
        textTransform: 'uppercase',
      },
      cardStyle: { backgroundColor: '#182343' },
      title: 'CHAT',
    },
  },
  ProfilePreview: {
    screen: ProfilePreview,
  },
});

const App = createAppContainer(MainNavigator);

export default App;
