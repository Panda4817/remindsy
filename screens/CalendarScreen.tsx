import React from "react";
import { useEffect } from "react";
import { CalendarList } from "react-native-calendars";
import { SafeAreaView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomHeaderButton from "../components/UI/HeaderButton";
import colours from "../constants/Colours";
import { useSelector } from "react-redux";
import { convertToNextDate } from "../helpers/formatting";
import Event from "../models/eventClass";

export const getDateString = (item: Event) => {
	let date = convertToNextDate(item.day, item.month, item.startYear);
	let month =
		(date.getMonth() + 1).toString().length == 1
			? "0" + (date.getMonth() + 1).toString()
			: (date.getMonth() + 1).toString();
	let day =
		date.getDate().toString().length == 1
			? "0" + date.getDate().toString()
			: date.getDate().toString();
	let dateString = `${date.getFullYear()}-${month}-${day}`;
	return dateString;
};

export const createMarkedDates = (events: Event[]) => {
	const birthday = {
		key: "birthday",
		color: colours.darkBlue,
	};
	const anniversary = {
		key: "anniversary",
		color: colours.darkPink,
	};
	const other = { key: "other", color: colours.yellow };
	const markedDates: any = {};
	events.map((item: Event) => {
		const dateString = getDateString(item);
		if (!markedDates.hasOwnProperty(dateString)) {
			markedDates[dateString] = {
				dots: Array(),
			};
		}
		switch (item.type) {
			case "Birthday":
				if (markedDates[dateString].dots.indexOf(birthday) < 0) {
					markedDates[dateString].dots.push(birthday);
				}

				return;
			case "Wedding Anniversary":
				if (markedDates[dateString].dots.indexOf(anniversary) < 0) {
					markedDates[dateString].dots.push(anniversary);
				}
				return;
			default:
				if (markedDates[dateString].dots.indexOf(other) < 0) {
					markedDates[dateString].dots.push(other);
				}
				return;
		}
	});
	return markedDates;
};

const CalendarScreen = (props: any) => {
	const maxPastMonths = 0;
	const maxFutureMonths = 12;
	const today = new Date().toISOString().split("T")[0];

	const events = useSelector((state: any) => state.events.events);

	const markedDates = createMarkedDates(events);

	useEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						IconComponent={FontAwesome5}
						title="Add Event"
						iconName="calendar-plus"
						onPress={() => {
							props.navigation.navigate("AddEdit", {});
						}}
						testID="calendarToAddEdit"
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
	headerTitle: "Remindsy Calendar",
};

export default CalendarScreen;
