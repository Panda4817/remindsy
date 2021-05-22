import React from "react";
import { ActionSheetIOS, Alert } from "react-native";
import renderer from "react-test-renderer";
import {
	fireEvent,
	render,
	act,
} from "@testing-library/react-native";
import { Provider } from "react-redux";
import {
	applyMiddleware,
	combineReducers,
	createStore,
} from "redux";
import EventScreen, {
	screenOptions,
} from "../../screens/EventScreen";
import reducers from "../../store/reducers";

import ReduxThunk from "redux-thunk";
import { ADD_EVENT } from "../../store/actions";
import { leapYear } from "../../helpers/formatting";

jest.mock("@expo/vector-icons/FontAwesome5", () => "Icon");
jest.mock("@expo/vector-icons/Ionicons", () => "Icon");
jest.mock("expo-sqlite");
jest.mock("../../store/actions");
import * as actions from "../../store/actions";

it("renders correctly (snapshot)", async () => {
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
	const props = {
		navigation: {
			setOptions: () => jest.fn(),
		},
		route: { params: { eventId: "1" } },
	};
	const tree = renderer.create(
		<Provider store={store}>
			<EventScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	expect(tree).toMatchSnapshot();
	expect(screenOptions).toStrictEqual({});
	await act(() => promise);
});

it("renders correctly with no event found", async () => {
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
		},
		route: { params: { eventId: "1" } },
	};
	const { findAllByTestId } = render(
		<Provider store={store}>
			<EventScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	const views = await findAllByTestId("noDataYetView");
	expect(views.length).toBe(1);
	await act(() => promise);
});

it("renders correctly with data - birthday event", async () => {
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
	const props = {
		navigation: {
			setOptions: () => jest.fn(),
		},
		route: { params: { eventId: "1" } },
	};
	const { findAllByTestId } = render(
		<Provider store={store}>
			<EventScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	const views = await findAllByTestId("dataView");
	expect(views.length).toBe(1);
	await act(() => promise);
});

it("renders correctly with data - anniversary event", async () => {
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
	const props = {
		navigation: {
			setOptions: () => jest.fn(),
		},
		route: { params: { eventId: "1" } },
	};
	const { findAllByTestId } = render(
		<Provider store={store}>
			<EventScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	const views = await findAllByTestId("dataView");
	expect(views.length).toBe(1);
	await act(() => promise);
});

it("renders correctly with data - delete event", async () => {
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
	const props = {
		navigation: {
			setOptions: () => true,
			goBack: () => true,
		},
		route: { params: { eventId: "1" } },
	};
	const { findAllByTestId } = render(
		<Provider store={store}>
			<EventScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	const deleteButton = await findAllByTestId(
		"DeleteEventToListToo1"
	);
	expect(deleteButton.length).toBe(1);
	const spy = jest.spyOn(Alert, "alert");
	await act(async () =>
		fireEvent(deleteButton[0], "onPress")
	);
	expect(spy).toBeCalled();
	const spyNav = jest.spyOn(props.navigation, "goBack");

	// Test correct dispatch
	// @ts-ignore
	actions.delEvent.mockReturnValueOnce(() =>
		Promise.resolve()
	);
	// @ts-ignore
	await act(() => spy.mock.calls[0][2][0].onPress());
	expect(spyNav).toBeCalled();

	// Test error with dispatch (no mock)
	// @ts-ignore
	await act(() => spy.mock.calls[0][2][0].onPress());
	expect(spy.mock.calls.length).toBe(2);
	expect(spyNav.mock.calls.length).toBe(1);

	await act(() => promise);
});
