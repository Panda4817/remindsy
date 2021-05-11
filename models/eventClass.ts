class Event {
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

	constructor(
		id: string,
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
	) {
		this.id = id;
		this.firstName = firstName;
		this.secondName = secondName;
		this.day = day;
		this.month = month;
		this.type = type;
		this.startYear = startYear;
		this.noticeTime = noticeTime;
		this.present = present;
		this.ideas = ideas;
		this.address = address;
		this.pushNotification = pushNotification;
	}
}

export default Event;
