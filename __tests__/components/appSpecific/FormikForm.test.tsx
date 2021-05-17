import * as React from "react";
import {
	ActivityIndicator,
	Platform,
	PlatformColor,
} from "react-native";
import renderer, { act } from "react-test-renderer";
import {
	fireEvent,
	render,
	waitForElementToBeRemoved,
} from "@testing-library/react-native";
import FormikForm, {
	formatValues,
	formSchema,
} from "../../../components/appSpecific/FormikForm";
import Event from "../../../models/eventClass";
import { Formik } from "formik";

jest.mock("@expo/vector-icons/FontAwesome5", () => "Icon");
jest.mock(
	"react-native/Libraries/Components/Switch/Switch",
	() => {
		const mockComponent = require("react-native/jest/mockComponent");
		return mockComponent(
			"react-native/Libraries/Components/Switch/Switch"
		);
	}
);
it(`renders correctly with no selectedEvent`, () => {
	const tree = renderer.create(
		<FormikForm
			submitHandler={() => {}}
			navigation={{}}
			route={{ params: {} }}
			isLoading={false}
			selectedEvent={null}
		/>
	);
	expect(tree).toMatchSnapshot();
});
it(`renders correctly with no selectedEvent and loading`, () => {
	const tree = renderer.create(
		<FormikForm
			submitHandler={() => {}}
			navigation={{}}
			route={{ params: {} }}
			isLoading={true}
			selectedEvent={null}
		/>
	);
	expect(tree).toMatchSnapshot();
	expect(
		tree.root.findAllByType(ActivityIndicator)
	).toBeTruthy();
});

const a: Event = new Event(
	"1",
	"Name",
	"No name provided",
	1,
	0,
	"Birthday",
	0,
	1,
	false,
	"No present ideas provided",
	"No address provided",
	false
);

it(`renders correctly with selectedEvent`, () => {
	const tree = renderer.create(
		<FormikForm
			submitHandler={() => {}}
			navigation={{}}
			route={{ params: {} }}
			isLoading={false}
			selectedEvent={a}
		/>
	);
	expect(tree).toMatchSnapshot();
});

it(`renders correctly with selectedEvent and loading`, () => {
	const tree = renderer.create(
		<FormikForm
			submitHandler={() => {}}
			navigation={{}}
			route={{ params: {} }}
			isLoading={true}
			selectedEvent={a}
		/>
	);
	expect(tree).toMatchSnapshot();
	expect(
		tree.root.findAllByType(ActivityIndicator)
	).toBeTruthy();
});

it(`renders correctly with filterDates`, () => {
	const tree = renderer.create(
		<FormikForm
			submitHandler={() => {}}
			navigation={{}}
			route={{ params: { filterDay: 1, filterMonth: 1 } }}
			isLoading={false}
			selectedEvent={null}
		/>
	);
	expect(tree).toMatchSnapshot();
});
it(`renders correctly with filterDates and loading`, () => {
	const tree = renderer.create(
		<FormikForm
			submitHandler={() => {}}
			navigation={{}}
			route={{ params: { filterDay: 1, filterMonth: 1 } }}
			isLoading={true}
			selectedEvent={null}
		/>
	);
	expect(tree).toMatchSnapshot();
	expect(
		tree.root.findAllByType(ActivityIndicator)
	).toBeTruthy();
});

const valuesBefore = {
	id: "1",
	firstName: "Name",
	secondName: "",
	day: 1,
	month: 0,
	type: "Birthday",
	startYear: "0",
	noticeTime: 1,
	present: 0,
	ideas: "",
	address: "",
	pushNotification: 0,
};
const valuesAfter = {
	id: "1",
	firstName: "Name",
	secondName: "No name provided",
	day: 1,
	month: 0,
	type: "Birthday",
	startYear: 0,
	noticeTime: 1,
	present: false,
	ideas: "No present ideas provided",
	address: "No address provided",
	pushNotification: false,
};

it("formatValues", () => {
	expect(formatValues(valuesBefore)).toStrictEqual(
		valuesAfter
	);
	valuesBefore.present = 1;
	valuesBefore.pushNotification = 1;
	valuesAfter.present = true;
	valuesAfter.pushNotification = true;
	expect(formatValues(valuesBefore)).toStrictEqual(
		valuesAfter
	);
});

