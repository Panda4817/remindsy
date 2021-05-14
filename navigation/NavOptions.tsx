import { StackNavigationOptions } from "@react-navigation/stack";
import colours from "../constants/Colours";
import { regular } from "../constants/Fonts";

export const defaultNavOptions = {
	headerStyle: {
		backgroundColor: colours.darkBlue,
		height: 80,
	},
	headerTitleStyle: {
		fontFamily: regular,
		fontSize: 24,
	},
	headerBackTitleStyle: {
		fontFamily: regular,
	},
	headerTintColor: colours.yellow,
	headerTitleAlign: "center",
	headerBackTitle: "",
} as StackNavigationOptions;
