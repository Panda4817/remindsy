import React from "react";
import { CalendarNavigator } from "../../navigation/CalendarNavigator";
import { NavigationContainer } from "@react-navigation/native";
import {
	applyMiddleware,
	combineReducers,
	createStore,
} from "redux";
import reducers from "../../store/reducers";
import { createStackNavigator } from "@react-navigation/stack";
import {
	render,
	act,
	fireEvent,
	waitFor,
} from "@testing-library/react-native";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import CalendarScreen from "../../screens/CalendarScreen";
import { ADD_EVENT } from "../../store/actions";
import { CalendarList } from "react-native-calendars";
import { convertToNextDate } from "../../helpers/formatting";
import colours from "../../constants/Colours";
jest.mock("expo-sqlite");
jest.mock("../../store/actions");
jest.mock("@expo/vector-icons/FontAwesome5", () => "Icon");
jest.mock("@expo/vector-icons/Ionicons", () => "Icon");
jest.mock(
	"react-native/Libraries/Animated/src/NativeAnimatedHelper"
);
it(`returns stack navigator`, async () => {
	const promise = Promise.resolve();
	const res = CalendarNavigator();
	expect(res).toBeTruthy();
	expect(res.type).toBe(createStackNavigator().Navigator);
	await act(() => promise);
});

it("navigate from Calendar (no events) to AddEdit screen using header button", async () => {
	const promise = Promise.resolve();
	const rootReducer = combineReducers({
		events: reducers,
	});

	const store = createStore(
		rootReducer,
		applyMiddleware(ReduxThunk)
	);
	const { findAllByTestId, container } = render(
		<Provider store={store}>
			<NavigationContainer>
				<CalendarNavigator />
			</NavigationContainer>
		</Provider>
	);
	const button = await findAllByTestId("calendarToAddEdit");
	const calendarScreen =
		container.findAllByType(CalendarScreen);
	const spyNav = jest.spyOn(
		calendarScreen[0].props.navigation,
		"navigate"
	);
	await act(async () => fireEvent(button[0], "press"));
	expect(spyNav).toBeCalledWith("AddEdit", {});
	await act(() => promise);
});

it("navigate from Calendar (with events) to AddEdit screen using header button", async () => {
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
			id: "3",
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
	jest.mock("react-redux", () => ({
		useSelector: jest.fn().mockReturnValue([
			{
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
			{
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
			{
				id: "3",
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
		]),
	}));
	const { findAllByTestId, container } = render(
		<Provider store={store}>
			<NavigationContainer>
				<CalendarNavigator />
			</NavigationContainer>
		</Provider>
	);
	const button = await findAllByTestId("calendarToAddEdit");
	const calendarScreen =
		container.findAllByType(CalendarScreen);
	const spyNav = jest.spyOn(
		calendarScreen[0].props.navigation,
		"navigate"
	);
	await act(async () => fireEvent(button[0], "press"));
	expect(spyNav).toBeCalledWith("AddEdit", {});
	await act(() => promise);
});
