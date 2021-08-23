import React from "react";
import {
	Platform,
	StyleSheet,
	TouchableNativeFeedback,
	TouchableOpacity,
	View,
} from "react-native";
import colours from "../../constants/Colours";
import CustomText from "../UI/CustomText";
import Card from "../UI/Card";
import { bold } from "../../constants/Fonts";
import { convertToNextDate } from "../../helpers/formatting";
import { formatAddress } from "../../helpers/contacts";

const ResultItem = (props: any) => {
	let TouchableCmp: any;

	if (Platform.OS === "android" && Platform.Version >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	} else {
		TouchableCmp = TouchableOpacity;
	}
	return (
		<Card style={styles.event}>
			<TouchableCmp onPress={props.onSelect} useForeground testID={props.testID}>
				<View style={styles.touchable}>
					<View style={styles.detailsContainer}>
						<View style={styles.textContainer}>
							<CustomText style={styles.name}>{props.name}</CustomText>
							{props.date ? (
								<CustomText style={styles.detail}>
									{`Birthday: ${convertToNextDate(
										props.date.day,
										props.date.month,
										props.date.year
									).toDateString()}`}
								</CustomText>
							) : null}
							{props.address ? (
								<CustomText style={styles.detail}>{`Address: ${formatAddress(props.address)}`}</CustomText>
							) : null}
						</View>
					</View>
				</View>
			</TouchableCmp>
		</Card>
	);
};

export default ResultItem;

const styles = StyleSheet.create({
	event: {
		margin: 10,
		backgroundColor: colours.darkBlue,
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
	detail: {
		fontSize: 20,
		color: "white",
	},
	name: {
		fontFamily: bold,
		fontSize: 20,
		color: "white",
	},
});
