import React from "react";
import renderer from "react-test-renderer";
import AddEditScreen, {
	screenOptions,
} from "../../screens/AddEditScreen";
import { Provider } from "react-redux";
import {
	applyMiddleware,
	combineReducers,
	createStore,
} from "redux";
import reducers from "../../store/reducers";
import ReduxThunk from "redux-thunk";
import { ADD_EVENT } from "../../store/actions";
import { act, render } from "@testing-library/react-native";
import FormikForm, {
	formatValues,
} from "../../components/appSpecific/FormikForm";
import { Formik } from "formik";

jest.useFakeTimers();
jest.mock("@expo/vector-icons/FontAwesome5", () => "Icon");
jest.mock(
	"react-native/Libraries/Components/Switch/Switch",
	() => {
		const mockComponent = require("react-native/jest/mockComponent");
		return mockComponent(
			"react-native/Libraries/Components/Switch/Switch"
		);
	}
);
jest.mock("expo-sqlite");
jest.mock("../../store/actions");
it("renders correctly with empty params", async () => {
	const rootReducer = combineReducers({
		events: reducers,
	});

	const store = createStore(
		rootReducer,
		applyMiddleware(ReduxThunk)
	);
	const props = {
		navigation: {},
		route: { params: {} },
	};
	const tree = renderer.create(
		<Provider store={store}>
			<AddEditScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	expect(tree).toMatchSnapshot();
	expect(
		tree.root.props.store.getState().events.events.length
	).toBe(0);
	expect(screenOptions(props)).toStrictEqual({
		headerTitle: "Add a Remindsy",
	});
});

it("renders correctly with id params", async () => {
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
		navigation: {},
		route: { params: { id: "1" } },
	};
	const tree = renderer.create(
		<Provider store={store}>
			<AddEditScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	expect(tree).toMatchSnapshot();
	expect(
		tree.root.props.store.getState().events.events.length
	).toBe(1);
	expect(screenOptions(props)).toStrictEqual({
		headerTitle: "Edit a Remindsy",
	});
});

it("renders correctly with filterDates params", async () => {
	const rootReducer = combineReducers({
		events: reducers,
	});

	const store = createStore(
		rootReducer,
		applyMiddleware(ReduxThunk)
	);
	const props = {
		navigation: {},
		route: { params: { filterDay: 1, filterMonth: 1 } },
	};
	const tree = renderer.create(
		<Provider store={store}>
			<AddEditScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	expect(tree).toMatchSnapshot();
	expect(
		tree.root.props.store.getState().events.events.length
	).toBe(0);
	expect(screenOptions(props)).toStrictEqual({
		headerTitle: "Add a Remindsy",
	});
});

it("submitHandler with existing event", async () => {
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
		navigation: { goBack: () => true },
		route: { params: { id: "1" } },
	};
	const { container } = render(
		<Provider store={store}>
			<AddEditScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	const form = container.findAllByType(FormikForm)[0];
	const formik = container.findAllByType(Formik)[0];
	const spy = jest.spyOn(props.navigation, "goBack");
	await act(() =>
		form.props.submitHandler(formik.props.initialValues)
	);
	expect(
		container.props.store.getState().events.events.length
	).toBe(1);
	expect(spy).toBeCalled;

	await act(() => promise);
});

it("submitHandler with new event", async () => {
	const promise = Promise.resolve();
	const rootReducer = combineReducers({
		events: reducers,
	});

	const store = createStore(
		rootReducer,
		applyMiddleware(ReduxThunk)
	);
	const props = {
		navigation: { goBack: () => true },
		route: { params: {} },
	};
	const { container } = render(
		<Provider store={store}>
			<AddEditScreen
				navigation={props.navigation}
				route={props.route}
			/>
		</Provider>
	);
	const form = container.findAllByType(FormikForm)[0];
	const formik = container.findAllByType(Formik)[0];
	const spy = jest.spyOn(props.navigation, "goBack");
	formik.props.initialValues.firstName = "Name";
	const values = formatValues(formik.props.initialValues);
	await act(() => form.props.submitHandler(values));
	expect(spy).toBeCalled;
	await act(() => promise);
});
