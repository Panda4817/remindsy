import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("events.db");

export const init = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS events (
                    id INTEGER PRIMARY KEY NOT NULL, 
                    firstName TEXT NOT NULL, 
                    secondName TEXT NOT NULL, 
                    day INTEGER NOT NULL, 
					month INTEGER NOT NULL, 
					type TEXT NOT NULL,
					startYear INTEGER NOT NULL,
                    noticeTime INTEGER NOT NULL, 
                    present BOOLEAN NOT NULL, 
                    ideas TEXT NOT NULL, 
                    address TEXT NOT NULL, 
                    pushNotification BOOLEAN NOT NULL);`,
				[],
				(_, result) => {
					resolve(result);
				},
				(_, err): any => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const insertEvent = (
	firstName: string,
	secondName: string,
	day: number,
	month: number,
	type: string,
	startYear: number,
	noticeTime: number,
	present: boolean,
	ideas: string,
	address: string,
	pushNotification: boolean
) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`INSERT INTO events (
                    firstName, 
                    secondName, 
                    day,
					month,
					type,
					startYear, 
                    noticeTime, 
                    present, 
                    ideas, 
                    address, 
                    pushNotification) 
					VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
				[
					firstName,
					secondName,
					day,
					month,
					type,
					startYear,
					noticeTime,
					present,
					ideas,
					address,
					pushNotification,
				],
				(_, result) => {
					resolve(result);
				},
				(_, err): any => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const updateEvent = (
	id: number,
	firstName: string,
	secondName: string,
	day: number,
	month: number,
	type: string,
	startYear: number,
	noticeTime: number,
	present: boolean,
	ideas: string,
	address: string,
	pushNotification: boolean
) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`UPDATE events SET
                    firstName = ?, 
                    secondName = ?, 
                    day = ?,
					month = ?,
					type = ?,
					startYear = ?, 
                    noticeTime = ?, 
                    present = ?, 
                    ideas = ?, 
                    address = ?, 
                    pushNotification = ? WHERE events.id == ?;`,
				[
					firstName,
					secondName,
					day,
					month,
					type,
					startYear,
					noticeTime,
					present,
					ideas,
					address,
					pushNotification,
					id,
				],
				(_, result) => {
					resolve(result);
				},
				(_, err): any => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const getEvents = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM events",
				[],
				(_, result) => {
					resolve(result);
				},
				(_, err): any => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const deleteEvent = (id: number) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"DELETE FROM events WHERE events.id == ?",
				[id],
				(_, result) => {
					resolve(result);
				},
				(_, err): any => {
					reject(err);
				}
			);
		});
	});
	return promise;
};
