/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import LoginScreen from './src/LoginScreen'
import UsersList from './src/UsersList'
import ChatScreen from './src/ChatScreen'
import ProfileScreen from './src/ProfileScreen'
import Examples from './src/Examples'

import { createStackNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';

const AppNavigator = createStackNavigator({
    Home: {
        screen: LoginScreen,
    },
    UsersList: {
        screen: UsersList,
    },
    Chat: {
        screen: ChatScreen
    },
    Examples: {
        screen: Examples
    }

}, {
        initialRouteName: 'Home',
    });

const TabNavigator = createBottomTabNavigator({ 
    Users: {
        screen: AppNavigator
    },
    Profile: {
        screen: ProfileScreen
    },
   
});

const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

