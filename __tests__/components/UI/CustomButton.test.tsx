import * as React from "react";
import {
	Platform,
	TouchableNativeFeedback,
	TouchableOpacity,
} from "react-native";
import renderer from "react-test-renderer";
import CustomButton from "../../../components/UI/CustomButton";
import { act } from "@testing-library/react-native";
if (Platform.OS === "android") {
	Object.defineProperty(Platform, "Version", {
		get: () => 21,
	});
}

if (Platform.OS === "ios") {
	it(`renders correctly ios`, async () => {
		const promise = Promise.resolve();
		const tree = renderer.create(
			<CustomButton>Test ios</CustomButton>
		);
		expect(tree).toMatchSnapshot();
		expect(
			tree.root.findByType(TouchableOpacity)
		).toBeTruthy();
		await act(() => promise);
	});
} else if (
	Platform.OS === "android" &&
	Platform.Version >= 21
) {
	it(`renders correctly android`, async () => {
		const promise = Promise.resolve();
		const tree = renderer.create(
			<CustomButton>Test android</CustomButton>
		);
		expect(tree).toMatchSnapshot();
		expect(
			tree.root.findByType(TouchableNativeFeedback)
		).toBeTruthy();
		await act(() => promise);
	});
} else if (Platform.OS === "android") {
	it(`renders correctly ios`, async () => {
		const promise = Promise.resolve();
		const tree = renderer.create(
			<CustomButton>Test ios</CustomButton>
		);
		expect(tree).toMatchSnapshot();
		expect(
			tree.root.findByType(TouchableOpacity)
		).toBeTruthy();
		await act(() => promise);
	});
}
