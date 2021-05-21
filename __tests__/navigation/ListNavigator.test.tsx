import React from "react";
import AppNavigator from "../../navigation/AppNavigator";
import renderer from "react-test-renderer";
import { NavigationContainer } from "@react-navigation/native";
import { ListNavigator } from "../../navigation/ListNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import {
	render,
	act,
	fireEvent,
} from "@testing-library/react-native";
import { Provider, useSelector } from "react-redux";
import {
	applyMiddleware,
	combineReducers,
	createStore,
} from "redux";
import reducers from "../../store/reducers";
import * as actions from "../../store/actions";
import ReduxThunk from "redux-thunk";
import { ADD_EVENT } from "../../store/actions";
import { leapYear } from "../../helpers/formatting";
import ListScreen from "../../screens/ListScreen";
import EventScreen from "../../screens/EventScreen";
import AddEditScreen from "../../screens/AddEditScreen";
import { renderHook } from "@testing-library/react-hooks";

it(`returns stack navigator`, () => {
	const res = ListNavigator();
	expect(res).toBeTruthy();
	expect(res.type).toBe(createStackNavigator().Navigator);
});

jest.mock("expo-sqlite");
jest.mock("../../store/actions");
jest.mock("@expo/vector-icons/FontAwesome5", () => "Icon");
jest.mock("@expo/vector-icons/Ionicons", () => "Icon");
jest.mock(
	"react-native/Libraries/Animated/src/NativeAnimatedHelper"
);
it("navigate from list to event then to addEdit screen from header button", async () => {
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
	// @ts-ignore
	actions.loadEvents.mockReturnValue(() =>
		Promise.resolve({
			rows: {
				_array: [
					{
						id: 1,
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
				],
			},
		})
	);
	const { findAllByTestId, container } = render(
		<Provider store={store}>
			<NavigationContainer>
				<ListNavigator />
			</NavigationContainer>
		</Provider>
	);
	const event = await findAllByTestId("ListToEvent1");
	const listScreen = container.findAllByType(ListScreen);
	const spyNavList = jest.spyOn(
		listScreen[0].props.navigation,
		"navigate"
	);
	await fireEvent(event[0], "press");
	expect(spyNavList).toBeCalledWith("Event", {
		eventId: "1",
	});
	const eventScreen = container.findAllByType(EventScreen);
	const spyNavEvent = jest.spyOn(
		eventScreen[0].props.navigation,
		"navigate"
	);
	const editHeaderButton = await findAllByTestId(
		"EventToAddEdit"
	);
	await fireEvent(editHeaderButton[0], "press");
	expect(spyNavEvent).toBeCalledWith("AddEdit", {
		id: "1",
	});
	await act(() => promise);
});

it("navigate from list to event then to addEdit screen from custom button", async () => {
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
	// @ts-ignore
	actions.loadEvents.mockReturnValue(() =>
		Promise.resolve({
			rows: {
				_array: [
					{
						id: 1,
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
				],
			},
		})
	);
	jest.mock("react-redux", () => ({
		useSelector: jest.fn().mockReturnValue({
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
		}),
	}));

	const { findAllByTestId, container } = render(
		<Provider store={store}>
			<NavigationContainer>
				<ListNavigator />
			</NavigationContainer>
		</Provider>
	);
	const event = await findAllByTestId("ListToEvent1");
	const listScreen = container.findAllByType(ListScreen);
	const spyNavList = jest.spyOn(
		listScreen[0].props.navigation,
		"navigate"
	);
	await fireEvent(event[0], "press");
	expect(spyNavList).toBeCalledWith("Event", {
		eventId: "1",
	});

	const eventScreen = container.findAllByType(EventScreen);
	const spyNavEvent = jest.spyOn(
		eventScreen[0].props.navigation,
		"navigate"
	);
	const editCustomButton = await findAllByTestId(
		"EventToAddEditToo1"
	);
	await fireEvent(editCustomButton[0], "press");
	expect(spyNavEvent).toBeCalledWith("AddEdit", {
		id: "1",
	});
	await act(() => promise);
});

it("navigate from list to AddEdit screen", async () => {
	const promise = Promise.resolve();
	const rootReducer = combineReducers({
		events: reducers,
	});

	const store = createStore(
		rootReducer,
		applyMiddleware(ReduxThunk)
	);
	// @ts-ignore
	actions.loadEvents.mockReturnValue(() =>
		Promise.resolve({
			rows: {
				_array: [],
			},
		})
	);
	const { findAllByTestId, container } = render(
		<Provider store={store}>
			<NavigationContainer>
				<ListNavigator />
			</NavigationContainer>
		</Provider>
	);
	const customButton = await findAllByTestId(
		"ListToAddEditCustomButton"
	);
	const listScreen = container.findAllByType(ListScreen);
	const spyNav = jest.spyOn(
		listScreen[0].props.navigation,
		"navigate"
	);
	await fireEvent(customButton[0], "press");
	expect(spyNav).toBeCalledWith("AddEdit", {});
	await act(() => promise);
});

it("navigate from list to AddEdit screen using header button", async () => {
	const promise = Promise.resolve();
	const rootReducer = combineReducers({
		events: reducers,
	});

	const store = createStore(
		rootReducer,
		applyMiddleware(ReduxThunk)
	);
	// @ts-ignore
	actions.loadEvents.mockReturnValue(() =>
		Promise.resolve({
			rows: {
				_array: [],
			},
		})
	);
	const { findAllByTestId, container } = render(
		<Provider store={store}>
			<NavigationContainer>
				<ListNavigator />
			</NavigationContainer>
		</Provider>
	);
	const button = await findAllByTestId("ListToAddEdit");
	const listScreen = container.findAllByType(ListScreen);
	const spyNav = jest.spyOn(
		listScreen[0].props.navigation,
		"navigate"
	);
	await fireEvent(button[0], "press");
	expect(spyNav).toBeCalledWith("AddEdit", {});
	await act(() => promise);
});
