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
import EditProfileScreen from './src/EditProfileScreen';
import AuthPage from "./src/AuthPage";

import { createStackNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';



const TabNavigator = createBottomTabNavigator({
    UsersList: {
        screen: UsersList,
    },
    Profile: {
        screen: ProfileScreen
    },

});
const SignedInNavigator = createStackNavigator({

    EditProfileScreen: {
        screen: EditProfileScreen
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
    initialRouteName: 'TabNavigator',
    headerMode: 'none',
    mode: 'modal'
});

const SignedOutNavigator = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
    },
}, {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
    mode: 'modal'
});


export const SwitchNavigator = createSwitchNavigator({
    AuthPage: {
        screen: AuthPage
    },
    SignedOut: {
        screen: SignedOutNavigator
    },
    SignedIn: {
        screen: SignedInNavigator
    },
}, {
    initialRouteName: "AuthPage",

});


const AppContainer = createAppContainer(SwitchNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

