import React from "react";
import { useEffect } from "react";
import { CalendarList } from "react-native-calendars";
import {
	Platform,
	SafeAreaView,
	StyleSheet,
} from "react-native";
import {
	HeaderButtons,
	Item,
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import CustomHeaderButton from "../components/UI/HeaderButton";
import colours from "../constants/Colours";
import { useSelector } from "react-redux";
import { convertToNextDate } from "../helpers/format";
import Event from "../models/eventClass";

const CalendarScreen = (props: any) => {
	const maxPastMonths = 0;
	const maxFutureMonths = 12;
	const today = new Date().toISOString().split("T")[0];
	const birthday = {
		key: "birthday",
		color: colours.darkBlue,
	};
	const anniversary = {
		key: "anniversary",
		color: colours.darkPink,
	};
	const other = { key: "other", color: colours.yellow };

	const events = useSelector(
		(state: any) => state.events.events
	);
	const markedDates: any = {};
	events.map((item: Event) => {
		let date = convertToNextDate(item.day, item.month);
		let month =
			(date.getMonth() + 1).toString().length == 1
				? "0" + (date.getMonth() + 1).toString()
				: (date.getMonth() + 1).toString();
		let day =
			date.getDate().toString().length == 1
				? "0" + date.getDate().toString()
				: date.getDate().toString();
		let dateString = `${date.getFullYear()}-${month}-${day}`;
		if (!markedDates.hasOwnProperty(dateString)) {
			markedDates[dateString] = {
				dots: Array(),
			};
		}
		switch (item.type) {
			case "Birthday":
				markedDates[dateString].dots.push(birthday);
				return;
			case "Wedding Anniversary":
				markedDates[dateString].dots.push(anniversary);
				return;
			default:
				markedDates[dateString].dots.push(other);
				return;
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
							props.navigation.navigate("AddEdit", {});
						}}
					></Item>
				</HeaderButtons>
			),
		});
	});
	return (
		<SafeAreaView>
			<CalendarList
				onDayPress={(date) => {
					props.navigation.navigate("List", {
						filterDay: date.day,
						filterMonth: date.month,
						filterYear: date.year,
					});
				}}
				current={today}
				minDate={today}
				pastScrollRange={maxPastMonths}
				futureScrollRange={maxFutureMonths}
				markedDates={markedDates}
				markingType={"multi-dot"}
			/>
		</SafeAreaView>
	);
};

export const screenOptions = {
	headerTitle: "All Remindsys",
};

export default CalendarScreen;

const styles = StyleSheet.create({});
