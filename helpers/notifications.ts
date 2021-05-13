import * as Notifications from "expo-notifications";
import Event from "../models/eventClass";
import {
	convertToNextDate,
	handleCardOrPresOutput,
	handleNoticeOutputNotifications,
	handleOutputNames,
} from "./formatting";

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
	const identifier =
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Remindsy Update",
				body: `${handleNoticeOutputNotifications(
					event
				)} until ${handleOutputNames(event)}'s ${
					event.type
				}! Buy a ${handleCardOrPresOutput(
					event
				).toLowerCase()}.`,
				data: { id: event.id },
				sound: "default",
			},
			trigger: {
				day: nDate.getDate(),
				month: nDate.getMonth(),
				hour: 12,
				minute: 15,
				repeats: true,
			},
		});
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

export const updateNotification = async (event: Event) => {
	await deleteNotification(event.id);
	if (event.pushNotification === true) {
		await createNotification(event);
	}
	return;
};
