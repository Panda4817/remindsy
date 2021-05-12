import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colours from "../../constants/Colours";

import Card from "../UI/Card";

const EventItem = (props: any) => {
	let TouchableCmp: any;

	if (Platform.OS === "android" && Platform.Version >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	} else {
		TouchableCmp = TouchableOpacity;
	}

	return (
		<Card style={styles.event}>
			<View style={styles.touchable}>
				<TouchableCmp
					onPress={props.onSelect}
					useForeground
				>
					<View style={styles.detailsContainer}>
						<View>
							<FontAwesome
								name={props.icon}
								size={28}
								color={colours.yellow}
							/>
						</View>
						<View style={styles.textContainer}>
							<Text style={styles.date}>{props.date}</Text>
							<Text style={styles.names}>
								{props.names}
							</Text>
							{props.years ? (
								<Text style={styles.years}>
									{props.years}
								</Text>
							) : null}
						</View>
					</View>
				</TouchableCmp>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	event: {
		margin: 10,
		backgroundColor: colours.darkPink,
	},
	touchable: {
		borderRadius: 10,
		overflow: "hidden",
	},
	detailsContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		margin: 10,
	},
	textContainer: {
		marginHorizontal: 30,
	},
	date: {
		fontFamily: "open-sans",
		fontSize: 20,
		color: "white",
	},
	names: {
		fontFamily: "open-sans-bold",
		fontSize: 20,
		color: "white",
	},
	years: {
		fontFamily: "open-sans",
		fontSize: 15,
		color: colours.lightPink,
	},
});

export default EventItem;
