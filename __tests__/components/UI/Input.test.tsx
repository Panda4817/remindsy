import * as React from "react";
import renderer from "react-test-renderer";
import Input from "../../../components/UI/Input";
import { act } from "@testing-library/react-native";

it(`renders correctly`, async () => {
	const promise = Promise.resolve();
	const tree = renderer.create(
		<Input
			label="text"
			value="1"
			onChangeText={() => {}}
			error="error"
			touched={true}
		/>
	);
	expect(tree).toMatchSnapshot();
	await act(() => promise);
});
