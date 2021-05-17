import { ThunkDispatch } from "redux-thunk";
import Event from "../models/eventClass";
import { myState } from "./storeTypes";
import { myAction, eventData } from "./storeTypes";
import * as SQLite from "expo-sqlite";

export const SET_EVENTS = "SET_EVENTS";
export const ADD_EVENT = "ADD_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";

import {
	createDb,
	getEvents,
	insertEvent,
	updateEvent,
	deleteEvent,
} from "../helpers/db";
const db = createDb(SQLite);
export const addEvent = (
	firstName: string,
	secondName: string,
	day: number,
	month: number,
	type: string,
	startYear: number,
	noticeTime: number,
	present: boolean,
	ideas: string,
	address: string,
	pushNotification: boolean
) => {
	return async (
		dispatch: ThunkDispatch<myState, any, myAction>
	) => {
		try {
			const dbResult: any = await insertEvent(
				db,
				firstName,
				secondName,
				day,
				month,
				type,
				startYear,
				noticeTime,
				present,
				ideas,
				address,
				pushNotification
			);
			dispatch({
				type: ADD_EVENT,
				eventData: {
					id: dbResult.insertId.toString(),
					firstName: firstName,
					secondName: secondName,
					day: day,
					month: month,
					type: type,
					startYear: startYear,
					noticeTime: noticeTime,
					present: present,
					ideas: ideas,
					address: address,
					pushNotification: pushNotification,
				} as eventData,
				events: [],
			} as myAction);
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const editEvent = (
	id: number,
	firstName: string,
	secondName: string,
	day: number,
	month: number,
	type: string,
	startYear: number,
	noticeTime: number,
	present: boolean,
	ideas: string,
	address: string,
	pushNotification: boolean
) => {
	return async (
		dispatch: ThunkDispatch<myState, any, myAction>
	) => {
		try {
			const dbResult: any = await updateEvent(
				db,
				id,
				firstName,
				secondName,
				day,
				month,
				type,
				startYear,
				noticeTime,
				present,
				ideas,
				address,
				pushNotification
			);
			dispatch({
				type: UPDATE_EVENT,
				eventData: {
					id: id.toString(),
					firstName: firstName,
					secondName: secondName,
					day: day,
					month: month,
					type: type,
					startYear: startYear,
					noticeTime: noticeTime,
					present: present,
					ideas: ideas,
					address: address,
					pushNotification: pushNotification,
				} as eventData,
				events: [],
			} as myAction);
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const loadEvents = () => {
	return async (
		dispatch: ThunkDispatch<myState, any, myAction>
	) => {
		try {
			const dbResult: any = await getEvents(db);
			dispatch({
				type: SET_EVENTS,
				eventData: {} as eventData,
				events: dbResult.rows._array.map((e: any) => {
					return new Event(
						e.id.toString(),
						e.firstName,
						e.secondName,
						e.day,
						e.month,
						e.type,
						e.startYear,
						e.noticeTime,
						e.present,
						e.ideas,
						e.address,
						e.pushNotification
					);
				}),
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const delEvent = (id: number) => {
	return async (
		dispatch: ThunkDispatch<myState, any, myAction>
	) => {
		try {
			const dbResult: any = await deleteEvent(db, id);
			dispatch({
				type: DELETE_EVENT,
				eventData: {
					id: id.toString(),
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
			} as myAction);
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
