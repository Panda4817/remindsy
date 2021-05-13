import {
	ADD_EVENT,
	SET_EVENTS,
	UPDATE_EVENT,
	DELETE_EVENT,
} from "./actions";
import Event from "../models/eventClass";
import "react-native-get-random-values";
import { myState, myAction, eventData } from "./storeTypes";
import {
	createNotification,
	updateNotification,
	deleteNotification,
} from "../helpers/notifications";

const initialState = {
	events: [],
} as myState;

export default (state = initialState, action: myAction) => {
	switch (action.type) {
		case ADD_EVENT:
			const newEvent = new Event(
				action.eventData.id,
				action.eventData.firstName,
				action.eventData.secondName,
				action.eventData.day,
				action.eventData.month,
				action.eventData.type,
				action.eventData.startYear,
				action.eventData.noticeTime,
				action.eventData.present,
				action.eventData.ideas,
				action.eventData.address,
				action.eventData.pushNotification
			);
			if (newEvent.pushNotification === true) {
				createNotification(newEvent);
			}
			return {
				events: state.events.concat(newEvent),
			};
		case SET_EVENTS:
			return {
				events: action.events,
			};
		case UPDATE_EVENT:
			const index = state.events.findIndex(
				(event) => event.id == action.eventData.id
			);
			const updatedEvent = new Event(
				action.eventData.id,
				action.eventData.firstName,
				action.eventData.secondName,
				action.eventData.day,
				action.eventData.month,
				action.eventData.type,
				action.eventData.startYear,
				action.eventData.noticeTime,
				action.eventData.present,
				action.eventData.ideas,
				action.eventData.address,
				action.eventData.pushNotification
			);
			updateNotification(updatedEvent);
			if (index >= 0) {
				return {
					events: state.events
						.slice(0, index)
						.concat(updatedEvent)
						.concat(state.events.slice(index + 1)),
				};
			} else {
				return state;
			}

		case DELETE_EVENT:
			deleteNotification(action.eventData.id);
			return {
				events: state.events.filter(
					(event) => event.id !== action.eventData.id
				),
			};
		default:
			return state;
	}
};
