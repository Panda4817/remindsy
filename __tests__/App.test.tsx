import React from "react";
import renderer from "react-test-renderer";
import App from "../App";
import { useFonts } from "expo-font";
import { renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import { act } from "@testing-library/react-native";
jest.mock("expo-sqlite");

jest.useFakeTimers();
it("renders correctly when fonts not loaded", async () => {
	const promise = Promise.resolve();
	const tree = renderer.create(<App />);
	expect(tree.root).toMatchSnapshot();
	expect(tree.root.children.length).toBe(1);
	expect(tree.root.findByType(AppLoading)).toBeTruthy();
	await act(() => promise);
});

const FONTS = {
	regular: require("../assets/fonts/OpenSans-Regular.ttf"),
	bold: require("../assets/fonts/OpenSans-Bold.ttf"),
};

it("renders correctly when fonts are loaded", async () => {
	const promise = Promise.resolve();
	const tree = renderer.create(<App />);
	const hook = renderHook(() => useFonts(FONTS));
	await act(() => hook.waitForNextUpdate());
	expect(tree.root).toMatchSnapshot();
	expect(tree.root.findByType(Provider)).toBeTruthy();
	await act(() => promise);
});
