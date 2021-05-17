import React from "react";
import AppNavigator from "../../navigation/AppNavigator";
import renderer from "react-test-renderer";
import { CalendarNavigator } from "../../navigation/CalendarNavigator";
import { createStackNavigator } from "@react-navigation/stack";

it(`renders calendar navigator`, () => {
	const tree = renderer.create(<AppNavigator />);
	expect(
		tree.root.findAllByType(CalendarNavigator)
	).toBeTruthy();
});

it(`returns stack navigator`, () => {
	const res = CalendarNavigator();
	expect(res).toBeTruthy();
	expect(res.type).toBe(createStackNavigator().Navigator);
});
