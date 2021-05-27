import React from "react";
import renderer from "react-test-renderer";
import { act, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import {
	applyMiddleware,
	combineReducers,
	createStore,
} from "redux";
import CalendarScreen, {
	createMarkedDates,
	getDateString,
} from "../../screens/CalendarScreen";
import reducers from "../../store/reducers";
import ReduxThunk from "redux-thunk";
import { CalendarList } from "react-native-calendars";
import { ADD_EVENT } from "../../store/actions";
import { convertToNextDate } from "../../helpers/formatting";
import colours from "../../constants/Colours";
import {
	defaultEventWithAddress,
	defaultEventWithNotificationOff,
	defaultWithAddressStringId,
	otherEventWithAddress,
	otherWithAddressStringId3,
	weddingEventWithAddress,
	weddingWithAddressStringId2,
} from "../fakeEvents";

jest.mock("@expo/vector-icons/FontAwesome5", () => "Icon");
let store: any;
beforeEach(() => {
	const rootReducer = combineReducers({
		events: reducers,
	});
	store = createStore(
		rootReducer,
		applyMiddleware(ReduxThunk)
	);
});
it("renders correctly (snapshot)", async () => {
	const promise = Promise.resolve();
	const props = {
		navigation: { setOptions: () => jest.fn() },
		route: { params: {} },
	};
	const tree = renderer.create(
		<Provider store={store}>
			<CalendarScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	expect(tree).toMatchSnapshot();
	await act(() => promise);
});

it("renders correctly with no events", async () => {
	const promise = Promise.resolve();
	const props = {
		navigation: { setOptions: () => jest.fn() },
		route: { params: {} },
	};
	const spyHeader = jest.spyOn(
		props.navigation,
		"setOptions"
	);
	const { container } = render(
		<Provider store={store}>
			<CalendarScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	expect(spyHeader).toBeCalled();
	const calendarList = await container.findAllByType(
		CalendarList
	)[0];
	expect(calendarList.props.markedDates).toStrictEqual({});
	await act(() => promise);
});

it("renders correctly with events", async () => {
	const promise = Promise.resolve();
	store.dispatch({
		type: ADD_EVENT,
		eventData: defaultWithAddressStringId,
		events: [],
	});
	store.dispatch({
		type: ADD_EVENT,
		eventData: weddingWithAddressStringId2,
		events: [],
	});
	store.dispatch({
		type: ADD_EVENT,
		eventData: otherWithAddressStringId3,
		events: [],
	});
	const props = {
		navigation: {
			setOptions: () => jest.fn(),
			navigate: () => jest.fn(),
		},
		route: { params: {} },
	};
	const spyHeader = jest.spyOn(
		props.navigation,
		"setOptions"
	);
	const { container } = render(
		<Provider store={store}>
			<CalendarScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	expect(spyHeader).toBeCalled();
	const calendarList = await container.findAllByType(
		CalendarList
	)[0];
	let date = convertToNextDate(1, 0, 0);
	let dateString = date.getFullYear().toString() + "-01-01";
	let obj: any = {};
	obj[dateString] = {
		dots: [
			{
				key: "birthday",
				color: colours.darkBlue,
			},
			{
				key: "anniversary",
				color: colours.darkPink,
			},
			{
				key: "other",
				color: colours.yellow,
			},
		],
	};
	expect(calendarList.props.markedDates).toStrictEqual(obj);
	await act(() => promise);
});

it("Check pressing on a date works", async () => {
	const promise = Promise.resolve();

	const props = {
		navigation: {
			setOptions: () => jest.fn(),
			navigate: () => jest.fn(),
		},
		route: { params: {} },
	};
	const spyHeader = jest.spyOn(
		props.navigation,
		"setOptions"
	);
	const { container } = render(
		<Provider store={store}>
			<CalendarScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	expect(spyHeader).toBeCalled();
	const calendarList = await container.findAllByType(
		CalendarList
	)[0];

	const spy = jest.spyOn(props.navigation, "navigate");
	await act(async () =>
		calendarList.props.onDayPress({
			day: 1,
			month: 1,
			year: new Date().getFullYear() + 1,
		})
	);
	expect(spy).toBeCalled();
	await act(() => promise);
});

it("getDateString", () => {
	const testEvent = defaultEventWithAddress;
	let date = convertToNextDate(
		testEvent.day,
		testEvent.month,
		testEvent.startYear
	);
	let dateString = `${date.getFullYear()}-01-01`;
	expect(getDateString(testEvent)).toBe(dateString);
	testEvent.day = 11;
	testEvent.month = 10;
	date = convertToNextDate(
		testEvent.day,
		testEvent.month,
		testEvent.startYear
	);
	dateString = `${date.getFullYear()}-11-11`;
	expect(getDateString(testEvent)).toBe(dateString);
});

const a = defaultEventWithNotificationOff;
const b = weddingEventWithAddress;
const c = otherEventWithAddress;

it("createMarkedDates with birthday", () => {
	const events = [a, a];
	let date = convertToNextDate(1, 0, 0);
	let dateString = `${date.getFullYear()}-01-01`;
	let obj: any = {};
	obj[dateString] = {
		dots: [
			{
				key: "birthday",
				color: colours.darkBlue,
			},
		],
	};
	expect(createMarkedDates(events)).toStrictEqual(obj);
});

it("createMarkedDates with anniversary", () => {
	const events = [b, b];
	let date = convertToNextDate(1, 0, 0);
	let dateString = `${date.getFullYear()}-01-01`;
	let obj: any = {};
	obj[dateString] = {
		dots: [
			{
				key: "anniversary",
				color: colours.darkPink,
			},
		],
	};
	expect(createMarkedDates(events)).toStrictEqual(obj);
});

it("createMarkedDates with other", () => {
	const events = [c, c];
	let date = convertToNextDate(1, 0, 0);
	let dateString = `${date.getFullYear()}-01-01`;
	let obj: any = {};
	obj[dateString] = {
		dots: [
			{
				key: "other",
				color: colours.yellow,
			},
		],
	};
	expect(createMarkedDates(events)).toStrictEqual(obj);
});
