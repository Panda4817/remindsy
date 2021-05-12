import { StackNavigationOptions } from "@react-navigation/stack";
import colours from "../constants/Colours";

export const defaultNavOptions = {
	headerStyle: {
		backgroundColor: colours.darkBlue,
		height: 80,
	},
	headerTitleStyle: {
		fontFamily: "open-sans",
		fontSize: 24,
	},
	headerBackTitleStyle: {
		fontFamily: "open-sans",
	},
	headerTintColor: colours.yellow,
	headerTitleAlign: "center",
	headerBackTitle: "",
} as StackNavigationOptions;
