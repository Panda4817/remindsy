import React from "react";
import renderer, { act } from "react-test-renderer";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ListScreen, { getParams, screenOptions } from "../../screens/ListScreen";
import reducers from "../../store/reducers";
import ReduxThunk from "redux-thunk";
import { ADD_EVENT } from "../../store/actions";
import { leapYear } from "../../helpers/formatting";
import {
	defaultWithAddressStringId,
	defaultNotLeapDayAddress,
	defaultAddressLeapDay,
} from "../fakeEvents.config";

jest.mock("expo-sqlite");
jest.mock("../../store/actions");
jest.mock("@expo/vector-icons/FontAwesome5", () => "Icon");
jest.mock("@expo/vector-icons/Ionicons", () => "Icon");
let store: any;
beforeEach(() => {
	const rootReducer = combineReducers({
		events: reducers,
	});
	store = createStore(rootReducer, applyMiddleware(ReduxThunk));
});
it("renders correctly (snapshot)", async () => {
	const promise = Promise.resolve();
	const props = {
		navigation: {
			setOptions: () => jest.fn(),
			addListener: () => jest.fn(),
		},
		route: { params: {} },
	};
	const tree = renderer.create(
		<Provider store={store}>
			<ListScreen navigation={props.navigation} route={props.route} />
		</Provider>
	);
	expect(tree).toMatchSnapshot();
	await act(() => promise);
});

it("renders correctly with no results", async () => {
	const promise = Promise.resolve();
	const props = {
		navigation: {
			setOptions: () => jest.fn(),
			addListener: () => jest.fn(),
		},
		route: { params: {} },
	};
	React.useState = jest
		.fn()
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce(["", jest.fn()]);

	const { findAllByTestId } = render(
		<Provider store={store}>
			<ListScreen navigation={props.navigation} route={props.route} />
		</Provider>
	);
	const views = await findAllByTestId("noResultsView");
	expect(views).toBeTruthy();
	expect(screenOptions(props)).toStrictEqual({
		headerTitle: "Upcoming Remindsys",
	});
	await act(() => promise);
});

it("renders correctly with results", async () => {
	const promise = Promise.resolve();
	store.dispatch({
		type: ADD_EVENT,
		eventData: defaultWithAddressStringId,
		events: [],
	});
	const props = {
		navigation: {
			setOptions: () => jest.fn(),
			addListener: () => jest.fn(),
		},
		route: { params: {} },
	};
	React.useState = jest
		.fn()
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce(["", jest.fn()]);
	const { findAllByTestId } = render(
		<Provider store={store}>
			<ListScreen navigation={props.navigation} route={props.route} />
		</Provider>
	);
	const views = await findAllByTestId("resultsView");
	expect(views).toBeTruthy();
	expect(screenOptions(props)).toStrictEqual({
		headerTitle: "Upcoming Remindsys",
	});
	await act(() => promise);
});

it("renders correctly with error", async () => {
	const promise = Promise.resolve();
	const props = {
		navigation: {
			setOptions: () => jest.fn(),
			addListener: () => jest.fn(),
		},
		route: { params: {} },
	};
	const error = "error";
	React.useState = jest
		.fn()
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce([error, jest.fn()]);

	const { findAllByTestId } = render(
		<Provider store={store}>
			<ListScreen navigation={props.navigation} route={props.route} />
		</Provider>
	);

	const views = await findAllByTestId("errorView");
	expect(views).toBeTruthy();
	expect(screenOptions(props)).toStrictEqual({
		headerTitle: "Upcoming Remindsys",
	});
	await act(() => promise);
});

it("renders correctly with loading view", async () => {
	const promise = Promise.resolve();
	const props = {
		navigation: {
			setOptions: () => jest.fn(),
			addListener: () => jest.fn(),
		},
		route: { params: {} },
	};
	React.useState = jest
		.fn()
		.mockReturnValueOnce([true, jest.fn()])
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce(["", jest.fn()]);
	const { findAllByTestId } = render(
		<Provider store={store}>
			<ListScreen navigation={props.navigation} route={props.route} />
		</Provider>
	);

	const views = await findAllByTestId("loadingView");
	expect(views).toBeTruthy();
	expect(screenOptions(props)).toStrictEqual({
		headerTitle: "Upcoming Remindsys",
	});
	await act(() => promise);
});

