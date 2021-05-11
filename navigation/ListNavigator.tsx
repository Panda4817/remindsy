import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ListScreen from "../screens/ListScreen";
import { screenOptions as ListOptions } from "../screens/ListScreen";
import AddEditScreen from "../screens/AddEditScreen";
import { screenOptions as AddEditOptions } from "../screens/AddEditScreen";
import EventScreen from "../screens/EventScreen";
import { screenOptions as EventOptions } from "../screens/EventScreen";

import { defaultNavOptions } from "./NavOptions";

const ListStackNavigator = createStackNavigator();

export const ListNavigator = () => {
	return (
		<ListStackNavigator.Navigator
			screenOptions={defaultNavOptions}
		>
			<ListStackNavigator.Screen
				name="List"
				component={ListScreen}
				options={ListOptions}
			/>
			<ListStackNavigator.Screen
				name="Event"
				component={EventScreen}
				options={EventOptions}
			/>
			<ListStackNavigator.Screen
				name="AddEdit"
				component={AddEditScreen}
				options={AddEditOptions}
			/>
		</ListStackNavigator.Navigator>
	);
};
