import * as Notifications from "expo-notifications";
import Event from "../models/eventClass";
import {
	convertToNextDate,
	handleCardOrPresOutput,
	handleNoticeOutputNotifications,
	handleOutputNames,
} from "./formatting";

export const getNotificationDate = (
	week: number,
	day: number,
	month: number,
	year: number
) => {
	let date = convertToNextDate(day, month, year);
	if (week !== 0) {
		date.setDate(date.getDate() - week * 7);
	}

	return date;
};

export const handler = async () => {
	return {
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	};
};

export const setNotifications = () => {
	Notifications.setNotificationHandler({
		handleNotification: handler,
	});
};

export const getNotificationsPermissions = async (
	value: boolean
) => {
	if (value === true) {
		const statusObj =
			await Notifications.getPermissionsAsync();
		if (statusObj.status !== "granted") {
			const statusObj =
				await Notifications.requestPermissionsAsync();
		}
	}
};

export const createNotification = async (event: Event) => {
	if (event.pushNotification !== true) {
		return;
	}
	let nDate = getNotificationDate(
		event.noticeTime,
		event.day,
		event.month,
		event.startYear
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
				hour: 8,
				minute: 0,
				repeats: true,
			},
		});
	return identifier;
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
