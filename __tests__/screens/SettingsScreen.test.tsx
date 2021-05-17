import React from "react";
import renderer from "react-test-renderer";
import SettingsScreen from "../../screens/SettingsScreen";

it("renders correctly", () => {
	const tree = renderer.create(<SettingsScreen />);
	expect(tree).toMatchSnapshot();
});
