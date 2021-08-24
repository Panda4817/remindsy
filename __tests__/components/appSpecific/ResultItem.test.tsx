import * as React from "react";
import { Platform, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import renderer from "react-test-renderer";
import ResultItem from "../../../components/appSpecific/ResultItem";
import { act } from "@testing-library/react-native";
if (Platform.OS === "android") {
	Object.defineProperty(Platform, "Version", {
		get: () => 21,
	});
}
const fake_date = { day: 1, month: 2, year: 1991 };
const fake_address = [
	{
		street: "1 Fake Drive",
		neighborhood: "Fake",
		city: "FakeTown",
		region: "FakeState",
		postalCode: "abc 123",
	},
];
if (Platform.OS === "ios") {
	it(`renders correctly with date and address`, async () => {
		const promise = Promise.resolve();
		const tree = renderer.create(
			<ResultItem names="test ios" date={fake_date} address={fake_address} onSelect={() => {}} />
		);
		expect(tree).toMatchSnapshot();
		const component = tree.root.findByType(TouchableOpacity);
		expect(component).toBeTruthy();
		await act(() => promise);
	});
	it(`renders correctly without date`, async () => {
		const promise = Promise.resolve();
		const tree = renderer.create(
			<ResultItem names="test ios" date={undefined} address={fake_address} onSelect={() => {}} />
		);
		expect(tree).toMatchSnapshot();
		const component = tree.root.findByType(TouchableOpacity);
		expect(component).toBeTruthy();
		await act(() => promise);
	});
	it(`renders correctly without address`, async () => {
		const promise = Promise.resolve();
		const tree = renderer.create(
			<ResultItem names="test ios" date={fake_date} address={undefined} onSelect={() => {}} />
		);
		expect(tree).toMatchSnapshot();
		const component = tree.root.findByType(TouchableOpacity);
		expect(component).toBeTruthy();
		await act(() => promise);
	});
} else if (Platform.OS === "android" && Platform.Version >= 21) {
	it(`renders correctly with date and address`, async () => {
		const promise = Promise.resolve();
		const tree = renderer.create(
			<ResultItem names="test android" date={fake_date} address={fake_address} onSelect={() => {}} />
		);
		expect(tree).toMatchSnapshot();
		const component = tree.root.findByType(TouchableNativeFeedback);
		expect(component).toBeTruthy();
		await act(() => promise);
	});
	it(`renders correctly without date`, async () => {
		const promise = Promise.resolve();
		const tree = renderer.create(
			<ResultItem names="test android" date={undefined} address={fake_address} onSelect={() => {}} />
		);
		expect(tree).toMatchSnapshot();
		const component = tree.root.findByType(TouchableNativeFeedback);
		expect(component).toBeTruthy();
		await act(() => promise);
	});
	it(`renders correctly without address`, async () => {
		const promise = Promise.resolve();
		const tree = renderer.create(
			<ResultItem names="test android" date={fake_date} address={undefined} onSelect={() => {}} />
		);
		expect(tree).toMatchSnapshot();
		const component = tree.root.findByType(TouchableNativeFeedback);
		expect(component).toBeTruthy();
		await act(() => promise);
	});
} else {
	it(`renders correctly with date and address`, async () => {
		const promise = Promise.resolve();
		const tree = renderer.create(
			<ResultItem
				names="test old android"
				date={fake_date}
				address={fake_address}
				onSelect={() => {}}
			/>
		);
		expect(tree).toMatchSnapshot();
		const component = tree.root.findByType(TouchableOpacity);
		expect(component).toBeTruthy();
		await act(() => promise);
	});
	it(`renders correctly without date`, async () => {
		const promise = Promise.resolve();
		const tree = renderer.create(
			<ResultItem
				names="test old android"
				date={undefined}
				address={fake_address}
				onSelect={() => {}}
			/>
		);
		expect(tree).toMatchSnapshot();
		const component = tree.root.findByType(TouchableOpacity);
		expect(component).toBeTruthy();
		await act(() => promise);
	});
	it(`renders correctly without address`, async () => {
		const promise = Promise.resolve();
		const tree = renderer.create(
			<ResultItem names="test old android" date={fake_date} address={undefined} onSelect={() => {}} />
		);
		expect(tree).toMatchSnapshot();
		const component = tree.root.findByType(TouchableOpacity);
		expect(component).toBeTruthy();
		await act(() => promise);
	});
}
