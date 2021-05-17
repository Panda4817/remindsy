export const executeSql = jest.fn();
export const tx = { executeSql: executeSql() };
export const db = {
	transaction: jest.fn((tx) => tx.executeSql),
};
export const openDatabase = (name: string) => {
	return db;
};
