import * as React from "react";
import renderer from "react-test-renderer";
import CustomText from "../../../components/UI/CustomText";
import { act } from "@testing-library/react-native";
it(`renders correctly`, async () => {
	const promise = Promise.resolve();
	const tree = renderer.create(
		<CustomText>Test</CustomText>
	);
	expect(tree).toMatchSnapshot();
	await act(() => promise);
});
