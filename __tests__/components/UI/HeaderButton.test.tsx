import * as React from "react";
import CustomHeaderButton from "../../../components/UI/HeaderButton";
import {
	HeaderButtons,
	Item,
} from "react-navigation-header-buttons";
import renderer from "react-test-renderer";
import { act } from "@testing-library/react-native";

it(`renders correctly`, async () => {
	const promise = Promise.resolve();
	const tree = renderer.create(
		<HeaderButtons
			HeaderButtonComponent={CustomHeaderButton}
		>
			<Item title="test" />
		</HeaderButtons>
	);
	expect(tree).toMatchSnapshot();
	await act(() => promise);
});
