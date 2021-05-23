export const success = jest.fn().mockReturnValue({
	insertId: 1,
	rows: {
		_array: [],
	},
});
export const error = jest.fn().mockReturnValue({});
export const tx = {
	executeSql: (
		stm = "",
		args = [],
		done = success,
		err = error
	) => jest.fn().mockReturnValue(success()),
};
export const db = {
	transaction: (transaction = tx) => tx.executeSql(),
};
export const openDatabase = (name: string) => {
	return db;
};
