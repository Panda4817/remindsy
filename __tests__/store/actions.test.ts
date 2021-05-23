import * as actions from "../../store/actions";
import { eventData } from "../../store/storeTypes";
import * as db from "../../helpers/db";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { act } from "@testing-library/react-native";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({ events: [] });
const expected_actions: any[] = [];

it("add event action", async () => {
	const spy = jest.spyOn(db, "insertEvent");
	spy.mockReturnValue(Promise.resolve({ insertId: 1 }));
	await act(() =>
		store.dispatch(
			//@ts-ignore
			actions.addEvent(
				"Name",
				"No name provided",
				1,
				0,
				"Birthday",
				0,
				1,
				false,
				"No present ideas provided",
				"1 Test Drive",
				true
			)
		)
	);
	expect(spy).toBeCalled();
	expected_actions.push({
		type: actions.ADD_EVENT,
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
	expect(store.getActions()).toEqual(expected_actions);
});

it("add event action with error", async () => {
	const spy = jest.spyOn(db, "insertEvent");
	spy.mockReturnValue(Promise.resolve({}));
	const spyAction = jest.spyOn(actions, "addEvent");
	await act(() =>
		store.dispatch(
			//@ts-ignore
			actions.addEvent(
				"Name",
				"No name provided",
				1,
				0,
				"Birthday",
				0,
				1,
				false,
				"No present ideas provided",
				"1 Test Drive",
				true
			)
		)
	).then(() => {
		expect(spy).toBeCalled();
		expect(store.getActions()).toEqual(expected_actions);
		expect(spyAction).toThrowError();
	});
});

it("edit event action", async () => {
	const spy = jest.spyOn(db, "updateEvent");
	spy.mockReturnValue(Promise.resolve({}));
	await act(() =>
		store.dispatch(
			//@ts-ignore
			actions.editEvent(
				1,
				"Name",
				"No name provided",
				1,
				0,
				"Birthday",
				0,
				2,
				false,
				"No present ideas provided",
				"1 Test Drive",
				true
			)
		)
	);
	expect(spy).toBeCalled();
	expected_actions.push({
		type: actions.UPDATE_EVENT,
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
	expect(store.getActions()).toEqual(expected_actions);
});

it("edit event action with error", async () => {
	const spy = jest.spyOn(db, "updateEvent");
	spy.mockReturnValue(Promise.resolve({}));
	const spyAction = jest.spyOn(actions, "editEvent");
	await act(() =>
		store.dispatch(
			//@ts-ignore
			actions.editEvent()
		)
	).then(() => {
		expect(spy).toBeCalled();
		expect(store.getActions()).toEqual(expected_actions);
		expect(spyAction).toThrowError();
	});
});

it("load events action", async () => {
	const spy = jest.spyOn(db, "getEvents");
	spy.mockReturnValue(
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
						noticeTime: 2,
						present: false,
						ideas: "No present ideas provided",
						address: "1 Test Drive",
						pushNotification: true,
					},
				],
			},
		})
	);
	await act(() =>
		store.dispatch(
			//@ts-ignore
			actions.loadEvents()
		)
	);
	expect(spy).toBeCalled();
	expected_actions.push({
		type: actions.SET_EVENTS,
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
				noticeTime: 2,
				present: false,
				ideas: "No present ideas provided",
				address: "1 Test Drive",
				pushNotification: true,
			},
		],
	});
	expect(store.getActions()).toEqual(expected_actions);
});

it("load events action with error", async () => {
	const spy = jest.spyOn(db, "getEvents");
	spy.mockReturnValue(
		Promise.resolve({
			rows: {},
		})
	);
	const spyAction = jest.spyOn(actions, "loadEvents");
	await act(() =>
		store.dispatch(
			//@ts-ignore
			actions.loadEvents()
		)
	).then(() => {
		expect(spy).toBeCalled();
		expect(store.getActions()).toEqual(expected_actions);
		expect(spyAction).toThrowError();
	});
});

it("delete event action", async () => {
	const spy = jest.spyOn(db, "deleteEvent");
	spy.mockReturnValue(Promise.resolve({}));
	await act(() =>
		store.dispatch(
			//@ts-ignore
			actions.delEvent(1)
		)
	);
	expect(spy).toBeCalled();
	expected_actions.push({
		type: actions.DELETE_EVENT,
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
	expect(store.getActions()).toEqual(expected_actions);
});

it("delete event action with error", async () => {
	const spy = jest.spyOn(db, "deleteEvent");
	spy.mockReturnValue(Promise.resolve({}));
	const spyAction = jest.spyOn(actions, "delEvent");
	await act(() =>
		store.dispatch(
			//@ts-ignore
			actions.delEvent()
		)
	).then(() => {
		expect(spy).toBeCalled();
		expect(store.getActions()).toEqual(expected_actions);
		expect(spyAction).toThrowError();
	});
});
