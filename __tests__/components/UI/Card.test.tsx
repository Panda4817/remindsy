import * as React from "react";
import Card from "../../../components/UI/Card";
import renderer from "react-test-renderer";

it(`renders correctly`, () => {
	const tree = renderer.create(<Card>Test</Card>);
	expect(tree).toMatchSnapshot();
});
