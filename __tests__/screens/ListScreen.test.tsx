import React from "react";
import renderer, { act } from "react-test-renderer";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import {
	applyMiddleware,
	combineReducers,
	createStore,
} from "redux";
import ListScreen, {
	getParams,
	screenOptions,
} from "../../screens/ListScreen";
import reducers from "../../store/reducers";
import ReduxThunk from "redux-thunk";
import { ADD_EVENT } from "../../store/actions";
import { leapYear } from "../../helpers/formatting";

jest.mock("expo-sqlite");
jest.mock("../../store/actions");
jest.mock("@expo/vector-icons/FontAwesome5", () => "Icon");
jest.mock("@expo/vector-icons/Ionicons", () => "Icon");
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
		navigation: {
			setOptions: () => jest.fn(),
			addListener: () => jest.fn(),
		},
		route: { params: {} },
	};
	const tree = renderer.create(
		<Provider store={store}>
			<ListScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	expect(tree).toMatchSnapshot();
	await act(() => promise);
});

it("renders correctly with no results", async () => {
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
			addListener: () => jest.fn(),
		},
		route: { params: {} },
	};
	React.useState = jest
		.fn()
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce(["", jest.fn()]);

	const { container, findAllByTestId } = render(
		<Provider store={store}>
			<ListScreen
				navigation={props.navigation}
				route={props.route}
			/>
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
			addListener: () => jest.fn(),
		},
		route: { params: {} },
	};
	React.useState = jest
		.fn()
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce(["", jest.fn()]);
	const { container, findAllByTestId } = render(
		<Provider store={store}>
			<ListScreen
				navigation={props.navigation}
				route={props.route}
			/>
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

	const { container, findAllByTestId } = render(
		<Provider store={store}>
			<ListScreen
				navigation={props.navigation}
				route={props.route}
			/>
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
			addListener: () => jest.fn(),
		},
		route: { params: {} },
	};
	React.useState = jest
		.fn()
		.mockReturnValueOnce([true, jest.fn()])
		.mockReturnValueOnce([false, jest.fn()])
		.mockReturnValueOnce(["", jest.fn()]);
	const { container, findAllByTestId } = render(
		<Provider store={store}>
			<ListScreen
				navigation={props.navigation}
				route={props.route}
			/>
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

	const { container, findAllByTestId } = render(
		<Provider store={store}>
			<ListScreen
				navigation={props.navigation}
				route={props.route}
			/>
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
			day: new Date().getDate() >= 28 ? 1 : 28,
			month: new Date().getMonth(),
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
	const { container, findAllByTestId } = render(
		<Provider store={store}>
			<ListScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	const views = await findAllByTestId("noResultsView");
	expect(views).toBeTruthy();
	expect(screenOptions(props)).toStrictEqual({
		headerTitle: `${new Date().toDateString()}`,
	});
	await act(() => promise);
});

it("renders correctly with props and results but results filtered out (leapday)", async () => {
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
			day: 29,
			month: 1,
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
	const { container, findAllByTestId } = render(
		<Provider store={store}>
			<ListScreen
				navigation={props.navigation}
				route={props.route}
			/>
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