const onSubmitMock = jest.fn(() => {});
const onHandleSubmitMock = jest.fn(() => {
	onSubmitMock();
});
it(`submitting form`, async () => {
	const promise = Promise.resolve();
	const { getByTestId, queryByTestId, container } = render(
		<FormikForm
			submitHandler={() => {}}
			navigation={{}}
			route={{ params: {} }}
			isLoading={false}
			selectedEvent={a}
		/>
	);
	const formik = container.findByType(Formik);
	formik.props.onSubmit = onSubmitMock();

	const button = getByTestId("submitButton");
	button.props.onClick = onHandleSubmitMock();

	expect(button).toBeTruthy();
	fireEvent(button, "onClick");

	const element = queryByTestId("submitButton");
	expect(element).toBeFalsy();
	expect(onHandleSubmitMock).toBeCalled();
	expect(onSubmitMock).toBeCalled();
	await act(() => promise);
});

it(`Change type`, async () => {
	const promise = Promise.resolve();
	const { getByTestId, queryByTestId, container } = render(
		<FormikForm
			submitHandler={onSubmitMock}
			navigation={{}}
			route={{ params: {} }}
			isLoading={false}
			selectedEvent={a}
		/>
	);
	const picker = getByTestId("typePicker");
	expect(queryByTestId("secondNameInput")).toBeFalsy();
	if (Platform.OS === "android") {
		expect(picker.props.selected).toBe(2);
	} else {
		expect(picker.props.selectedIndex).toBe(2);
	}

	fireEvent(picker, "onValueChange", "Wedding Anniversary");

	if (Platform.OS === "android") {
		expect(picker.props.selected).toBe(1);
	} else {
		expect(picker.props.selectedIndex).toBe(1);
	}
	expect(queryByTestId("secondNameInput")).toBeTruthy();
	const input = getByTestId("yearInput");
	expect(input.props.label).toBe("Wedding year");

	fireEvent(picker, "onValueChange", "Other");
	if (Platform.OS === "android") {
		expect(picker.props.selected).toBe(0);
	} else {
		expect(picker.props.selectedIndex).toBe(0);
	}
	expect(input.props.label).toBe("Start year");
	await act(() => promise);
});

it(`Change day`, async () => {
	const promise = Promise.resolve();
	const { getByTestId, queryByTestId, container } = render(
		<FormikForm
			submitHandler={onSubmitMock}
			navigation={{}}
			route={{ params: {} }}
			isLoading={false}
			selectedEvent={a}
		/>
	);
	const picker = getByTestId("dayPicker");
	if (Platform.OS === "android") {
		expect(picker.props.selected).toBe(0);
	} else {
		expect(picker.props.selectedIndex).toBe(0);
	}

	fireEvent(picker, "onValueChange", 2);

	if (Platform.OS === "android") {
		expect(picker.props.selected).toBe(1);
	} else {
		expect(picker.props.selectedIndex).toBe(1);
	}
	await act(() => promise);
});

it(`Change month`, async () => {
	const promise = Promise.resolve();
	const { getByTestId, queryByTestId, container } = render(
		<FormikForm
			submitHandler={onSubmitMock}
			navigation={{}}
			route={{ params: {} }}
			isLoading={false}
			selectedEvent={a}
		/>
	);
	const picker = getByTestId("monthPicker");
	if (Platform.OS === "android") {
		expect(picker.props.selected).toBe(0);
	} else {
		expect(picker.props.selectedIndex).toBe(0);
	}

	fireEvent(picker, "onValueChange", 2);

	if (Platform.OS === "android") {
		expect(picker.props.selected).toBe(2);
	} else {
		expect(picker.props.selectedIndex).toBe(2);
	}
	await act(() => promise);
});

it(`Change firstName`, async () => {
	const promise = Promise.resolve();
	const { getByTestId, queryByTestId, container } = render(
		<FormikForm
			submitHandler={onSubmitMock}
			navigation={{}}
			route={{ params: {} }}
			isLoading={false}
			selectedEvent={a}
		/>
	);
	const input = getByTestId("firstNameInput");
	expect(input.props.value).toBe("Name");
	fireEvent(input, "onChangeText", "Changed Name");
	expect(input.props.value).toBe("Changed Name");
	await act(() => promise);
});

