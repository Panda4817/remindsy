import React from "react";
import renderer from "react-test-renderer";
import { act, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import {
	applyMiddleware,
	combineReducers,
	createStore,
} from "redux";
import CalendarScreen from "../../screens/CalendarScreen";
import reducers from "../../store/reducers";
import ReduxThunk from "redux-thunk";
import { CalendarList } from "react-native-calendars";
import { ADD_EVENT } from "../../store/actions";
import { convertToNextDate } from "../../helpers/formatting";
import colours from "../../constants/Colours";

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
