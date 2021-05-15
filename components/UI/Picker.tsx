import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import colours from "../../constants/Colours";
import CustomText from "./CustomText";
import { regular } from "../../constants/Fonts";
const CustomPicker = (props: any) => {
	return (
		<View style={styles.formControl}>
			<CustomText>{props.label}</CustomText>
			<Picker
				selectedValue={props.value}
				onValueChange={props.onValueChangeHandler}
				testID={props.testID}
			>
				{props.items.map((obj: any, index: number) => {
					return (
						<Picker.Item
							label={obj.label}
							value={obj.value}
							fontFamily={regular}
							key={index}
						/>
					);
				})}
			</Picker>
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
	errorContainer: {
		marginVertical: 5,
	},
	errorText: {
		color: "red",
		fontSize: 13,
	},
});

export default CustomPicker;