it("renders correctly with props and no results", async () => {
	const promise = Promise.resolve();
	const props = {
		navigation: {
			setOptions: () => jest.fn(),
			addListener: () => jest.fn(),
		},
		route: {
			params: {
				filterDay: new Date().getDate(),
				filterMonth: new Date().getMonth() + 1,
				filterYear: new Date().getFullYear(),
			},
		},
	};
	React.useState = jest
		.fn()
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce(["", jest.fn()]);

	const { findAllByTestId } = render(
		<Provider store={store}>
			<ListScreen navigation={props.navigation} route={props.route} />
		</Provider>
	);
	const views = await findAllByTestId("noResultsView");
	expect(views).toBeTruthy();
	expect(screenOptions(props)).toStrictEqual({
		headerTitle: `${new Date().toDateString()}`,
	});
	await act(() => promise);
});

it("renders correctly with props and results but results filtered out", async () => {
	const promise = Promise.resolve();
	store.dispatch({
		type: ADD_EVENT,
		eventData: defaultNotLeapDayAddress,
		events: [],
	});
	const props = {
		navigation: {
			setOptions: () => jest.fn(),
			addListener: () => jest.fn(),
		},
		route: {
			params: {
				filterDay: new Date().getDate(),
				filterMonth: new Date().getMonth() + 1,
				filterYear: new Date().getFullYear(),
			},
		},
	};
	React.useState = jest
		.fn()
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce(["", jest.fn()]);
	const { findAllByTestId } = render(
		<Provider store={store}>
			<ListScreen navigation={props.navigation} route={props.route} />
		</Provider>
	);
	const views = await findAllByTestId("noResultsView");
	expect(views).toBeTruthy();
	expect(screenOptions(props)).toStrictEqual({
		headerTitle: `${new Date().toDateString()}`,
	});
	await act(() => promise);
});

it("renders correctly with props and results with filtering", async () => {
	const promise = Promise.resolve();
	store.dispatch({
		type: ADD_EVENT,
		eventData: defaultNotLeapDayAddress,
		events: [],
	});
	const props = {
		navigation: {
			setOptions: () => jest.fn(),
			addListener: () => jest.fn(),
		},
		route: {
			params: {
				filterDay: new Date().getDate() >= 28 ? 1 : 28,
				filterMonth: new Date().getMonth() + 1,
				filterYear: new Date().getFullYear(),
			},
		},
	};
	React.useState = jest
		.fn()
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce(["", jest.fn()]);
	const { findAllByTestId } = render(
		<Provider store={store}>
			<ListScreen navigation={props.navigation} route={props.route} />
		</Provider>
	);
	const views = await findAllByTestId("resultsView");
	expect(views).toBeTruthy();
	expect(screenOptions(props)).toStrictEqual({
		headerTitle: `${new Date(
			props.route.params.filterYear,
			props.route.params.filterMonth - 1,
			props.route.params.filterDay
		).toDateString()}`,
	});
	await act(() => promise);
});

it("renders correctly with props and results but results filtered out (leap Day)", async () => {
	const promise = Promise.resolve();
	store.dispatch({
		type: ADD_EVENT,
		eventData: defaultAddressLeapDay,
		events: [],
	});
	const year = leapYear(new Date().getFullYear())
		? new Date().getFullYear() + 1
		: new Date().getFullYear();
	const props = {
		navigation: {
			setOptions: () => jest.fn(),
			addListener: () => jest.fn(),
		},
		route: {
			params: {
				filterDay: 28,
				filterMonth: 2,
				filterYear: year,
			},
		},
	};
	React.useState = jest
		.fn()
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce(["", jest.fn()]);
	const { findAllByTestId } = render(
		<Provider store={store}>
			<ListScreen navigation={props.navigation} route={props.route} />
		</Provider>
	);
	const views = await findAllByTestId("resultsView");
	expect(views).toBeTruthy();
	expect(screenOptions(props)).toStrictEqual({
		headerTitle: `${new Date(year, 1, 28).toDateString()}`,
	});
	await act(() => promise);
});

it("getParams", () => {
	const props = {
		navigation: {},
		route: {
			params: {
				filterDay: new Date().getDate(),
				filterMonth: new Date().getMonth() + 1,
				filterYear: new Date().getFullYear(),
			},
		},
	};
	expect(getParams(props.route)).toStrictEqual({
		filterDay: props.route.params.filterDay,
		filterMonth: props.route.params.filterMonth,
	});
	const props2 = {
		navigation: {},
		route: {},
	};
	expect(getParams(props2.route)).toStrictEqual({});
	const props3 = {
		navigation: {},
		route: {
			params: {},
		},
	};
	expect(getParams(props3.route)).toStrictEqual({});
});
