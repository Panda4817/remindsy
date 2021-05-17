import * as Notifications from "expo-notifications";
import { convertToNextDate } from "../../helpers/formatting";
import * as notification from "../../helpers/notifications";
import Event from "../../models/eventClass";
jest.mock("expo-notifications");

it("Notifications date", () => {
	let resp = notification.getNotificationDate(1, 1, 0);
	let date = convertToNextDate(1, 0);
	date.setDate(date.getDate() - 1 * 7);
	expect(resp).toStrictEqual(date);
	resp = notification.getNotificationDate(2, 1, 0);
	date = convertToNextDate(1, 0);
	date.setDate(date.getDate() - 2 * 7);
	expect(resp).toStrictEqual(date);
	resp = notification.getNotificationDate(0, 1, 0);
	date = convertToNextDate(1, 0);
	expect(resp).toStrictEqual(date);
});

it("setNotifications", () => {
	const spy = jest.spyOn(
		Notifications,
		"setNotificationHandler"
	);
	notification.setNotifications();
	expect(spy).toBeCalled();
	spy.mockClear();
});

it("getNotificationsPermissions", () => {
	const spy = jest.spyOn(
		Notifications,
		"getPermissionsAsync"
	);
	notification.getNotificationsPermissions(true);
	expect(spy).toBeCalled();
	spy.mockClear();
	notification.getNotificationsPermissions(false);
	expect(spy).not.toBeCalled();
	spy.mockClear();
});

it("createNotification with pushNotification field is false ", () => {
	const spy = jest.spyOn(
		Notifications,
		"scheduleNotificationAsync"
	);
	const event = new Event(
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
	expect(event.pushNotification).toBeFalsy();
	notification.createNotification(event);
	expect(spy).not.toBeCalled();
	spy.mockClear();
});

it("createNotification with pushNotification field is true ", () => {
	const spy = jest.spyOn(
		Notifications,
		"scheduleNotificationAsync"
	);
	const event = new Event(
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
		true
	);
	expect(event.pushNotification).toBeTruthy();
	notification.createNotification(event);
	expect(spy).toBeCalled();
});

it("deleteNotification", () => {
	const spy = jest.spyOn(
		Notifications,
		"getAllScheduledNotificationsAsync"
	);
	notification.deleteNotification("1");
	expect(spy).toBeCalled();
});

it("updateNotification with pushNotification field is true", () => {
	const spy = jest.spyOn(
		Notifications,
		"getAllScheduledNotificationsAsync"
	);
	const spy2 = jest.spyOn(
		Notifications,
		"scheduleNotificationAsync"
	);
	const eventBeforeUpdate = new Event(
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
		true
	);
	notification.createNotification(eventBeforeUpdate);
	const eventAfterUpdate = new Event(
		"1",
		"Name",
		"No name provided",
		1,
		0,
		"Birthday",
		0,
		2,
		false,
		"No present ideas provided",
		"No address provided",
		true
	);
	expect(eventAfterUpdate.pushNotification).toBeTruthy();
	notification.updateNotification(eventAfterUpdate);
	expect(spy).toBeCalled();
	expect(spy2).toBeCalled();
	spy.mockClear();
	spy2.mockClear();
});

it("updateNotification with pushNotification field is false", () => {
	const spy = jest.spyOn(
		Notifications,
		"getAllScheduledNotificationsAsync"
	);
	const spy2 = jest.spyOn(
		Notifications,
		"scheduleNotificationAsync"
	);
	const event = new Event(
		"1",
		"Name",
		"No name provided",
		1,
		0,
		"Birthday",
		0,
		2,
		false,
		"No present ideas provided",
		"No address provided",
		false
	);
	expect(event.pushNotification).toBeFalsy();
	notification.updateNotification(event);
	expect(spy).toBeCalled();
	expect(spy2).not.toBeCalled();
});
