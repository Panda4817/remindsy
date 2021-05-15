import * as React from "react";
import {
	Platform,
	TouchableNativeFeedback,
	TouchableOpacity,
} from "react-native";
import renderer from "react-test-renderer";
import EventItem from "../../../components/appSpecific/EventItem";

if (Platform.OS === "android") {
	Object.defineProperty(Platform, "Version", {
		get: () => 21,
	});
}

jest.mock("@expo/vector-icons/FontAwesome", () => "Icon");
if (Platform.OS === "ios") {
	it(`renders correctly with years`, () => {
		const tree = renderer.create(
			<EventItem
				names="test ios"
				date="test-date"
				years="test-years"
				icon="birthday-cake"
				onSelect={() => {}}
			/>
		);
		expect(tree).toMatchSnapshot();
		expect(
			tree.root.findByType(TouchableOpacity)
		).toBeTruthy();
	});
	it(`renders correctly without years years`, () => {
		const tree = renderer.create(
			<EventItem
				names="test ios"
				date="test-date"
				years=""
				icon="birthday-cake"
				onSelect={() => {}}
			/>
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
	it(`renders correctly with years`, () => {
		const tree = renderer.create(
			<EventItem
				names="test android"
				date="test-date"
				years="test-years"
				icon="birthday-cake"
				onSelect={() => {}}
			/>
		);
		expect(tree).toMatchSnapshot();
		expect(
			tree.root.findByType(TouchableNativeFeedback)
		).toBeTruthy();
	});
	it(`renders correctly without years`, () => {
		const tree = renderer.create(
			<EventItem
				names="test android"
				date="test-date"
				years=""
				icon="birthday-cake"
				onSelect={() => {}}
			/>
		);
		expect(tree).toMatchSnapshot();
		expect(
			tree.root.findByType(TouchableNativeFeedback)
		).toBeTruthy();
	});
} else {
	it(`renders correctly with years`, () => {
		const tree = renderer.create(
			<EventItem
				names="test old android"
				date="test-date"
				years="test-years"
				icon="birthday-cake"
				onSelect={() => {}}
			/>
		);
		expect(tree).toMatchSnapshot();
		expect(
			tree.root.findByType(TouchableOpacity)
		).toBeTruthy();
	});
	it(`renders correctly without years`, () => {
		const tree = renderer.create(
			<EventItem
				names="test old android"
				date="test-date"
				years=""
				icon="birthday-cake"
				onSelect={() => {}}
			/>
		);
		expect(tree).toMatchSnapshot();
		expect(
			tree.root.findByType(TouchableOpacity)
		).toBeTruthy();
	});
}
