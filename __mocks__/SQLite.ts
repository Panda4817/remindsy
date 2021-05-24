export var sqlResult = {
	insertId: 0,
	rows: { _array: Array() },
};
export const txSuccess = {
	executeSql: jest.fn(
		(
			query,
			sub = [],
			func = () => true,
			errFunc = () => false
		) => func({}, sqlResult)
	),
};
export const txError = {
	executeSql: jest.fn(
		(
			query,
			sub = [],
			func = () => false,
			errFunc = () => true
		) => errFunc({}, "error")
	),
};
export const db = {
	transaction: jest.fn((func) => func(txSuccess)),
	exec: jest.fn(),
	version: "",
	readTransaction: jest.fn(),
};
export const openDatabase = (name: string) => {
	return db;
};
