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
import {
	birthdayWithYear,
	weddingAnniversary,
	otherWithYearNoNotification,
	futureEventNoNotification,
} from "../fakeEvents";

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
			dayAfter.getMonth(),
			0
		)
	).toStrictEqual(dayAfter);
	expect(
		convertToNextDate(
			dayBefore.getDate(),
			dayBefore.getMonth(),
			0
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
		expect(convertToNextDate(29, 1, 0)).toStrictEqual(
			leapDay
		);
	} else {
		leapDay.setDate(28);
		leapDay.setMonth(1);
		expect(convertToNextDate(29, 1, 0)).toStrictEqual(
			leapDay
		);
	}
});

it("compare", () => {
	let num = compare(birthdayWithYear, weddingAnniversary);
	let num2 = compare(weddingAnniversary, birthdayWithYear);
	let num3 = compare(
		weddingAnniversary,
		otherWithYearNoNotification
	);
	expect(num).toBe(-1);
	expect(num2).toBe(1);
	expect(num3).toBe(0);
});

it("handleOutputNames", () => {
	expect(handleOutputNames(birthdayWithYear)).toBe("Name");
	expect(handleOutputNames(weddingAnniversary)).toBe(
		"Name2 & Name3"
	);
	birthdayWithYear.secondName = "Name2";
	expect(handleOutputNames(birthdayWithYear)).toBe("Name");
});

it("handleOutputDate", () => {
	let resp = convertToNextDate(
		birthdayWithYear.day,
		birthdayWithYear.month,
		birthdayWithYear.startYear
	).toDateString();
	expect(handleOutputDate(birthdayWithYear)).toBe(resp);
});

it("handleOutputYears", () => {
	let date = convertToNextDate(
		birthdayWithYear.day,
		birthdayWithYear.month,
		birthdayWithYear.startYear
	);
	let diff =
		date.getFullYear() - birthdayWithYear.startYear;
	let resp = `${diff.toString()} years old`;
	let date2 = convertToNextDate(
		otherWithYearNoNotification.day,
		otherWithYearNoNotification.month,
		otherWithYearNoNotification.startYear
	);
	let diff2 =
		date2.getFullYear() -
		otherWithYearNoNotification.startYear;
	let resp2 = `${diff2.toString()} years`;
	expect(handleOutputYears(birthdayWithYear)).toBe(resp);
	expect(handleOutputYears(weddingAnniversary)).toBe("");
	expect(
		handleOutputYears(otherWithYearNoNotification)
	).toBe(resp2);
	expect(handleOutputYears(futureEventNoNotification)).toBe(
		"Not born yet"
	);
	futureEventNoNotification.type = "Wedding Anniversary";
	expect(handleOutputYears(futureEventNoNotification)).toBe(
		"Not married yet"
	);
	futureEventNoNotification.type = "Other";
	expect(handleOutputYears(futureEventNoNotification)).toBe(
		""
	);
});

it("handleOutputTypeIcon", () => {
	expect(handleOutputTypeIcon(birthdayWithYear)).toBe(
		"birthday-cake"
	);
	expect(handleOutputTypeIcon(weddingAnniversary)).toBe(
		"heart"
	);
	expect(
		handleOutputTypeIcon(otherWithYearNoNotification)
	).toBe("smile-o");
});

it("handleCardOrPresOutput", () => {
	expect(handleCardOrPresOutput(birthdayWithYear)).toBe(
		"Card only"
	);
	expect(handleCardOrPresOutput(weddingAnniversary)).toBe(
		"Card and present"
	);
});

it("handleNoticeOutput", () => {
	expect(handleNoticeOutput(birthdayWithYear)).toBe(
		"Notified 1 week before"
	);
	expect(handleNoticeOutput(weddingAnniversary)).toBe(
		"Notified 2 weeks before"
	);
	expect(
		handleNoticeOutput(otherWithYearNoNotification)
	).toBe("Notification disabled");
});

it("handleNoticeOutputNotifications", () => {
	expect(
		handleNoticeOutputNotifications(birthdayWithYear)
	).toBe("1 week");
	expect(
		handleNoticeOutputNotifications(weddingAnniversary)
	).toBe("2 weeks");
	expect(
		handleNoticeOutputNotifications(
			otherWithYearNoNotification
		)
	).toBe("");
});
