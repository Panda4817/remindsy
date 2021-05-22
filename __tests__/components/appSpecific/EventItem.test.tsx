import * as React from "react";
import {
	Platform,
	TouchableNativeFeedback,
	TouchableOpacity,
} from "react-native";
import renderer from "react-test-renderer";
import EventItem from "../../../components/appSpecific/EventItem";
import { act } from "@testing-library/react-native";
if (Platform.OS === "android") {
	Object.defineProperty(Platform, "Version", {
		get: () => 21,
	});
}

jest.mock("@expo/vector-icons/FontAwesome", () => "Icon");
if (Platform.OS === "ios") {
	it(`renders correctly with years`, async () => {
		const promise = Promise.resolve();
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
		const component = tree.root.findByType(
			TouchableOpacity
		);
		expect(component).toBeTruthy();
		await act(() => promise);
	});
	it(`renders correctly without years`, async () => {
		const promise = Promise.resolve();
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
		const component = tree.root.findByType(
			TouchableOpacity
		);
		expect(component).toBeTruthy();
		await act(() => promise);
	});
} else if (
	Platform.OS === "android" &&
	Platform.Version >= 21
) {
	it(`renders correctly with years`, async () => {
		const promise = Promise.resolve();
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
		const component = tree.root.findByType(
			TouchableNativeFeedback
		);
		expect(component).toBeTruthy();
		await act(() => promise);
	});
	it(`renders correctly without years`, async () => {
		const promise = Promise.resolve();
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
		const component = tree.root.findByType(
			TouchableNativeFeedback
		);
		expect(component).toBeTruthy();
		await act(() => promise);
	});
} else {
	it(`renders correctly with years`, async () => {
		const promise = Promise.resolve();
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
		const component = tree.root.findByType(
			TouchableOpacity
		);
		expect(component).toBeTruthy();
		await act(() => promise);
	});
	it(`renders correctly without years`, async () => {
		const promise = Promise.resolve();
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
		const component = tree.root.findByType(
			TouchableOpacity
		);
		expect(component).toBeTruthy();
		await act(() => promise);
	});
}
