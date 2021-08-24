import * as React from "react";
import renderer from "react-test-renderer";
import ResultsModal from "../../../components/appSpecific/ResultsModal";
import { act, fireEvent, render } from "@testing-library/react-native";
import { Modal } from "react-native";

const fakeData = [
	{
		birthday: { day: 1, month: 2, year: 1991 },
		name: "test",
		addresses: [
			{
				street: "1 Fake Drive",
				neighborhood: "Fake",
				city: "FakeTown",
				region: "FakeState",
				postalCode: "abc 123",
			},
		],
		id: "111",
	},
];
const modalOpenStatus = true;
const selectContact = jest.fn();
const cancelModal = jest.fn();

it(`renders correctly with modal`, async () => {
	const promise = Promise.resolve();
	const tree = renderer.create(
		<ResultsModal
			open={modalOpenStatus}
			data={fakeData}
			useContact={selectContact}
			cancelModal={cancelModal}
		/>
	);
	expect(tree).toMatchSnapshot();
	const modal = tree.root.findByType(Modal);
	expect(modal).toBeTruthy();
	await act(() => promise);
});

it(`triggers onSelect when contact item pressed`, async () => {
	const promise = Promise.resolve();
	const { findAllByTestId } = render(
		<ResultsModal
			open={modalOpenStatus}
			data={fakeData}
			useContact={selectContact}
			cancelModal={cancelModal}
		/>
	);
	const event = await findAllByTestId("resultItem111");
	await act(async () => fireEvent(event[0], "press"));
	expect(selectContact).toBeCalledWith(fakeData[0]);
	await act(() => promise);
});
