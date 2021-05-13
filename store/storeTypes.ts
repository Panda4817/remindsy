import Event from "../models/eventClass";

export interface eventData {
	id: string;
	firstName: string;
	secondName: string;
	day: number;
	month: number;
	type: string;
	startYear: number;
	noticeTime: number;
	present: boolean;
	ideas: string;
	address: string;
	pushNotification: boolean;
}

export interface myAction {
	type: string;
	eventData: eventData;
	events: Array<Event>;
}

export interface myState {
	events: Array<Event>;
}
