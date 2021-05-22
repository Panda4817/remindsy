import React from "react";
import AppNavigator from "../../navigation/AppNavigator";
import renderer from "react-test-renderer";
import { act } from "@testing-library/react-native";

it(`renders correctly`, async () => {
	const promise = Promise.resolve();
	const tree = renderer.create(<AppNavigator />);
	expect(tree).toMatchSnapshot();
	await act(() => promise);
});
