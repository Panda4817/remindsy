import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ListNavigator } from "../../navigation/ListNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { render, act, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import reducers from "../../store/reducers";
import * as actions from "../../store/actions";
import ReduxThunk from "redux-thunk";
import { ADD_EVENT } from "../../store/actions";
import ListScreen from "../../screens/ListScreen";
import EventScreen from "../../screens/EventScreen";
import AddEditScreen from "../../screens/AddEditScreen";
import FormikForm from "../../components/appSpecific/FormikForm";
import { defaultWithAddressNumId, defaultWithAddressStringId } from "../fakeEvents.config";

jest.mock("expo-sqlite");
jest.mock("../../store/actions");
jest.mock("@expo/vector-icons/FontAwesome5", () => "Icon");
jest.mock("@expo/vector-icons/Ionicons", () => "Icon");
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("react-native/Libraries/Components/Switch/Switch", () => {
	const mockComponent = require("react-native/jest/mockComponent");
	return mockComponent("react-native/Libraries/Components/Switch/Switch");
});
let store: any;
beforeEach(() => {
	const rootReducer = combineReducers({
		events: reducers,
	});
	store = createStore(rootReducer, applyMiddleware(ReduxThunk));
});
it(`returns stack navigator`, async () => {
	const promise = Promise.resolve();
	const res = ListNavigator();
	expect(res).toBeTruthy();
	expect(res.type).toBe(createStackNavigator().Navigator);
	await act(() => promise);
});

it("navigate from list to event then to addEdit screen from header button, then submit", async () => {
	const promise = Promise.resolve();

	store.dispatch({
		type: ADD_EVENT,
		eventData: defaultWithAddressStringId,
		events: [],
	});
	// @ts-ignore
	actions.loadEvents.mockReturnValue(() =>
		Promise.resolve({
			rows: {
				_array: [defaultWithAddressNumId],
			},
		})
	);
	// @ts-ignore
	actions.editEvent.mockReturnValue(() => Promise.resolve());

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

	const { findAllByTestId, container, getAllByTestId } = render(
		<Provider store={store}>
			<NavigationContainer>
				<ListNavigator />
			</NavigationContainer>
		</Provider>
	);
	const event = await findAllByTestId("ListToEvent1");
	const listScreen = container.findAllByType(ListScreen);
	const spyNavList = jest.spyOn(listScreen[0].props.navigation, "navigate");
	await act(async () => fireEvent(event[0], "press"));
	expect(spyNavList).toBeCalledWith("Event", {
		eventId: "1",
	});
	const eventScreen = container.findAllByType(EventScreen);
	const spyNavEvent = jest.spyOn(eventScreen[0].props.navigation, "navigate");
	const editHeaderButton = getAllByTestId("EventToAddEdit");
	await act(async () => fireEvent(editHeaderButton[0], "press"));
	expect(spyNavEvent).toBeCalledWith("AddEdit", {
		id: "1",
	});

	const addEdit = container.findAllByType(AddEditScreen);
	expect(addEdit[0].props.route.params.id).not.toBeUndefined();
	const form = container.findAllByType(FormikForm);
	expect(form[0].props.selectedEvent).not.toBeUndefined();
	const spyNavGoBack = jest.spyOn(addEdit[0].props.navigation, "goBack");
	const buttonSubmit = getAllByTestId("submitButton");
	await act(async () => fireEvent(buttonSubmit[0], "press"));
	expect(spyNavGoBack).toBeCalled();

	await act(() => promise);
});

