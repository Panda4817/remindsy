import * as Notifications from "expo-notifications";
import Event from "../models/eventClass";
import {
	convertToNextDate,
	handleCardOrPresOutput,
	handleNoticeOutputNotifications,
	handleOutputNames,
} from "./format";

const getNotificationDate = (
	week: number,
	day: number,
	month: number
) => {
	let date = convertToNextDate(day, month);
	date.setDate(date.getDate() - week * 7);
	return date;
};

export const createNotification = async (event: Event) => {
	let nDate = getNotificationDate(
		event.noticeTime,
		event.day,
		event.month
	);
	await Notifications.scheduleNotificationAsync({
		content: {
			title: "Remindsy Update",
			body: `${handleNoticeOutputNotifications(
				event
			)} until ${handleOutputNames(event)}'s ${
				event.type
			}! Buy a ${handleCardOrPresOutput(event)}.`,
			data: { id: event.id, weeks: event.noticeTime },
		},
		trigger: {
			day: nDate.getDate(),
			month: nDate.getMonth(),
			hour: 0,
			minute: 0,
			repeats: true,
		},
	});
	return;
};

export const updateNotification = async (event: Event) => {
	const res =
		await Notifications.getAllScheduledNotificationsAsync();
	let updated = false;
	res.map(async (val) => {
		if (
			val.content.data.id === event.id &&
			val.content.data.weeks !== event.noticeTime &&
			event.pushNotification === true
		) {
			await Notifications.cancelScheduledNotificationAsync(
				val.identifier
			);
			await createNotification(event);
			updated = true;
		}
		return;
	});
	if (updated) {
		return;
	}
	if (event.pushNotification === true) {
		await createNotification(event);
	}
	return;
};

export const deleteNotification = async (id: string) => {
	const res =
		await Notifications.getAllScheduledNotificationsAsync();
	res.map(async (val) => {
		if (val.content.data.id === id) {
			await Notifications.cancelScheduledNotificationAsync(
				val.identifier
			);
		}
		return;
	});
	return;
};
