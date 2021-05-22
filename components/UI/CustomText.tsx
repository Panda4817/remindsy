import React from "react";
import { StyleSheet, Text } from "react-native";
import { regular } from "../../constants/Fonts";

const CustomText = (props: any) => {
	return (
		<Text
			style={{
				...styles.text,
				...props.style,
			}}
			testID={props.testID}
		>
			{props.children}
		</Text>
	);
};

export default CustomText;

const styles = StyleSheet.create({
	text: {
		fontFamily: regular,
	},
});