it("navigate from list to event then to addEdit screen from custom button", async () => {
	const promise = Promise.resolve();

	store.dispatch({
		type: ADD_EVENT,
		eventData: defaultWithAddressStringId,
		events: [],
	});
	// @ts-ignore
	actions.loadEvents.mockReturnValue(() =>
		Promise.resolve({
			rows: {
				_array: [defaultWithAddressNumId],
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

	const { findAllByTestId, container, getAllByTestId } = render(
		<Provider store={store}>
			<NavigationContainer>
				<ListNavigator />
			</NavigationContainer>
		</Provider>
	);
	const event = await findAllByTestId("ListToEvent1");
	const listScreen = container.findAllByType(ListScreen);
	const spyNavList = jest.spyOn(listScreen[0].props.navigation, "navigate");
	await act(async () => fireEvent(event[0], "press"));
	expect(spyNavList).toBeCalledWith("Event", {
		eventId: "1",
	});

	const eventScreen = container.findAllByType(EventScreen);
	const spyNavEvent = jest.spyOn(eventScreen[0].props.navigation, "navigate");
	const editCustomButton = getAllByTestId("EventToAddEditToo1");
	await act(async () => fireEvent(editCustomButton[0], "press"));
	expect(spyNavEvent).toBeCalledWith("AddEdit", {
		id: "1",
	});
	await act(() => promise);
});

it("navigate from list to AddEdit screen", async () => {
	const promise = Promise.resolve();
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
	const customButton = await findAllByTestId("ListToAddEditCustomButton");
	const listScreen = container.findAllByType(ListScreen);
	const spyNav = jest.spyOn(listScreen[0].props.navigation, "navigate");
	await act(async () => fireEvent(customButton[0], "press"));
	expect(spyNav).toBeCalledWith("AddEdit", {});
	await act(() => promise);
});

it("navigate from list to AddEdit screen using header button", async () => {
	const promise = Promise.resolve();
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
	const spyNav = jest.spyOn(listScreen[0].props.navigation, "navigate");
	await act(async () => fireEvent(button[0], "press"));
	expect(spyNav).toBeCalledWith("AddEdit", {});
	await act(() => promise);
});

it("navigate from list to AddEdit screen using header button and submit form", async () => {
	const promise = Promise.resolve();
	// @ts-ignore
	actions.loadEvents
		// @ts-ignore
		.mockReturnValueOnce(() =>
			Promise.resolve({
				rows: {
					_array: [],
				},
			})
		)
		.mockReturnValueOnce(() =>
			Promise.resolve({
				rows: {
					_array: [
						{
							id: 1,
							firstName: "Name",
							secondName: "No name provided",
							day: new Date().getDate(),
							month: new Date().getMonth(),
							type: "Birthday",
							startYear: 0,
							noticeTime: 1,
							present: false,
							ideas: "No present ideas provided",
							address: "No address provided",
							pushNotification: true,
						},
					],
				},
			})
		);

	// @ts-ignore
	actions.addEvent.mockReturnValueOnce(() =>
		Promise.resolve({
			insertedId: 1,
		})
	);
	const { findAllByTestId, container, getAllByTestId } = render(
		<Provider store={store}>
			<NavigationContainer>
				<ListNavigator />
			</NavigationContainer>
		</Provider>
	);
	const button = await findAllByTestId("ListToAddEdit");
	const listScreen = container.findAllByType(ListScreen);
	const spyNav = jest.spyOn(listScreen[0].props.navigation, "navigate");
	await act(async () => fireEvent(button[0], "press"));
	expect(spyNav).toBeCalledWith("AddEdit", {});

	const addEdit = container.findAllByType(AddEditScreen);
	expect(addEdit[0].props.route.params.id).toBeUndefined();
	const spyNavGoBack = jest.spyOn(addEdit[0].props.navigation, "goBack");
	const form = container.findAllByType(FormikForm);
	expect(form[0].props.selectedEvent).toBeUndefined();
	const input = getAllByTestId("firstNameInput");
	await act(async () => fireEvent(input[0], "onChangeText", "Name"));
	const buttonSubmit = getAllByTestId("submitButton");
	await act(async () => fireEvent(buttonSubmit[0], "press"));
	expect(spyNavGoBack).toBeCalled();
	await act(() => promise);
});
