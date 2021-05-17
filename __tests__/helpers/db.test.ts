import * as db from "../../helpers/db";
import * as SQLite from "../../__mocks__/SQLite";
jest.mock("expo-sqlite");
const testDb = db.createDb(SQLite);

it("Check init", async () => {
	const spy = jest.spyOn(db, "init");
	db.init(testDb);
	expect(spy).toHaveBeenCalled();
	expect(SQLite.executeSql).toHaveBeenCalled();
});

it("Check insertEvent", async () => {
	const spy = jest.spyOn(db, "insertEvent");
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
	);
	expect(spy).toHaveBeenCalled();
	expect(SQLite.executeSql).toHaveBeenCalled();
});

it("Check updateEvent", async () => {
	const spy = jest.spyOn(db, "updateEvent");
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
	);
	expect(spy).toHaveBeenCalled();
	expect(SQLite.executeSql).toHaveBeenCalled();
});

it("Check getEvents", async () => {
	const spy = jest.spyOn(db, "getEvents");
	db.getEvents(testDb);
	expect(spy).toHaveBeenCalled();
	expect(SQLite.executeSql).toHaveBeenCalled();
});

it("Check deleteEvent", async () => {
	const spy = jest.spyOn(db, "deleteEvent");
	db.deleteEvent(testDb, 1);
	expect(spy).toHaveBeenCalled();
	expect(SQLite.executeSql).toHaveBeenCalled();
});
