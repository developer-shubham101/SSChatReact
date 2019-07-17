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

export default class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: [], message: ""}
    }
    chatRef = firebase.database().ref("chat");
    componentDidMount (){

        this.chatRef.on('child_added', (snapshot) => {
            console.log(snapshot)
            
                var item = snapshot.val();
                console.log("new data");
                let oldList = this.state.list;
                oldList.push({key: item.message});
                this.setState({list:oldList})
                console.log("pushed")
               
            
        });
    }
    onClickListener = (viewId) => {
        if (viewId == "logout") {
           
            this.chatRef.push({
                "message": this.state.message
            });
            this.state.message = ""
        } else {
            Alert.alert("Alert", "Button pressed " + viewId);
        }

    }
    openChatScreen = (object) => {
        console.log(object)
    }
    goBack = () => {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <View style={styles.container}>
                 
                    <FlatList  
                        data={this.state.list}
                        extraData={this.state} 
                        renderItem={({ item }) => <Text style={styles.item} onPress={this.openChatScreen.bind(this, item)} >{item.key}</Text>}
                    />
                
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Enter message" 
                        underlineColorAndroid='transparent'
                        value={this.state.message}
                        onChangeText={(message) => this.setState({ message })} />
                </View>
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
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
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
