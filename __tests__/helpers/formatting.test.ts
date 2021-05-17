import {
	compare,
	convertToNextDate,
	handleCardOrPresOutput,
	handleNoticeOutput,
	handleNoticeOutputNotifications,
	handleOutputDate,
	handleOutputNames,
	handleOutputTypeIcon,
	handleOutputYears,
	leapYear,
} from "../../helpers/formatting";
import Event from "../../models/eventClass";

it("leapYear", () => {
	expect(leapYear(2000)).toBe(true);
	expect(leapYear(1900)).toBe(false);
});

it("convertToNextDate", () => {
	let dayBefore = new Date();
	dayBefore.setDate(dayBefore.getDate() - 1);
	dayBefore.setFullYear(dayBefore.getFullYear() + 1);
	dayBefore.setHours(0, 0, 0, 0);
	let dayAfter = new Date();
	dayAfter.setHours(0, 0, 0, 0);
	dayAfter.setDate(dayAfter.getDate() + 1);
	expect(
		convertToNextDate(
			dayAfter.getDate(),
			dayAfter.getMonth()
		)
	).toStrictEqual(dayAfter);
	expect(
		convertToNextDate(
			dayBefore.getDate(),
			dayBefore.getMonth()
		)
	).toStrictEqual(dayBefore);
	let leapDay = new Date();
	leapDay.setDate(29);
	leapDay.setMonth(1);
	if (leapDay < new Date()) {
		leapDay.setFullYear(leapDay.getFullYear() + 1);
	}
	leapDay.setHours(0, 0, 0, 0);
	if (leapYear(leapDay.getFullYear())) {
		expect(convertToNextDate(29, 1)).toStrictEqual(leapDay);
	} else {
		leapDay.setDate(28);
		leapDay.setMonth(1);
		expect(convertToNextDate(29, 1)).toStrictEqual(leapDay);
	}
});

const a: Event = new Event(
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

const b: Event = new Event(
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

const c: Event = new Event(
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

it("compare", () => {
	let num = compare(a, b);
	let num2 = compare(b, a);
	let num3 = compare(b, c);
	expect(num).toBe(-1);
	expect(num2).toBe(1);
	expect(num3).toBe(0);
});

it("handleOutputNames", () => {
	expect(handleOutputNames(a)).toBe("Name");
	expect(handleOutputNames(b)).toBe("Name2 & Name3");
	a.secondName = "Name2";
	expect(handleOutputNames(a)).toBe("Name");
});

it("handleOutputDate", () => {
	let resp = convertToNextDate(
		a.day,
		a.month
	).toDateString();
	expect(handleOutputDate(a)).toBe(resp);
});

it("handleOutputYears", () => {
	let date = convertToNextDate(a.day, a.month);
	let diff = date.getFullYear() - a.startYear;
	let resp = `${diff.toString()} years old`;
	let date2 = convertToNextDate(c.day, c.month);
	let diff2 = date.getFullYear() - c.startYear;
	let resp2 = `${diff2.toString()} years`;
	expect(handleOutputYears(a)).toBe(resp);
	expect(handleOutputYears(b)).toBe("");
	expect(handleOutputYears(c)).toBe(resp2);
});

it("handleOutputTypeIcon", () => {
	expect(handleOutputTypeIcon(a)).toBe("birthday-cake");
	expect(handleOutputTypeIcon(b)).toBe("heart");
	expect(handleOutputTypeIcon(c)).toBe("smile-o");
});

it("handleCardOrPresOutput", () => {
	expect(handleCardOrPresOutput(a)).toBe("Card only");
	expect(handleCardOrPresOutput(b)).toBe(
		"Card and present"
	);
});

it("handleNoticeOutput", () => {
	expect(handleNoticeOutput(a)).toBe(
		"Notified 1 week before"
	);
	expect(handleNoticeOutput(b)).toBe(
		"Notified 2 weeks before"
	);
	expect(handleNoticeOutput(c)).toBe(
		"Notification disabled"
	);
});

it("handleNoticeOutputNotifications", () => {
	expect(handleNoticeOutputNotifications(a)).toBe("1 week");
	expect(handleNoticeOutputNotifications(b)).toBe(
		"2 weeks"
	);
	expect(handleNoticeOutputNotifications(c)).toBe("");
});
