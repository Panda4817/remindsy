import * as React from "react";
import Card from "../../../components/UI/Card";
import renderer from "react-test-renderer";
import { act } from "@testing-library/react-native";

it(`renders correctly`, async () => {
	const promise = Promise.resolve();
	const tree = renderer.create(<Card>Test</Card>);
	expect(tree).toMatchSnapshot();
	await act(() => promise);
});
