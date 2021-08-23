/* istanbul ignore file */
import Event from "../models/eventClass";

export const defaultEventWithNotificationOff: Event = new Event(
	"1",
	"Name",
	"No name provided",
	1,
	0,
	"Birthday",
	0,
	1,
	false,
	"No present ideas provided",
	"No address provided",
	false
);

export const defaultEventWithAddress: Event = new Event(
	"1",
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
);

export const birthdayWithYear: Event = new Event(
	"1",
	"Name",
	"No name provided",
	1,
	0,
	"Birthday",
	1991,
	1,
	false,
	"No ideas provided",
	"No address provided",
	true
);
export const futureEventNoNotification: Event = new Event(
	"4",
	"future",
	"No name provided",
	2,
	0,
	"Birthday",
	new Date().getFullYear() + 1,
	1,
	false,
	"No ideas provided",
	"No address provided",
	false
);
export const weddingAnniversary: Event = new Event(
	"2",
	"Name2",
	"Name3",
	2,
	0,
	"Wedding Anniversary",
	0,
	2,
	true,
	"No ideas provided",
	"No address provided",
	true
);

export const weddingEventWithAddress: Event = new Event(
	"1",
	"Name",
	"No name provided",
	1,
	0,
	"Wedding Anniversary",
	0,
	1,
	false,
	"No present ideas provided",
	"1 Test Drive",
	true
);

export const otherEventWithAddress: Event = new Event(
	"1",
	"Name",
	"No name provided",
	1,
	0,
	"Other",
	0,
	1,
	false,
	"No present ideas provided",
	"1 Test Drive",
	true
);

export const otherWithYearNoNotification: Event = new Event(
	"3",
	"NameOther",
	"No name provided",
	2,
	0,
	"Other",
	1991,
	1,
	false,
	"No ideas provided",
	"No address provided",
	false
);

export const defaultWithAddressNumId = {
	id: 1,
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
};

export const defaultNotLeapDayAddress = {
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
};

export const defaultStringId = {
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
	address: "No address provided",
	pushNotification: true,
};

export const defaultWithAddressStringId = {
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
};

export const defaultAddressLeapDay = {
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
};

export const weddingWithAddressStringId2 = {
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
};

export const weddingAddressIdeasNoNotificationYearLeapDay = {
	id: "1",
	firstName: "Name",
	secondName: "Name2",
	day: 29,
	month: 1,
	type: "Wedding Anniversary",
	startYear: 2000,
	noticeTime: 2,
	present: true,
	ideas: "flowers",
	address: "1 Test Drive",
	pushNotification: false,
};

export const otherWithAddressStringId3 = {
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
};
