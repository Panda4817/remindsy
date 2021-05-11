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
} from "../helpers/format";

const EventScreen = (props: any) => {
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const eventId = props.route.params.eventId;
	const selectedEvent = useSelector((state: any) =>
		state.events.events.find(
			(event: Event) => event.id === eventId
		)
	);

	useEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
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
		<ScrollView>
			<Card>
				<Text style={styles.date}>
					{handleOutputDate(selectedEvent)}
				</Text>
				<Text style={styles.names}>
					{handleOutputNames(selectedEvent)}
				</Text>
				<Text style={styles.years}>
					{handleOutputYears(selectedEvent)}
				</Text>
				<Text style={styles.cardOrPres}>
					{handleCardOrPresOutput(selectedEvent)}
				</Text>
				<Text style={styles.address}>
					{selectedEvent.address}
				</Text>
				<Text style={styles.notice}>
					{handleNoticeOutput(selectedEvent)}
				</Text>
			</Card>
		</ScrollView>
	);
};

export const screenOptions = (navData: any) => {
	let type = navData.route.params.type;
	let icon = navData.route.params.icon;
	return {
		headerTitle: () => (
			<View>
				<FontAwesome5
					icon={icon}
					size={24}
					color={colours.yellow}
				/>
				<Text>{type}</Text>
			</View>
		),
	};
};

export default EventScreen;

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	date: {},
	names: {},
	years: {},
	cardOrPres: {},
	address: {},
	notice: {},
});
