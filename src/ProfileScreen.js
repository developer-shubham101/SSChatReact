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
import ImagePicker from 'react-native-image-picker';
export default class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { avatarSource: "" }
    }
    componentDidMount() {
        // Get a non-default Storage bucket
        // var storage = firebase.app().storage("gs://my-custom-bucket");
    }
    onClickListener = (viewId) => {
        if (viewId == "logout") {

            // More info on all the options is below in the API Reference... just some common use cases shown here
            const options = {
                title: 'Select Avatar',
                customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            };
            /**
             * The first arg is the options object for customization (it can also be null or omitted for default options),
             * The second arg is the callback which sends object: response (more info in the API Reference)
             */
            ImagePicker.showImagePicker(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    console.log(response)
                    // const source = { uri: response.uri };

                    // You can also display the image using data:
                    const source = { uri: 'data:image/jpeg;base64,' + response.data };
                    var storageRef = firebase.storage().ref();
                    // Create a reference to 'mountains.jpg'
                    var mountainsRef = storageRef.child('images/x.jpg');
                    var metadata = {
                        contentType: 'image/jpeg',
                      };
                    mountainsRef.put(response.uri, metadata);
                    this.setState({
                        avatarSource: source,
                    });
                }
            });

        } else {
            Alert.alert("Alert", "Button pressed " + viewId);
        }

    }

    goBack = () => {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={this.state.avatarSource} style={styles.uploadAvatar} />

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
    uploadAvatar: {
        height: 40,
        width: 50
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
