import React from "react";
import renderer from "react-test-renderer";
import SettingsScreen from "../../screens/SettingsScreen";
import { act } from "@testing-library/react-native";

it("renders correctly", async () => {
	const promise = Promise.resolve();
	const tree = renderer.create(<SettingsScreen />);
	expect(tree).toMatchSnapshot();
	await act(() => promise);
});
