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

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            data: { "asdasd": "asdasd" }
        };
    }

    componentDidMount() {
        // firebase.auth().signInAnonymously()
        //   .then(() => {
        //     this.setState({
        //       isAuthenticated: true,
        //     });
        //   });

        firebase.auth().signInAnonymously()
            .then((user) => {
                console.log("signInAnonymously");
                console.log(user.user);
            });
        const serverTime = firebase.database().getServerTime();
        this.setState({ data: { "time": serverTime } })
        var sessionsRef = firebase.database().ref("sessions");

        sessionsRef.push({
            startedAt: firebase.database.ServerValue.TIMESTAMP
        });
 
    }

    render() {
        // If the user has not authenticated
        // if (!this.state.isAuthenticated) {
        //   return null;
        // }

        return (
            <View style={styles.container} >

                <Text>Welcome to my awesome app!{JSON.stringify(this.state.data)} </Text>
            </View>
        );
    }

}

export default App;


const styles = StyleSheet.create({
    container: {
        marginTop: 140
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});