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
import EditProfileScreen from './src/EditProfileScreen'

import { createStackNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';



const TabNavigator = createBottomTabNavigator({
    UsersList: {
        screen: UsersList,
    },
    Profile: {
        screen: ProfileScreen
    },

});
const AppNavigator = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
    },
    EditProfileScreen :{
        screen :EditProfileScreen
    },
    Chat: {
        screen: ChatScreen
    },
    Examples: {
        screen: Examples
    },
    TabNavigator: {
        screen: TabNavigator
    }

}, {
        initialRouteName: 'Chat',
    });
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

