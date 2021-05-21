import React from "react";
import AppNavigator from "../../navigation/AppNavigator";
import renderer from "react-test-renderer";
import { TabsNavigator } from "../../navigation/TabsNavigator";

it(`renders correctly`, () => {
	const tree = renderer.create(<AppNavigator />);
	expect(tree).toMatchSnapshot();
});
