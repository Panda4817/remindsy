import * as db from "../../helpers/db";
import * as SQLite from "../../__mocks__/SQLite";
jest.mock("expo-sqlite");
var testDb: any;
it("Check createDb", async () => {
	const spy = jest.spyOn(SQLite, "openDatabase");
	testDb = await db.createDb(SQLite);
	expect(spy).toBeCalledWith(expect.anything());
});

it("Check init with success", async () => {
	const spy = jest.spyOn(testDb, "transaction");
	await db.init(testDb);
	expect(spy).toBeCalled();
	expect(SQLite.txSuccess.executeSql).toBeCalled();
});
it("Check init with error", async () => {
	const spy = jest.spyOn(testDb, "transaction");
	spy.mockImplementationOnce(
		jest.fn((func: any) => func(SQLite.txError))
	);
	await db.init(testDb).catch(() => {
		expect(spy).toThrowError();
		expect(SQLite.txError.executeSql).toBeCalled();
	});
});

it("Check insertEvent with success", async () => {
	const spy = jest.spyOn(testDb, "transaction");
	await db.insertEvent(
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
		true
	);
	expect(spy).toBeCalled();
	expect(SQLite.txSuccess.executeSql).toBeCalled();
});

it("Check insertEvent with error", async () => {
	const spy = jest.spyOn(testDb, "transaction");
	spy.mockImplementationOnce(
		jest.fn((func: any) => func(SQLite.txError))
	);
	await db
		.insertEvent(
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
			true
		)
		.catch(() => {
			expect(spy).toThrowError();
			expect(SQLite.txError.executeSql).toBeCalled();
		});
});

it("Check updateEvent with success", async () => {
	const spy = jest.spyOn(testDb, "transaction");
	await db.updateEvent(
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
		true
	);
	expect(spy).toBeCalled();
	expect(SQLite.txSuccess.executeSql).toBeCalled();
});

it("Check updateEvent with error", async () => {
	const spy = jest.spyOn(testDb, "transaction");
	spy.mockImplementationOnce(
		jest.fn((func: any) => func(SQLite.txError))
	);
	await db
		.updateEvent(
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
			true
		)
		.catch(() => {
			expect(spy).toThrowError();
			expect(SQLite.txError.executeSql).toBeCalled();
		});
});

it("Check getEvents with success", async () => {
	const spy = jest.spyOn(testDb, "transaction");
	await db.getEvents(testDb);
	expect(spy).toBeCalled();
	expect(SQLite.txSuccess.executeSql).toBeCalled();
});

it("Check getEvents with error", async () => {
	const spy = jest.spyOn(testDb, "transaction");
	spy.mockImplementationOnce(
		jest.fn((func: any) => func(SQLite.txError))
	);
	await db.getEvents(testDb).catch(() => {
		expect(spy).toThrowError();
		expect(SQLite.txError.executeSql).toBeCalled();
	});
});

it("Check deleteEvent with success", async () => {
	const spy = jest.spyOn(testDb, "transaction");
	await db.deleteEvent(testDb, 1);
	expect(spy).toBeCalled();
	expect(SQLite.txSuccess.executeSql).toBeCalled();
});

it("Check deleteEvent with error", async () => {
	const spy = jest.spyOn(testDb, "transaction");
	spy.mockImplementationOnce(
		jest.fn((func: any) => func(SQLite.txError))
	);
	await db.deleteEvent(testDb, 1).catch(() => {
		expect(spy).toThrowError();
		expect(SQLite.txError.executeSql).toBeCalled();
	});
});
