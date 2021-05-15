import React, { useState, useEffect } from "react";
import { View, StyleSheet, Switch } from "react-native";
import colours from "../../constants/Colours";
import CustomText from "./CustomText";

const CustomSwitch = (props: any) => {
	return (
		<View style={styles.formControl}>
			{props.extraLabel ? (
				<CustomText>{props.extraLabel}</CustomText>
			) : null}
			<View style={styles.rowContainer}>
				<CustomText>{props.label}</CustomText>
				<Switch
					trackColor={{
						false: "#767577",
						true: colours.lightPink,
					}}
					thumbColor={
						props.value ? colours.darkPink : "#f4f3f4"
					}
					onValueChange={props.onValueChangeHandler}
					value={
						props.value == 1 || props.value == true
							? true
							: false
					}
					testID={props.testID}
				/>
			</View>

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
	rowContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	errorContainer: {
		marginVertical: 5,
	},
	errorText: {
		color: "red",
		fontSize: 13,
	},
});

export default CustomSwitch;
