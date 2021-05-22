import {
	applyMiddleware,
	combineReducers,
	createStore,
} from "redux";
import reducers from "../../store/reducers";
import ReduxThunk from "redux-thunk";
import {
	ADD_EVENT,
	DELETE_EVENT,
	SET_EVENTS,
	UPDATE_EVENT,
} from "../../store/actions";
import { eventData } from "../../store/storeTypes";

jest.mock("expo-sqlite");
jest.mock("../../store/actions");

const rootReducer = combineReducers({
	events: reducers,
});

const store = createStore(
	rootReducer,
	applyMiddleware(ReduxThunk)
);

it("add event", () => {
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
		} as eventData,
		events: [],
	});
	expect(store.getState().events.events.length).toBe(1);
});

it("set events", () => {
	store.dispatch({
		type: SET_EVENTS,
		eventData: {} as eventData,
		events: [
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
	});
	expect(store.getState().events.events.length).toBe(2);
});

it("update events", () => {
	store.dispatch({
		type: UPDATE_EVENT,
		eventData: {
			id: "1",
			firstName: "Name",
			secondName: "No name provided",
			day: 1,
			month: 0,
			type: "Birthday",
			startYear: 0,
			noticeTime: 2,
			present: false,
			ideas: "No present ideas provided",
			address: "1 Test Drive",
			pushNotification: true,
		} as eventData,
		events: [],
	});
	expect(store.getState().events.events.length).toBe(2);
	store.dispatch({
		type: UPDATE_EVENT,
		eventData: {
			id: "3",
			firstName: "Name",
			secondName: "No name provided",
			day: 1,
			month: 0,
			type: "Birthday",
			startYear: 0,
			noticeTime: 2,
			present: false,
			ideas: "No present ideas provided",
			address: "1 Test Drive",
			pushNotification: true,
		} as eventData,
		events: [],
	});
	expect(store.getState().events.events.length).toBe(2);
});

it("delete event", () => {
	store.dispatch({
		type: DELETE_EVENT,
		eventData: {
			id: "1",
			firstName: "",
			secondName: "",
			day: 0,
			month: 0,
			type: "",
			startYear: 0,
			noticeTime: 0,
			present: false,
			ideas: "",
			address: "",
			pushNotification: false,
		} as eventData,
		events: [],
	});
	expect(store.getState().events.events.length).toBe(1);
});
