import { act } from "@testing-library/react-native";
import * as db from "../../helpers/db";
import * as FakeSQLite from "../../__mocks__/SQLite";
import * as SQLite from "expo-sqlite";
jest.mock("expo-sqlite");
var testDb: any;
it("Check createDb", async () => {
	//@ts-ignore
	const spy = jest.spyOn(SQLite, "openDatabase");
	//@ts-ignore
	spy.mockReturnValue(
		//@ts-ignore
		{ transaction: () => jest.fn() }
	);
	testDb = await db.createDb(SQLite);
	expect(spy).toBeCalledWith(expect.anything());
});

it("Check init", async () => {
	//@ts-ignore
	const spy = jest.spyOn(testDb, "transaction");
	//@ts-ignore
	const executeSql = jest.fn();
	spy.mockReturnValue(executeSql());
	const spy2 = jest.spyOn(db, "init");
	spy2.mockReturnValue(testDb.transaction());
	await db.init(testDb);
	expect(spy).toBeCalled();
	expect(executeSql).toBeCalled();
});

it("Check insertEvent", async () => {
	const spy = jest.spyOn(db, "insertEvent");
	await act(() =>
		db.insertEvent(
			testDb,
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
		)
	).then(() => {
		expect(spy).toHaveBeenCalled();
		console.log(spy.mock.calls);
		console.log(spy.mock.results);
	});
});

it("Check updateEvent", async () => {
	const spy = jest.spyOn(db, "updateEvent");
	await act(() =>
		db.updateEvent(
			testDb,
			1,
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
		)
	).then(() => {
		expect(spy).toHaveBeenCalled();
		console.log(spy.mock.calls);
		console.log(spy.mock.results);
	});
});

it("Check getEvents", async () => {
	const spy = jest.spyOn(db, "getEvents");
	await act(() => db.getEvents(testDb)).then(() => {
		expect(spy).toHaveBeenCalled();
		console.log(spy.mock.calls);
		console.log(spy.mock.results);
	});
});

it("Check deleteEvent", async () => {
	const spy = jest.spyOn(db, "deleteEvent");
	await act(() => db.deleteEvent(testDb, 1)).then(() => {
		expect(spy).toHaveBeenCalled();
		console.log(spy.mock.calls);
		console.log(spy.mock.results);
	});
});