it(`Change SecondName`, async () => {
	const promise = Promise.resolve();
	const { getByTestId, queryByTestId, container } = render(
		<FormikForm
			submitHandler={onSubmitMock}
			navigation={{}}
			route={{ params: {} }}
			isLoading={false}
			selectedEvent={a}
		/>
	);
	const picker = getByTestId("typePicker");
	fireEvent(picker, "onValueChange", "Wedding Anniversary");
	const input = getByTestId("secondNameInput");
	expect(input.props.value).toBe("No name provided");
	fireEvent(input, "onChangeText", "Changed Name");
	expect(input.props.value).toBe("Changed Name");
	await act(() => promise);
});

it(`Change startYear`, async () => {
	const promise = Promise.resolve();
	const { getByTestId, queryByTestId, container } = render(
		<FormikForm
			submitHandler={onSubmitMock}
			navigation={{}}
			route={{ params: {} }}
			isLoading={false}
			selectedEvent={a}
		/>
	);
	const input = getByTestId("yearInput");
	expect(input.props.value).toBe("0");
	expect(input.props.label).toBe("Year of birth");
	fireEvent(input, "onChangeText", "-");
	expect(input.props.value).toBe("0");
	fireEvent(input, "onChangeText", "1991");
	expect(input.props.value).toBe("1991");
	await act(() => promise);
});

it(`Change present switch`, async () => {
	const promise = Promise.resolve();
	const { getByTestId, queryByTestId, container } = render(
		<FormikForm
			submitHandler={onSubmitMock}
			navigation={{}}
			route={{ params: {} }}
			isLoading={false}
			selectedEvent={a}
		/>
	);
	const switchType = getByTestId("presentSwitch");
	expect(switchType.props.value).toBe(false);
	expect(queryByTestId("ideasInput")).toBeFalsy();
	fireEvent(switchType, "onValueChange", true);
	expect(switchType.props.value).toBe(true);
	expect(queryByTestId("ideasInput")).toBeTruthy();
	await act(() => promise);
});

it(`Change Ideas`, async () => {
	const promise = Promise.resolve();
	const { getByTestId, queryByTestId, container } = render(
		<FormikForm
			submitHandler={onSubmitMock}
			navigation={{}}
			route={{ params: {} }}
			isLoading={false}
			selectedEvent={a}
		/>
	);
	const switchType = getByTestId("presentSwitch");
	fireEvent(switchType, "onValueChange", true);
	const input = getByTestId("ideasInput");
	expect(input.props.value).toBe(
		"No present ideas provided"
	);
	fireEvent(input, "onChangeText", "present idea");
	expect(input.props.value).toBe("present idea");
	await act(() => promise);
});

it(`Change address`, async () => {
	const promise = Promise.resolve();
	const { getByTestId, queryByTestId, container } = render(
		<FormikForm
			submitHandler={onSubmitMock}
			navigation={{}}
			route={{ params: {} }}
			isLoading={false}
			selectedEvent={a}
		/>
	);
	const input = getByTestId("addressInput");
	expect(input.props.value).toBe("No address provided");
	fireEvent(input, "onChangeText", "1 Test Road");
	expect(input.props.value).toBe("1 Test Road");
	await act(() => promise);
});

it(`Change notification switch`, async () => {
	const promise = Promise.resolve();
	const { getByTestId, queryByTestId, container } = render(
		<FormikForm
			submitHandler={onSubmitMock}
			navigation={{}}
			route={{ params: {} }}
			isLoading={false}
			selectedEvent={a}
		/>
	);
	const switchType = getByTestId("notificationSwitch");
	expect(switchType.props.value).toBe(false);
	expect(queryByTestId("noticePicker")).toBeFalsy();
	fireEvent(switchType, "onValueChange", true);
	expect(switchType.props.value).toBe(true);
	expect(queryByTestId("noticePicker")).toBeTruthy();
	await act(() => promise);
});

it(`Change noticeTime`, async () => {
	const promise = Promise.resolve();
	const { getByTestId, queryByTestId, container } = render(
		<FormikForm
			submitHandler={onSubmitMock}
			navigation={{}}
			route={{ params: {} }}
			isLoading={false}
			selectedEvent={a}
		/>
	);
	const switchType = getByTestId("notificationSwitch");
	fireEvent(switchType, "onValueChange", true);
	const picker = getByTestId("noticePicker");
	if (Platform.OS === "android") {
		expect(picker.props.selected).toBe(0);
	} else {
		expect(picker.props.selectedIndex).toBe(0);
	}

	fireEvent(picker, "onValueChange", 2);

	if (Platform.OS === "android") {
		expect(picker.props.selected).toBe(1);
	} else {
		expect(picker.props.selectedIndex).toBe(1);
	}
	await act(() => promise);
});
