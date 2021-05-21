import React from "react";
import AppNavigator from "../../navigation/AppNavigator";
import renderer from "react-test-renderer";
import { TabsNavigator } from "../../navigation/TabsNavigator";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

jest.mock("@expo/vector-icons/FontAwesome5", () => {
	const React = require("react");
	const Icon = (props: any) =>
		React.createElement("Icon", props);
	return Icon;
});
jest.mock("@expo/vector-icons/Ionicons", () => {
	const React = require("react");
	const Icon = (props: any) =>
		React.createElement("Icon", props);
	return Icon;
});

it(`returns tabs navigator`, () => {
	const res = TabsNavigator();
	expect(res).toBeTruthy();
	expect(res.type).toBe(
		createMaterialBottomTabNavigator().Navigator
	);
	expect(res.props.children[0].type).toBe(
		createMaterialBottomTabNavigator().Screen
	);

	let props = {
		color: "#ccc",
		name: "list",
		size: 20,
	};
	let actualIcon =
		res.props.children[0].props.options.tabBarIcon({
			color: "#ccc",
		});
	expect(props).toStrictEqual(actualIcon.props);

	props.name = "calendar-alt";
	actualIcon =
		res.props.children[1].props.options.tabBarIcon({
			color: "#ccc",
		});
	expect(props).toStrictEqual(actualIcon.props);

	props.name = "settings";
	actualIcon =
		res.props.children[2].props.options.tabBarIcon({
			color: "#ccc",
		});
	expect(props).toStrictEqual(actualIcon.props);
});
