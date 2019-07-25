import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native'; 

export default class Examples extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order : "asdasdas"
        }
    }

    componentDidMount() {
        var str1 = "sharma"
        var str2 = "shubham"
        this.setState({order : this.fetchLower({str1, str2}) })
    }
    fetchLower ({str1, str2}){
        if (str1.localeCompare(str2) < 0) {
            return str1 + "_" + str2
        }else{
            return str2 + "_" + str1
        } 
    }
     

    render() {
        return (
            

            <View style={styles.container}>
                 <Text>{this.state.order}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
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
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
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
