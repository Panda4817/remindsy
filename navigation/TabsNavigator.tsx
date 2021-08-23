import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ListNavigator } from "./ListNavigator";
import { CalendarNavigator } from "./CalendarNavigator";
import { SettingsNavigator } from "./SettingsNavigator";

import colours from "../constants/Colours";

const Tabs = createMaterialBottomTabNavigator();

export const TabsNavigator = () => {
	return (
		<Tabs.Navigator shifting={true}>
			<Tabs.Screen
				name="Upcoming"
				component={ListNavigator}
				options={{
					tabBarIcon: (tabInfo: any) => {
						return <FontAwesome5 name="list" size={20} color={tabInfo.color} />;
					},
					tabBarColor: colours.darkBlue,
				}}
			/>
			<Tabs.Screen
				name="All"
				component={CalendarNavigator}
				options={{
					tabBarIcon: (tabInfo: any) => {
						return <FontAwesome5 name="calendar-alt" size={20} color={tabInfo.color} />;
					},
					tabBarColor: colours.darkPink,
				}}
			/>
			<Tabs.Screen
				name="Settings"
				component={SettingsNavigator}
				options={{
					tabBarIcon: (tabInfo: any) => {
						return <Ionicons name="settings" size={20} color={tabInfo.color} />;
					},
					tabBarColor: colours.darkBlue,
				}}
			/>
		</Tabs.Navigator>
	);
};
