import React from "react";
import { CalendarList } from "react-native-calendars";

const Calendar = (props: any) => {
	return (
		<CalendarList
			onDayPress={(date) => {
				props.navigation.navigate("List", {
					filterDay: date.day,
					filterMonth: date.month,
					filterYear: date.year,
				});
			}}
			current={props.today}
			minDate={props.today}
			pastScrollRange={props.maxPastMonths}
			futureScrollRange={props.maxFutureMonths}
			markedDates={props.markedDates}
		/>
	);
};

export default Calendar;
