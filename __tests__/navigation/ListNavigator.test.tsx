import React from "react";
import AppNavigator from "../../navigation/AppNavigator";
import renderer from "react-test-renderer";
import { ListNavigator } from "../../navigation/ListNavigator";
import { createStackNavigator } from "@react-navigation/stack";

it(`renders list navigator`, () => {
	const tree = renderer.create(<AppNavigator />);
	expect(
		tree.root.findAllByType(ListNavigator)
	).toBeTruthy();
});

it(`returns stack navigator`, () => {
	const res = ListNavigator();
	expect(res).toBeTruthy();
	expect(res.type).toBe(createStackNavigator().Navigator);
});
