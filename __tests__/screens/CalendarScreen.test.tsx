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
import Event from "../../models/eventClass";

jest.mock("@expo/vector-icons/FontAwesome5", () => "Icon");
it("renders correctly (snapshot)", async () => {
	const promise = Promise.resolve();
	const rootReducer = combineReducers({
		events: reducers,
	});

	const store = createStore(
		rootReducer,
		applyMiddleware(ReduxThunk)
	);
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
	const rootReducer = combineReducers({
		events: reducers,
	});

	const store = createStore(
		rootReducer,
		applyMiddleware(ReduxThunk)
	);
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
	const rootReducer = combineReducers({
		events: reducers,
	});

	const store = createStore(
		rootReducer,
		applyMiddleware(ReduxThunk)
	);
	store.dispatch({
		type: ADD_EVENT,
		eventData: {
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
			address: "1 Test Drive",
			pushNotification: true,
		},
		events: [],
	});
	store.dispatch({
		type: ADD_EVENT,
		eventData: {
			id: "2",
			firstName: "Name",
			secondName: "Name2",
			day: 1,
			month: 0,
			type: "Wedding Anniversary",
			startYear: 0,
			noticeTime: 1,
			present: false,
			ideas: "No present ideas provided",
			address: "1 Test Drive",
			pushNotification: true,
		},
		events: [],
	});
	store.dispatch({
		type: ADD_EVENT,
		eventData: {
			id: "2",
			firstName: "Name",
			secondName: "No name provided",
			day: 1,
			month: 0,
			type: "Other",
			startYear: 0,
			noticeTime: 1,
			present: false,
			ideas: "No present ideas provided",
			address: "1 Test Drive",
			pushNotification: true,
		},
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
	let date = convertToNextDate(1, 0);
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
	const rootReducer = combineReducers({
		events: reducers,
	});

	const store = createStore(
		rootReducer,
		applyMiddleware(ReduxThunk)
	);

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
	const testEvent = new Event(
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
		"1 Test Drive",
		true
	);
	let date = convertToNextDate(
		testEvent.day,
		testEvent.month
	);
	let dateString = `${date.getFullYear()}-01-01`;
	expect(getDateString(testEvent)).toBe(dateString);
	testEvent.day = 11;
	testEvent.month = 10;
	date = convertToNextDate(testEvent.day, testEvent.month);
	dateString = `${date.getFullYear()}-11-11`;
	expect(getDateString(testEvent)).toBe(dateString);
});

const a = new Event(
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
	"1 Test Drive",
	true
);
const b = new Event(
	"2",
	"Name",
	"No name provided",
	1,
	0,
	"Wedding Anniversary",
	0,
	1,
	false,
	"No present ideas provided",
	"1 Test Drive",
	true
);
const c = new Event(
	"3",
	"Name",
	"No name provided",
	1,
	0,
	"Other",
	0,
	1,
	false,
	"No present ideas provided",
	"1 Test Drive",
	true
);

it("createMarkedDates with birthday", () => {
	const events = [a, a];
	let date = convertToNextDate(1, 0);
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
	let date = convertToNextDate(1, 0);
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
	let date = convertToNextDate(1, 0);
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
