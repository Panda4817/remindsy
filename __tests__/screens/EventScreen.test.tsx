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
import {
	defaultStringId,
	defaultWithAddressStringId,
	weddingAddressIdeasNoNotificationYearLeapDay,
} from "../fakeEvents";
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
	store.dispatch({
		type: ADD_EVENT,
		eventData: defaultWithAddressStringId,
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
	store.dispatch({
		type: ADD_EVENT,
		eventData: defaultStringId,
		events: [],
	});
	const props = {
		navigation: {
			setOptions: () => jest.fn(),
		},
		route: { params: { eventId: "1" } },
	};
	const { findAllByTestId, queryAllByTestId } = render(
		<Provider store={store}>
			<EventScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	const views = await findAllByTestId("dataView");
	expect(views.length).toBe(1);
	const years = queryAllByTestId("years");
	const leapDay = queryAllByTestId("leapDay");
	const names = queryAllByTestId("name");
	const pres = queryAllByTestId("cardOrPres");
	const ideas = queryAllByTestId("ideas");
	const address = queryAllByTestId("address");
	const notice = queryAllByTestId("notice");
	expect(years.length).toBe(0);
	expect(leapDay.length).toBe(0);
	expect(names[0].children[0]).toBe("Name");
	expect(pres[0].children[0]).toBe("Card only");
	expect(ideas.length).toBe(0);
	expect(address.length).toBe(0);
	expect(notice[0].children[0]).toBe(
		"Notified 1 week before"
	);
	await act(() => promise);
});

it("renders correctly with data - anniversary event", async () => {
	const promise = Promise.resolve();
	store.dispatch({
		type: ADD_EVENT,
		eventData: weddingAddressIdeasNoNotificationYearLeapDay,
		events: [],
	});
	const props = {
		navigation: {
			setOptions: () => jest.fn(),
		},
		route: { params: { eventId: "1" } },
	};
	const { findAllByTestId, queryAllByTestId } = render(
		<Provider store={store}>
			<EventScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	const views = await findAllByTestId("dataView");
	expect(views.length).toBe(1);
	const years = queryAllByTestId("years");
	const leapDay = queryAllByTestId("leapDay");
	const names = queryAllByTestId("name");
	const pres = queryAllByTestId("cardOrPres");
	const ideas = queryAllByTestId("ideas");
	const address = queryAllByTestId("address");
	const notice = queryAllByTestId("notice");
	expect(years.length).toBe(1);
	expect(leapDay.length).toBe(1);
	expect(names[0].children[0]).toBe("Name & Name2");
	expect(pres[0].children[0]).toBe("Card and present");
	expect(ideas.length).toBe(1);
	expect(address.length).toBe(1);
	expect(notice.length).toBe(0);
	await act(() => promise);
});

it("renders correctly with data - delete event", async () => {
	const promise = Promise.resolve();
	store.dispatch({
		type: ADD_EVENT,
		eventData: defaultWithAddressStringId,
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
