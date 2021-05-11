import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import colours from "../../constants/Colours";
const CustomPicker = (props: any) => {
	return (
		<View style={styles.formControl}>
			<Text style={styles.label}>{props.label}</Text>
			<Picker
				selectedValue={props.value}
				onValueChange={props.onValueChangeHandler}
			>
				{props.items.map((obj: any, index: number) => {
					return (
						<Picker.Item
							label={obj.label}
							value={obj.value}
							fontFamily="open-sans"
							key={index}
						/>
					);
				})}
			</Picker>
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
	picker: {
		backgroundColor: colours.lightBlue,
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

export default CustomPicker;
