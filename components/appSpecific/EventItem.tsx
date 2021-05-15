import React from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colours from "../../constants/Colours";
import Card from "../UI/Card";
import CustomText from "../UI/CustomText";
import { bold } from "../../constants/Fonts";

const EventItem = (props: any) => {
	let TouchableCmp: any;

	if (Platform.OS === "android" && Platform.Version >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	} else {
		TouchableCmp = TouchableOpacity;
	}

	return (
		<Card style={styles.event}>
			<TouchableCmp onPress={props.onSelect} useForeground>
				<View style={styles.touchable}>
					<View style={styles.detailsContainer}>
						<View>
							<FontAwesome
								name={props.icon}
								size={28}
								color={colours.yellow}
							/>
						</View>
						<View style={styles.textContainer}>
							<CustomText style={styles.date}>
								{props.date}
							</CustomText>
							<CustomText style={styles.names}>
								{props.names}
							</CustomText>
							{props.years ? (
								<CustomText style={styles.years}>
									{props.years}
								</CustomText>
							) : null}
						</View>
					</View>
				</View>
			</TouchableCmp>
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
		fontSize: 20,
		color: "white",
	},
	names: {
		fontFamily: bold,
		fontSize: 20,
		color: "white",
	},
	years: {
		fontSize: 15,
		color: colours.lightPink,
	},
});

export default EventItem;
