import React from "react";
import { useEffect, useState } from "react";
import {
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	HeaderButtons,
	Item,
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import CustomHeaderButton from "../components/UI/HeaderButton";
import Calendar from "../components/appSpecific/Calendar";
import colours from "../constants/Colours";
import { useSelector } from "react-redux";
import {
	compare,
	convertToNextDate,
} from "../helpers/format";
import Event from "../models/eventClass";

const CalendarScreen = (props: any) => {
	const maxPastMonths = 0;
	const maxFutureMonths = 12;
	const today = new Date();
	const birthday = {
		key: "birthday",
		color: colours.darkBlue,
	};
	const anniversary = {
		key: "anniversary",
		color: colours.darkPink,
	};
	const other = { key: "other", color: colours.yellow };

	let events = useSelector(
		(state: any) => state.events.events
	).sort(compare);
	const markedDates: any = {};
	events.map((item: Event) => {
		let dateString = convertToNextDate(item.day, item.month)
			.toISOString()
			.split("T")[0];
		if (!markedDates.hasOwnProperty(dateString)) {
			markedDates[dateString] = { dots: [] };
		}
		switch (item.type) {
			case "Birthday":
				markedDates[dateString].dots.push(birthday);
			case "Wedding Anniversary":
				markedDates[dateString].dots.push(anniversary);
			default:
				markedDates[dateString].dots.push(other);
		}
	});

	useEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<HeaderButtons
					HeaderButtonComponent={CustomHeaderButton}
				>
					<Item
						IconComponent={Ionicons}
						title="Add Event"
						iconName={
							Platform.OS === "android"
								? "md-add"
								: "ios-add"
						}
						onPress={() => {
							props.navigation.navigate("AddEdit");
						}}
					></Item>
				</HeaderButtons>
			),
		});
	});
	return (
		<SafeAreaView>
			<Calendar
				navigation={props.navigation}
				today={today.toISOString().split("T")[0]}
				maxPastMonths={maxPastMonths}
				maxFutureMonths={maxFutureMonths}
				markedDates={markedDates}
			/>
		</SafeAreaView>
	);
};

export const screenOptions = {
	headerTitle: "All Remindsys",
};

export default CalendarScreen;

const styles = StyleSheet.create({});
