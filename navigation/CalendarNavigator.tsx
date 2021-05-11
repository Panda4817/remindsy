import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CalendarScreen from "../screens/CalendarScreen";
import { screenOptions as CalendarOptions } from "../screens/CalendarScreen";
import AddEditScreen from "../screens/AddEditScreen";
import { screenOptions as AddEditOptions } from "../screens/AddEditScreen";
import ListScreen from "../screens/ListScreen";
import { screenOptions as ListOptions } from "../screens/ListScreen";

import { defaultNavOptions } from "./NavOptions";
import EventScreen from "../screens/EventScreen";
import { screenOptions as EventOptions } from "../screens/EventScreen";

const CalendarStackNavigator = createStackNavigator();

export const CalendarNavigator = () => {
	return (
		<CalendarStackNavigator.Navigator
			screenOptions={defaultNavOptions}
		>
			<CalendarStackNavigator.Screen
				name="Calendar"
				component={CalendarScreen}
				options={CalendarOptions}
			/>
			<CalendarStackNavigator.Screen
				name="List"
				component={ListScreen}
				options={ListOptions}
			/>
			<CalendarStackNavigator.Screen
				name="Event"
				component={EventScreen}
				options={EventOptions}
			/>
			<CalendarStackNavigator.Screen
				name="AddEdit"
				component={AddEditScreen}
				options={AddEditOptions}
			/>
		</CalendarStackNavigator.Navigator>
	);
};
