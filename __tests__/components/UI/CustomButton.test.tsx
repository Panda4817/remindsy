import * as React from "react";
import {
	Platform,
	TouchableNativeFeedback,
	TouchableOpacity,
} from "react-native";
import renderer from "react-test-renderer";
import CustomButton from "../../../components/UI/CustomButton";

if (Platform.OS === "android") {
	Object.defineProperty(Platform, "Version", {
		get: () => 21,
	});
}

if (Platform.OS === "ios") {
	it(`renders correctly ios`, () => {
		const tree = renderer.create(
			<CustomButton>Test ios</CustomButton>
		);
		expect(tree).toMatchSnapshot();
		expect(
			tree.root.findByType(TouchableOpacity)
		).toBeTruthy();
	});
} else if (
	Platform.OS === "android" &&
	Platform.Version >= 21
) {
	it(`renders correctly android`, () => {
		const tree = renderer.create(
			<CustomButton>Test android</CustomButton>
		);
		expect(tree).toMatchSnapshot();
		expect(
			tree.root.findByType(TouchableNativeFeedback)
		).toBeTruthy();
	});
} else if (Platform.OS === "android") {
	it(`renders correctly ios`, () => {
		const tree = renderer.create(
			<CustomButton>Test ios</CustomButton>
		);
		expect(tree).toMatchSnapshot();
		expect(
			tree.root.findByType(TouchableOpacity)
		).toBeTruthy();
	});
}
