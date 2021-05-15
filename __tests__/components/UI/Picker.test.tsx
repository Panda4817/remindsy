import * as React from "react";
import renderer from "react-test-renderer";
import Picker from "../../../components/UI/Picker";

it(`renders correctly`, () => {
	const tree = renderer.create(
		<Picker
			label="text"
			value="1"
			onValueChangeHandler={() => {}}
			items={[{ label: "1", value: "1" }]}
			error="error"
			touched={true}
		/>
	);
	expect(tree).toMatchSnapshot();
});
