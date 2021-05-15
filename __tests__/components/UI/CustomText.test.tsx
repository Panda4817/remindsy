import * as React from "react";
import renderer from "react-test-renderer";
import CustomText from "../../../components/UI/CustomText";

it(`renders correctly`, () => {
	const tree = renderer.create(
		<CustomText>Test</CustomText>
	);
	expect(tree).toMatchSnapshot();
});
