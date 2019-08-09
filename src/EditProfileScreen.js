import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    Dimensions
} from 'react-native';
import firebase from 'react-native-firebase';

export default class EditProfileScreen extends React.Component {
    currentUser = firebase.auth().currentUser;
    userRef;
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            bio: ''
        }

        this.userRef = firebase.database().ref("users/" + this.currentUser.uid);
        firebase
            .database()
            .ref("users/" + this.currentUser.uid)
            .once("value", snap => {
                console.log(snap);
                this.setState({
                    name: snap.val().name,
                    email: snap.val().email,
                    bio: snap.val().bio
                });
            });
    }

    componentDidMount() { }

    onClickListener = viewId => {
        if (viewId == "update") {
            this.userRef.child("name").set(this.state.name);
            this.userRef.child("bio").set(this.state.bio);
        } else if (viewId == "login") {

        } else {
            Alert.alert("Alert", "Button pressed " + viewId);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.inputContainer, styles.firstInput]}>
                    <Image
                        style={styles.inputIcon}
                        source={{
                            uri: "https://png.icons8.com/message/ultraviolet/50/3498db"
                        }}
                    />
                    <TextInput
                        style={styles.inputs}
                        placeholder="Email"
                        value={this.state.email}
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        editable={false}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image
                        style={styles.inputIcon}
                        source={{
                            uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db"
                        }}
                    />
                    <TextInput
                        style={styles.inputs}
                        placeholder="Name"
                        value={this.state.name}
                        underlineColorAndroid='transparent'
                        onChangeText={(name) => this.setState({ name })} />
                </View>
                <View style={styles.inputContainer}>
                    <Image
                        style={styles.inputIcon}
                        source={{
                            uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db"
                        }}
                    />
                    <TextInput
                        style={styles.inputs}
                        placeholder="Bio"
                        value={this.state.bio}
                        underlineColorAndroid="transparent"
                        onChangeText={bio => this.setState({ bio })}
                    />
                </View>

                <TouchableHighlight
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => this.onClickListener("update")}
                >
                    <Text style={styles.loginText}>Update Profile</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    firstInput: {
        marginTop: 20
    },
    container: {
        flex: 1,

        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: "90%",
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1
    },
    inputIcon: {
        width: 15,
        height: 15,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: "90%",
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});
