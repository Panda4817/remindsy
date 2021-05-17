export const createDb = (SQLite: any) => {
	return SQLite.openDatabase("events.db");
};

export const init = (db: any) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx: any) => {
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
				(_: any, result: any) => {
					resolve(result);
				},
				(_: any, err: any) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const insertEvent = (
	db: any,
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
		db.transaction((tx: any) => {
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
				(_: any, result: any) => {
					resolve(result);
				},
				(_: any, err: any) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const updateEvent = (
	db: any,
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
		db.transaction((tx: any) => {
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
				(_: any, result: any) => {
					resolve(result);
				},
				(_: any, err: any) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const getEvents = (db: any) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx: any) => {
			tx.executeSql(
				"SELECT * FROM events",
				[],
				(_: any, result: any) => {
					resolve(result);
				},
				(_: any, err: any) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const deleteEvent = (db: any, id: number) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx: any) => {
			tx.executeSql(
				"DELETE FROM events WHERE events.id == ?",
				[id],
				(_: any, result: any) => {
					resolve(result);
				},
				(_: any, err: any) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};
