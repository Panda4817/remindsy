import React from "react";
import { useEffect, useState, useCallback } from "react";
import { View, FlatList, Button, ActivityIndicator, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import CustomHeaderButton from "../components/UI/HeaderButton";
import CustomButton from "../components/UI/CustomButton";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as actions from "../store/actions";
import colours from "../constants/Colours";
import EventItem from "../components/appSpecific/EventItem";
import Event from "../models/eventClass";
import {
	compare,
	handleOutputDate,
	handleOutputNames,
	handleOutputTypeIcon,
	handleOutputYears,
	leapYear,
} from "../helpers/formatting";
import CustomText from "../components/UI/CustomText";

export const getParams = (route: any) => {
	let paramsObj = {};
	if (route.params && Object.keys(route.params).length !== 0) {
		const filterDay = route.params.filterDay;
		const filterMonth = route.params.filterMonth;
		paramsObj = {
			filterDay: filterDay,
			filterMonth: filterMonth,
		};
	}
	return paramsObj;
};

const ListScreen = (props: any) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [isRefreshing, setIsRefreshing] = React.useState(false);
	const [error, setError] = React.useState("");

	let events = useSelector((state: any) => state.events.events).sort(compare);

	if (props.route.params) {
		const filterDay = props.route.params.filterDay;
		const filterMonth = props.route.params.filterMonth;
		if (filterDay && filterMonth) {
			events = events.filter((item: Event) => {
				if (filterDay == 28 && filterMonth == 2 && !leapYear(props.route.params.filterYear)) {
					return (item.day == filterDay || item.day == 29) && item.month == filterMonth - 1;
				} else {
					return item.day == filterDay && item.month == filterMonth - 1;
				}
			});
		}
	}

	const dispatch = useDispatch();

	const loadEvents = useCallback(async () => {
		setError("");
		setIsRefreshing(true);
		try {
			await dispatch(actions.loadEvents());
		} catch (err: any) {
			setError(err.message);
		}
		setIsRefreshing(false);
	}, [dispatch, setIsLoading, setError]);

	useEffect(() => {
		const unsubscribe = props.navigation.addListener("focus", loadEvents);

		return () => {
			unsubscribe();
		};
	}, [loadEvents]);

	useEffect(() => {
		setIsLoading(true);
		loadEvents().then(() => {
			setIsLoading(false);
		});
	}, [dispatch, loadEvents]);

	const selectEventHandler = (id: string) => {
		props.navigation.navigate("Event", {
			eventId: id,
		});
	};

	useEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						IconComponent={FontAwesome5}
						title="Add Event"
						iconName="calendar-plus"
						onPress={() => {
							props.navigation.navigate("AddEdit", getParams(props.route));
						}}
						testID="ListToAddEdit"
					></Item>
				</HeaderButtons>
			),
		});
	}, [props.route.params]);

	if (error) {
		return (
			<View style={styles.centered} testID="errorView">
				<CustomText>An error occurred!</CustomText>
				<Button title="Try again" onPress={loadEvents} color={colours.darkPink} />
			</View>
		);
	}
	if (isLoading) {
		return (
			<View style={styles.centered} testID="loadingView">
				<ActivityIndicator size="large" color={colours.darkPink} />
			</View>
		);
	}
	if (!isLoading && events.length === 0) {
		return (
			<View style={styles.centered} testID="noResultsView">
				<CustomText style={styles.text}>No Remindsy reminders found.</CustomText>
				<View style={styles.buttonContainer}>
					<CustomButton
						onPress={() => {
							props.navigation.navigate("AddEdit", getParams(props.route));
						}}
						testID="ListToAddEditCustomButton"
					>
						<FontAwesome5 name="calendar-plus" size={18} color="white" />
						<CustomText style={{ ...styles.text, color: "white" }}>Add a Remindsy</CustomText>
					</CustomButton>
				</View>
				<CustomText style={styles.textSmall}>
					Or tap on <Ionicons name="settings" size={18} color="black" /> to import events.
				</CustomText>
			</View>
		);
	}
	return (
		<>
			<FlatList
				onRefresh={loadEvents}
				refreshing={isRefreshing}
				data={events}
				keyExtractor={(item) => item.id}
				renderItem={(itemData) => (
					<EventItem
						names={handleOutputNames(itemData.item)}
						date={handleOutputDate(itemData.item)}
						years={handleOutputYears(itemData.item)}
						icon={handleOutputTypeIcon(itemData.item)}
						onSelect={() => {
							selectEventHandler(itemData.item.id);
						}}
						testID={`ListToEvent${itemData.item.id}`}
					/>
				)}
				testID="resultsView"
			/>
		</>
	);
};

export const screenOptions = (navData: any) => {
	let title = "Latest Remindsy";
	if (navData.route.params) {
		const filterDay = navData.route.params.filterDay;
		const filterMonth = navData.route.params.filterMonth;
		const filterYear = navData.route.params.filterYear;
		if (filterDay && filterMonth) {
			let date = new Date(filterYear, filterMonth - 1, filterDay);
			title = `${date.toDateString()}`;
		}
	}
	return {
		headerTitle: title,
	};
};

export default ListScreen;

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 10,
	},
	buttonContainer: {
		width: "70%",
		marginBottom: 10,
	},
	text: {
		textAlign: "center",
		fontSize: 18,
		marginVertical: 10,
	},
	textSmall: {
		textAlign: "center",
		fontSize: 15,
		margin: 20,
	},
});
