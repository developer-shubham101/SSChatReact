import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
import firebase from 'react-native-firebase'

export default class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: [] }
    }
    componentDidMount (){
        var usersRef = firebase.database().ref("users");
        usersRef.on('value', (snapshot) => {
            snapshot.forEach((snap) => {
                var item = snap.val();
                
                this.state.list.push({email: item.email, userID: item.userID})
            }); 
        });
    }
    onClickListener = (viewId) => {
        if (viewId == "logout") {
            firebase.auth().signOut().then(() => {
                this.goBack();
            }).catch(function (error) {
                console.log(error)
                Alert.alert("Logout error", error);
            });
        } else {
            Alert.alert("Alert", "Button pressed " + viewId);
        }

    }
    openChatScreen = (object) => {
        console.log(object)
        this.props.navigation.navigate("Chat", {
            email: object.email,
            userID: object.userID
            
          })
    }
    goBack = () => {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    extraData={this.state}
                    data={this.state.list}
                    renderItem={({ item }) => <Text style={styles.item} onPress={this.openChatScreen.bind(this, item)} >{item.email}</Text>}
                />

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('logout')}>
                    <Text style={styles.loginText}>Logout</Text>
                </TouchableHighlight>


            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },

    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});
