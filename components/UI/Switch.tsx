import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Switch,
} from "react-native";
import colours from "../../constants/Colours";

const CustomSwitch = (props: any) => {
	const [isEnabled, setIsEnabled] = useState(
		props.value == 1 ? true : false
	);
	return (
		<View style={styles.formControl}>
			{props.extraLabel ? (
				<Text style={styles.label}>{props.extraLabel}</Text>
			) : null}
			<View style={styles.rowContainer}>
				<Text style={styles.label}>{props.label}</Text>
				<Switch
					trackColor={{
						false: "#767577",
						true: colours.lightPink,
					}}
					thumbColor={
						props.value ? colours.darkPink : "#f4f3f4"
					}
					onValueChange={props.onValueChangeHandler}
					value={isEnabled}
				/>
			</View>

			{props.error && props.touched ? (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>
						{props.error}
					</Text>
				</View>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	formControl: {
		width: "100%",
		marginVertical: 5,
	},
	rowContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	label: {
		fontFamily: "open-sans",
	},
	errorContainer: {
		marginVertical: 5,
	},
	errorText: {
		fontFamily: "open-sans",
		color: "red",
		fontSize: 13,
	},
});

export default CustomSwitch;
