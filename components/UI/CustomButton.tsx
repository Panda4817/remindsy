import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableNativeFeedback,
	TouchableOpacity,
	Platform,
} from "react-native";
import colours from "../../constants/Colours";
import Card from "./Card";

const CustomButton = (props: any) => {
	let TouchableCmp: any;

	if (Platform.OS === "android" && Platform.Version >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	} else {
		TouchableCmp = TouchableOpacity;
	}
	return (
		<Card style={{ ...styles.card, ...props.style }}>
			<TouchableCmp onPress={props.onPress} useForeground>
				<View style={styles.touchable}>
					{props.children}
				</View>
			</TouchableCmp>
		</Card>
	);
};

export default CustomButton;

const styles = StyleSheet.create({
	card: {
		margin: 10,
		backgroundColor: colours.darkPink,
	},
	touchable: {
		borderRadius: 10,
		overflow: "hidden",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
});
