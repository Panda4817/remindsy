import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SettingsScreen from "../screens/SettingsScreen";
import { screenOptions as SettingsOptions } from "../screens/SettingsScreen";

import { defaultNavOptions } from "./NavOptions";

const SettingsStackNavigator = createStackNavigator();

export const SettingsNavigator = () => {
	return (
		<SettingsStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<SettingsStackNavigator.Screen
				name="SettingsScreen"
				component={SettingsScreen}
				options={SettingsOptions}
			/>
		</SettingsStackNavigator.Navigator>
	);
};
