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
	month: number,
	startYear: number
) => {
	let today = new Date();
	let date: Date;
	if (startYear > today.getFullYear()) {
		date = new Date(startYear, month, day);
	} else {
		date = new Date(today.getFullYear(), month, day);
	}
	if (
		date < today &&
		today.toDateString() !== date.toDateString()
	) {
		date.setFullYear(today.getFullYear() + 1);
	}
	if (
		!leapYear(date.getFullYear()) &&
		day == 29 &&
		month == 1
	) {
		date.setDate(28);
		date.setMonth(1);
	}
	date.setHours(0, 0, 0, 0);
	return date;
};

export const compare = (a: Event, b: Event) => {
	let today = new Date();

	let aDiff =
		convertToNextDate(
			a.day,
			a.month,
			a.startYear
		).getTime() - today.getTime();
	let bDiff =
		convertToNextDate(
			b.day,
			b.month,
			b.startYear
		).getTime() - today.getTime();
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
	if (
		item.secondName !== "No name provided" &&
		item.type !== "Birthday"
	) {
		name += ` & ${item.secondName}`;
	}
	return name;
};

export const handleOutputDate = (item: Event) => {
	let date = convertToNextDate(
		item.day,
		item.month,
		item.startYear
	);
	return date.toDateString();
};

export const handleOutputYears = (item: Event) => {
	if (item.startYear == 0) {
		return "";
	}
	let date = convertToNextDate(
		item.day,
		item.month,
		item.startYear
	);
	let diff = date.getFullYear() - item.startYear;
	if (diff <= 0) {
		if (item.type == "Birthday") {
			return "Not born yet";
		} else if (item.type == "Wedding Anniversary") {
			return "Not married yet";
		} else {
			return "";
		}
	}
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
