import React from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
} from "react-native";
import CustomText from "./CustomText";

const Input = (props: any) => {
	return (
		<View style={styles.formControl}>
			<CustomText style={styles.label}>
				{props.label}
			</CustomText>
			<TextInput {...props} />
			{props.error && props.touched ? (
				<View style={styles.errorContainer}>
					<CustomText style={styles.errorText}>
						{props.error}
					</CustomText>
				</View>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	formControl: {
		width: "100%",
		marginVertical: 5,
		padding: 5,
		borderColor: "#ccc",
		borderRadius: 10,
		borderWidth: 1,
	},
	label: {
		marginVertical: 8,
	},
	errorContainer: {
		marginVertical: 5,
	},
	errorText: {
		color: "red",
		fontSize: 13,
	},
});

export default Input;
