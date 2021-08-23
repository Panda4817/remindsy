import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SettingsScreen = () => {
	// Merge with contacts
	// get events from calendar
	// get birthdays from facebook
	return (
		<View style={styles.centered}>
			<Text>More features to come</Text>
		</View>
	);
};

export const screenOptions = {
	headerTitle: "Settings",
};

export default SettingsScreen;

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 10,
	},
});
