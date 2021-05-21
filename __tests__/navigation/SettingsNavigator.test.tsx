import React from "react";
import AppNavigator from "../../navigation/AppNavigator";
import renderer from "react-test-renderer";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsNavigator } from "../../navigation/SettingsNavigator";

it(`returns stack navigator`, () => {
	const res = SettingsNavigator();
	expect(res).toBeTruthy();
	expect(res.type).toBe(createStackNavigator().Navigator);
});
