import * as React from "react";
import renderer from "react-test-renderer";
import CustomSwitch from "../../../components/UI/Switch";

it(`renders correctly`, () => {
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
});
