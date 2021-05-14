import Event from "../models/eventClass";

export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const leapYear = (year: number) => {
	return year % 100 === 0
		? year % 400 === 0
		: year % 4 === 0;
};

export const convertToNextDate = (
	day: number,
	month: number
) => {
	let today = new Date();
	let date = new Date(today.getFullYear(), month, day);
	if (
		date < today &&
		today.toDateString() !== date.toDateString()
	) {
		date.setFullYear(today.getFullYear() + 1);
	}
	if (!leapYear(date.getFullYear())) {
		date.setDate(28);
		date.setMonth(1);
	}
	return date;
};

export const compare = (a: Event, b: Event) => {
	let today = new Date();

	let aDiff =
		convertToNextDate(a.day, a.month).getTime() -
		today.getTime();
	let bDiff =
		convertToNextDate(b.day, b.month).getTime() -
		today.getTime();
	if (aDiff < bDiff) {
		return -1;
	}
	if (aDiff > bDiff) {
		return 1;
	}
	return 0;
};

export const handleOutputNames = (item: Event) => {
	let name = item.firstName;
	if (item.secondName !== "No name provided") {
		name += ` & ${item.secondName}`;
	}
	return name;
};

export const handleOutputDate = (item: Event) => {
	let date = convertToNextDate(item.day, item.month);
	return date.toDateString();
};

export const handleOutputYears = (item: Event) => {
	if (item.startYear == 0) {
		return "";
	}
	let date = convertToNextDate(item.day, item.month);
	let diff = date.getFullYear() - item.startYear;
	let res = `${diff.toString()} years`;
	if (item.type == "Birthday") {
		res += " old";
	}
	return res;
};

export const handleOutputTypeIcon = (item: Event) => {
	switch (item.type) {
		case "Birthday":
			return "birthday-cake";
		case "Wedding Anniversary":
			return "heart";
		default:
			return "smile-o";
	}
};

export const handleCardOrPresOutput = (item: Event) => {
	if (item.present) {
		return "Card and present";
	} else {
		return "Card only";
	}
};

export const handleNoticeOutput = (item: Event) => {
	if (item.pushNotification && item.noticeTime == 1) {
		return "Notified 1 week before";
	}
	if (item.pushNotification && item.noticeTime == 2) {
		return "Notified 2 weeks before";
	}
	return "Notification disabled";
};

export const handleNoticeOutputNotifications = (
	item: Event
) => {
	if (item.pushNotification && item.noticeTime == 1) {
		return "1 week";
	}
	if (item.pushNotification && item.noticeTime == 2) {
		return "2 weeks";
	}
	return "";
};
