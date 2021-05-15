import * as React from "react";
import renderer from "react-test-renderer";
import Input from "../../../components/UI/Input";

it(`renders correctly`, () => {
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
});
