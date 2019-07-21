import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    TouchableHighlight
} from 'react-native';
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-picker';
export default class ProfileScreen extends React.Component {
    currentUser = firebase.auth().currentUser;
    constructor(props) {
        super(props);
        this.state = { avatarSource: "https://bootdey.com/img/Content/avatar/avatar6.png" }
    }
    componentDidMount() {
        // Get a non-default Storage bucket
        // var storage = firebase.app().storage("gs://my-custom-bucket");

        // Create a reference with an initial file path and name
        var storage = firebase.storage().ref();
        var pathReference = storage.child('profilePics/' + this.currentUser.uid + '.jpg');

        // Get the download URL
        pathReference.getDownloadURL().then((url) => {
            console.log(url)
            this.setState({
                avatarSource: url,
            });
        }).catch(function (error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;

                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }
        });
    }
    changeDP() {

        // well that came from https://github.com/react-native-community/react-native-image-picker
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

                let path = 'profilePics/' + this.currentUser.uid + '.jpg'
                // Create a reference to 'mountains.jpg'
                var mountainsRef = storageRef.child(path);
                var metadata = {
                    contentType: 'image/jpeg',
                };
                var uploadTask = mountainsRef.put(response.uri,  metadata);


                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    function (snapshot) {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }
                    }, function (error) {

                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                                console.log(' User doesn\'t have permission to access the object' )
                                break;

                            case 'storage/canceled':
                                console.log('User canceled the upload' )
                                break;



                            case 'storage/unknown':
                                console.log(' Unknown error occurred, inspect error.serverResponse' )
                                break;
                        }
                    }, function () {
                        // Upload completed successfully, now we can get the download URL
                        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                            console.log('File available at', downloadURL);
                        });
                    });


                var usersRef = firebase.database().ref("users/" + this.currentUser.uid + "/dp/");
                usersRef.set(path)
                // this.setState({
                //     avatarSource: source,
                // });
            }
        });
    }
    onClickListener = (viewId) => {
        if (viewId == "changeProfile") {


        } else if (viewId == 'changeDP') {

            Alert.alert(
                'Change Profile',
                '',
                [
                    { text: 'Remove Profile Pic', onPress: () => { this.changeDP() } },
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'Change', onPress: () => { this.changeDP() } },
                ],
                { cancelable: false },
            );
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

                <View style={styles.header}></View>

                <TouchableHighlight style={styles.avatarWrapper} onPress={() => this.onClickListener('changeDP')}>
                    <Image style={styles.avatar} source={{ uri: this.state.avatarSource }} />
                </TouchableHighlight>

                <View style={styles.body}>
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.info}>UX Designer / Mobile developer</Text>
                    <Text style={styles.description}>Click on profile icon to change profile image.!!!</Text>
                </View>

                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText} >Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    header: {
        backgroundColor: "#00BFFF",
        height: 100,
    },
    avatarWrapper: {
        width: 100,
        height: 100,
        marginBottom: 10,
        marginStart: 10,
        position: 'absolute',
        marginTop: 55,
        borderRadius: 50,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        borderWidth: 4,
        borderColor: "white",
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
        flex: 1,
        padding: 30,
    },

    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,

    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 10

    },
    buttonContainer: {
        flex: 1,
        marginTop: 10,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
        marginEnd: 5,
        marginStart: 5

    },
    buttonText: {
        fontSize: 14,
        color: "#FFFFFF",
        fontWeight: '100',
    }
});
