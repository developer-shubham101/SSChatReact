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

import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
const AppNavigator = createStackNavigator({
    Home: {
        screen: LoginScreen,
    },
    Details: {
        screen: UsersList,
    },
    Chat: {
        screen: ChatScreen
    }, 
    Profile: {
        screen: ProfileScreen
    }
}, {
        initialRouteName: 'Home',
    });


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

