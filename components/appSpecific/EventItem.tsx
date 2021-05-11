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
						<View style={styles.iconContainer}>
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
							<Text style={styles.year}>{props.year}</Text>
						</View>
					</View>
				</TouchableCmp>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	event: {
		height: 200,
		margin: 20,
	},
	touchable: {
		borderRadius: 10,
		overflow: "hidden",
	},
	detailsContainer: {},
	iconContainer: {},
	textContainer: {},
	date: {},
	names: {},
	year: {},
});

export default EventItem;
