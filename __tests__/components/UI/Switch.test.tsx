import * as React from "react";
import renderer from "react-test-renderer";
import CustomSwitch from "../../../components/UI/Switch";
import { act } from "@testing-library/react-native";
it(`renders correctly`, async () => {
	const promise = Promise.resolve();
	const tree = renderer.create(
		<CustomSwitch
			value={true}
			label="Test"
			onValueChangeHandler={() => {}}
			error="error"
			touched={true}
		/>
	);
	expect(tree).toMatchSnapshot();
	await act(() => promise);
});
