import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableHighlight,
	Image,
	Alert,
	Dimensions
} from "react-native";

export default class Examples extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "shubham@gmail.com",
			password: "123456",
			name: "Shubham"
		};
	}

	componentDidMount() { }

	onClickListener = viewId => {
		if (viewId == "register") {
		} else if (viewId === "login") {
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
						keyboardType="email-address"
						underlineColorAndroid="transparent"
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
						underlineColorAndroid="transparent"
						onChangeText={name => this.setState({ name })}
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
						placeholder="Password"
						secureTextEntry={true}
						underlineColorAndroid="transparent"
						onChangeText={password => this.setState({ password })}
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
						placeholder="Password"
						secureTextEntry={true}
						underlineColorAndroid="transparent"
						onChangeText={password => this.setState({ password })}
					/>
				</View>

				<TouchableHighlight
					style={[styles.buttonContainer, styles.loginButton]}
					onPress={() => this.onClickListener("login")}
				>
					<Text style={styles.loginText}>Login</Text>
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

		alignItems: "center",
		backgroundColor: "#DCDCDC"
	},
	inputContainer: {
		borderBottomColor: "#F5FCFF",
		backgroundColor: "#FFFFFF",
		borderRadius: 30,
		borderBottomWidth: 1,
		width: "90%",
		height: 45,
		marginBottom: 20,
		flexDirection: "row",
		alignItems: "center"
	},
	inputs: {
		height: 45,
		marginLeft: 16,
		borderBottomColor: "#FFFFFF",
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
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		width: "90%",
		borderRadius: 30
	},
	loginButton: {
		backgroundColor: "#00b5ec"
	},
	loginText: {
		color: "white"
	}
});
