import React from "react";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import {
	HeaderButtons,
	Item,
} from "react-navigation-header-buttons";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomHeaderButton from "../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import Event from "../models/eventClass";
import Card from "../components/UI/Card";
import colours from "../constants/Colours";
import {
	handleCardOrPresOutput,
	handleNoticeOutput,
	handleOutputDate,
	handleOutputNames,
	handleOutputTypeIcon,
	handleOutputYears,
} from "../helpers/formatting";
import * as actions from "../store/actions";
import CustomButton from "../components/UI/CustomButton";
import CustomText from "../components/UI/CustomText";
import { bold } from "../constants/Fonts";

const EventScreen = (props: any) => {
	const [error, setError] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const { navigation, route } = props;
	const eventId = route.params.eventId;
	const selectedEvent = useSelector((state: any) =>
		state.events.events.find(
			(event: Event) => event.id === eventId
		)
	);

	const dispatch = useDispatch();

	const deleteSubmit = async () => {
		setError("");
		setIsLoading(true);
		try {
			dispatch(actions.delEvent(parseInt(eventId)));
			navigation.goBack();
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	};

	const deleteHandler = () => {
		Alert.alert(
			"Are you sure?",
			"Do you really want to delete this Remindsy?",
			[
				{
					text: "Yes",
					style: "destructive",
					onPress: deleteSubmit,
				},
				{ text: "No", style: "default" },
			]
		);
	};

	useEffect(() => {
		let type = selectedEvent ? selectedEvent.type : "";
		if (type == "Wedding Anniversary") {
			type = "Anniversary";
		}
		let icon = selectedEvent
			? handleOutputTypeIcon(selectedEvent)
			: "";
		props.navigation.setOptions({
			headerTitle: () => (
				<View style={styles.headerContainer}>
					<FontAwesome5
						name={icon}
						size={24}
						color={colours.yellow}
					/>
					<CustomText style={styles.header}>
						{type}
					</CustomText>
				</View>
			),
			headerRight: () => (
				<View style={styles.iconsContainer}>
					<HeaderButtons
						HeaderButtonComponent={CustomHeaderButton}
					>
						<Item
							IconComponent={FontAwesome5}
							title="Edit Event"
							iconName="edit"
							onPress={() => {
								props.navigation.navigate("AddEdit", {
									id: selectedEvent.id,
								});
							}}
							testID="EventToAddEdit"
						></Item>
					</HeaderButtons>
					<HeaderButtons
						HeaderButtonComponent={CustomHeaderButton}
					>
						<Item
							IconComponent={FontAwesome5}
							title="Delete"
							iconName="trash-alt"
							onPress={deleteHandler}
							testID="DeleteEventToList"
						></Item>
					</HeaderButtons>
				</View>
			),
		});
	}, [selectedEvent]);

	useEffect(() => {
		if (error) {
			Alert.alert("An error occurred!", error, [
				{ text: "Okay" },
			]);
		}
	}, [error]);

	if (isLoading || !selectedEvent) {
		return (
			<View style={styles.centered} testID="noDataYetView">
				<ActivityIndicator
					size="large"
					color={colours.darkPink}
				/>
			</View>
		);
	}
	return (
		<ScrollView
			style={styles.outerContainer}
			testID="dataView"
		>
			<Card style={styles.sharedContainer}>
				<View style={styles.dateContainer}>
					<CustomText style={styles.date}>
						{handleOutputDate(selectedEvent)}
					</CustomText>
					{selectedEvent.day == 29 &&
					selectedEvent.month == 1 ? (
						<CustomText style={styles.details}>
							(Leap day)
						</CustomText>
					) : null}
				</View>
				<View style={styles.namesContainer}>
					<CustomText style={styles.names}>
						{handleOutputNames(selectedEvent)}
					</CustomText>
				</View>
				{selectedEvent.startYear !== 0 ? (
					<View style={styles.yearsContainer}>
						<CustomText style={styles.years}>
							{handleOutputYears(selectedEvent)}
						</CustomText>
					</View>
				) : null}
				<View style={styles.detailsContainer}>
					<CustomText style={styles.details}>
						{handleCardOrPresOutput(selectedEvent)}
					</CustomText>

					{selectedEvent.present &&
					selectedEvent.ideas !==
						"No present ideas provided" ? (
						<CustomText style={styles.details}>
							{selectedEvent.ideas}
						</CustomText>
					) : null}
					{selectedEvent.address !==
					"No address provided" ? (
						<CustomText style={styles.details}>
							{selectedEvent.address}
						</CustomText>
					) : null}
					{selectedEvent.pushNotification ? (
						<CustomText style={styles.details}>
							{handleNoticeOutput(selectedEvent)}
						</CustomText>
					) : null}
				</View>
			</Card>
			<View style={styles.buttonContainer}>
				<View style={styles.buttonBox}>
					<CustomButton
						onPress={() => {
							props.navigation.navigate("AddEdit", {
								id: selectedEvent.id,
							});
						}}
						testID={`EventToAddEditToo${selectedEvent.id}`}
						style={{ backgroundColor: colours.lightBlue }}
					>
						<FontAwesome5
							name="edit"
							size={18}
							color="white"
						/>
						<CustomText
							style={{
								...styles.buttonText,
								color: "white",
							}}
						>
							Edit
						</CustomText>
					</CustomButton>
				</View>
				<View style={styles.buttonBox}>
					<CustomButton
						onPress={() => deleteHandler()}
						style={{ backgroundColor: colours.lightPink }}
						testID={`DeleteEventToListToo${selectedEvent.id}`}
					>
						<FontAwesome5
							name="trash-alt"
							size={18}
							color="white"
						/>
						<CustomText
							style={{
								...styles.buttonText,
								color: "white",
							}}
						>
							Delete
						</CustomText>
					</CustomButton>
				</View>
			</View>
		</ScrollView>
	);
};

export const screenOptions = {};

export default EventScreen;

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	iconsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		textAlignVertical: "center",
		fontSize: 24,
		color: colours.yellow,
		marginHorizontal: 10,
	},
	outerContainer: {
		overflow: "hidden",
		borderRadius: 10,
	},
	sharedContainer: {
		margin: 10,
	},
	dateContainer: {
		paddingVertical: 10,
		backgroundColor: colours.darkPink,
		width: "100%",
		overflow: "hidden",
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
	},
	date: {
		textAlign: "center",
		fontFamily: bold,
		color: "white",
		fontSize: 30,
	},
	namesContainer: {
		paddingVertical: 10,
		backgroundColor: colours.darkBlue,
		width: "100%",
		overflow: "hidden",
	},
	names: {
		textAlign: "center",
		fontFamily: bold,
		color: "white",
		fontSize: 30,
	},
	yearsContainer: {
		paddingVertical: 10,
		backgroundColor: colours.darkBlue,
		width: "100%",
		overflow: "hidden",
	},
	years: {
		textAlign: "center",
		color: colours.yellow,
		fontSize: 30,
	},
	detailsContainer: {
		paddingVertical: 10,
		backgroundColor: colours.darkPink,
		width: "100%",
		overflow: "hidden",
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
	},
	details: {
		textAlign: "center",
		color: colours.lightPink,
		fontSize: 24,
	},
	buttonContainer: {
		margin: 10,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	buttonBox: {
		width: "40%",
	},
	buttonText: {
		fontSize: 18,
		marginVertical: 10,
	},
});
