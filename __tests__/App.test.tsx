import React from "react";
import renderer from "react-test-renderer";
import App from "../App";

jest.mock("../helpers/db", () => {
	return {
		init: jest.fn(async () => {
			return [];
		}),
	};
});

jest.useFakeTimers();
it("renders correctly", async () => {
	const tree = renderer.create(<App />);
	expect(tree.root).toMatchSnapshot();

	expect(tree.root.children.length).toBe(1);
});
