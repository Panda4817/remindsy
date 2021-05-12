import React from "react";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Button,
} from "react-native";
import {
	HeaderButtons,
	Item,
} from "react-navigation-header-buttons";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
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
} from "../helpers/format";
import * as actions from "../store/actions";

const EventScreen = (props: any) => {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const eventId = props.route.params.eventId;
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
			await dispatch(actions.delEvent(eventId));
			props.navigation.goBack();
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	};

	const deleteHandler = () => {
		Alert.alert(
			"Are you sure?",
			"Do you really want to delete this item?",
			[
				{ text: "No", style: "default" },
				{
					text: "Yes",
					style: "destructive",
					onPress: deleteSubmit,
				},
			]
		);
	};

	useEffect(() => {
		let type = selectedEvent.type;
		if (type == "Wedding Anniversary") {
			type = "Anniversary";
		}
		let icon = handleOutputTypeIcon(selectedEvent);
		props.navigation.setOptions({
			headerTitle: () => (
				<View style={styles.headerContainer}>
					<FontAwesome5
						name={icon}
						size={24}
						color={colours.yellow}
					/>
					<Text style={styles.header}>{type}</Text>
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
						></Item>
					</HeaderButtons>
				</View>
			),
		});
	});

	useEffect(() => {
		if (error) {
			Alert.alert("An error occurred!", error, [
				{ text: "Okay" },
			]);
		}
	}, [error]);

	if (isLoading || !selectedEvent) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator
					size="large"
					color={colours.darkPink}
				/>
			</View>
		);
	}
	return (
		<ScrollView style={styles.outerContainer}>
			<Card style={styles.sharedContainer}>
				<View style={styles.dateContainer}>
					<Text style={styles.date}>
						{handleOutputDate(selectedEvent)}
					</Text>
				</View>
				<View style={styles.namesContainer}>
					<Text style={styles.names}>
						{handleOutputNames(selectedEvent)}
					</Text>
				</View>
				{selectedEvent.startYear !== 0 ? (
					<View style={styles.yearsContainer}>
						<Text style={styles.years}>
							{handleOutputYears(selectedEvent)}
						</Text>
					</View>
				) : null}
				<View style={styles.detailsContainer}>
					<Text style={styles.details}>
						{handleCardOrPresOutput(selectedEvent)}
					</Text>

					{selectedEvent.present &&
					selectedEvent.ideas !==
						"No present ideas provided" ? (
						<Text style={styles.details}>
							{selectedEvent.ideas}
						</Text>
					) : null}
					{selectedEvent.address !==
					"No address provided" ? (
						<Text style={styles.details}>
							{selectedEvent.address}
						</Text>
					) : null}
					{selectedEvent.pushNotification ? (
						<Text style={styles.details}>
							{handleNoticeOutput(selectedEvent)}
						</Text>
					) : null}
				</View>
			</Card>
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
		fontFamily: "open-sans",
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
		fontFamily: "open-sans-bold",
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
		fontFamily: "open-sans-bold",
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
		fontFamily: "open-sans",
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
		fontFamily: "open-sans",
		color: colours.lightPink,
		fontSize: 24,
	},
});
