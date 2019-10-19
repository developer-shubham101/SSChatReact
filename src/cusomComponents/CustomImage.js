import React, { Component } from 'react';
import {
	StyleSheet,
	Image
} from 'react-native';

import firebase from 'react-native-firebase'
export default class CustomImage extends React.Component {
	// static propTypes = {
	// 	src: PropTypes.style,

	//   }
	currentUser = firebase.auth().currentUser;
	constructor(props) {
		super(props);
		this.state = { src: "https://bootdey.com/img/Content/avatar/avatar6.png" }
	}
	componentDidMount() {
		// Create a reference with an initial file path and name
		var storage = firebase.storage().ref();
		var pathReference = storage.child(this.props.src);

		// Get the download URL
		pathReference.getDownloadURL().then((url) => {
			console.log("Finished Download")
			console.log(url)
			this.setState({ src: url })
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
	render() {
		var { iconStyle } = this.props;
		return (
			<Image source={{ uri: this.state.src }} style={[styles.pic, iconStyle]} />
		)
	}
}
const styles = StyleSheet.create({

	pic: {
		borderRadius: 30,
		width: 60,
		height: 60,
	},

});
