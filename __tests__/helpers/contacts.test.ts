import * as Contacts from "expo-contacts";
import * as contacts from "../../helpers/contacts";
jest.mock("expo-contacts");

it("getContactsPermissions (already granted)", async () => {
	const spy = jest.spyOn(Contacts, "getPermissionsAsync");
	spy.mockResolvedValueOnce(
		//@ts-ignore
		{ status: "granted" }
	);
	const res = await contacts.getContactsPermissions();
	expect(spy).toBeCalled();
	expect(res).toStrictEqual("granted");
	spy.mockClear();
});

it("getContactsPermissions (not granted yet)", async () => {
	const spy = jest.spyOn(Contacts, "getPermissionsAsync");
	const spy2 = jest.spyOn(Contacts, "requestPermissionsAsync");
	spy.mockResolvedValueOnce(
		//@ts-ignore
		{ status: "" }
	);
	spy2.mockResolvedValueOnce(
		//@ts-ignore
		{ status: "granted" }
	);
	const res = await contacts.getContactsPermissions();
	expect(spy).toBeCalled();
	expect(spy2).toBeCalled();
	expect(res).toStrictEqual("granted");
	spy.mockClear();
	spy2.mockClear();
});

it("filterContactsForForm (no address, no birthday, type is Birthday", async () => {
	const fakeContactsList = [
		{
			name: "test",
			id: "1",
			contactType: "person",
		},
	];
	const res = contacts.filterContactsForForm(fakeContactsList, "Birthday");
	expect(res).toStrictEqual([]);
});

it("filterContactsForForm (no address, with birthday, type is Birthday", async () => {
	const fakeContactsList = [
		{
			name: "test",
			id: "1",
			contactType: "person",
			birthday: { day: 1, month: 2, year: 1991, id: "2", label: "birthday" },
		},
	];
	const res = contacts.filterContactsForForm(fakeContactsList, "Birthday");
	expect(res).toStrictEqual(fakeContactsList);
});

it("filterContactsForForm (no address, with birthday, type is Other", async () => {
	const fakeContactsList = [
		{
			name: "test",
			id: "1",
			contactType: "person",
			birthday: { day: 1, month: 2, year: 1991, id: "2", label: "birthday" },
		},
	];
	const res = contacts.filterContactsForForm(fakeContactsList, "Other");
	expect(res).toStrictEqual([]);
});

it("filterContactsForForm (no address, with birthday, type is Wedding Anniversary)", async () => {
	const fakeContactsList = [
		{
			name: "test",
			id: "1",
			contactType: "person",
			birthday: { day: 1, month: 2, year: 1991, id: "2", label: "birthday" },
		},
	];
	const res = contacts.filterContactsForForm(fakeContactsList, "Wedding Anniversary");
	expect(res).toStrictEqual([]);
});

it("filterContactsForForm (address, no birthday, type is Wedding Anniversary)", async () => {
	const fakeContactsList = [
		{
			name: "test",
			id: "1",
			contactType: "person",
			addresses: [
				{
					street: "1 Fake Drive",
					neighborhood: "Fake",
					city: "FakeTown",
					region: "FakeState",
					postalCode: "abc 123",
					label: "home",
					id: "2",
				},
			],
		},
	];
	const res = contacts.filterContactsForForm(fakeContactsList, "Wedding Anniversary");
	expect(res).toStrictEqual(fakeContactsList);
});

it("filterContactsForForm (address, no birthday, type is Other)", async () => {
	const fakeContactsList = [
		{
			name: "test",
			id: "1",
			contactType: "person",
			addresses: [
				{
					street: "1 Fake Drive",
					neighborhood: "Fake",
					city: "FakeTown",
					region: "FakeState",
					postalCode: "abc 123",
					label: "home",
					id: "2",
				},
			],
		},
	];
	const res = contacts.filterContactsForForm(fakeContactsList, "Other");
	expect(res).toStrictEqual(fakeContactsList);
});

it("getContactsToFillForm (no permission, type is any)", async () => {
	const spy = jest.spyOn(Contacts, "getPermissionsAsync");
	const spy2 = jest.spyOn(Contacts, "requestPermissionsAsync");
	spy.mockResolvedValueOnce(
		//@ts-ignore
		{ status: "" }
	);
	spy2.mockResolvedValueOnce(
		//@ts-ignore
		{ status: "" }
	);
	const res = await contacts.getContactsToFillForm("any", "name", "");
	expect(res).toStrictEqual([]);
	spy.mockClear();
	spy2.mockClear();
});

it("getContactsToFillForm (permission, type is Birthday)", async () => {
	const fakeContactsList = [
		{
			name: "test",
			id: "1",
			contactType: "person",
		},
	];
	const spy = jest.spyOn(Contacts, "getPermissionsAsync");
	const spy2 = jest.spyOn(Contacts, "getContactsAsync");
	spy.mockResolvedValueOnce(
		//@ts-ignore
		{ status: "granted" }
	);
	spy2.mockResolvedValueOnce(
		//@ts-ignore
		{ data: fakeContactsList }
	);

	const res = await contacts.getContactsToFillForm("Birthday", "test", "");
	expect(spy2).toBeCalledTimes(1);
	expect(res).toStrictEqual([]);
	spy.mockClear();
	spy2.mockClear();
});

it("getContactsToFillForm (permission, type is Other)", async () => {
	const fakeContactsList = [
		{
			name: "test",
			id: "1",
			contactType: "person",
		},
	];
	const spy = jest.spyOn(Contacts, "getPermissionsAsync");
	const spy2 = jest.spyOn(Contacts, "getContactsAsync");
	spy.mockResolvedValueOnce(
		//@ts-ignore
		{ status: "granted" }
	);
	spy2.mockResolvedValueOnce(
		//@ts-ignore
		{ data: fakeContactsList }
	);

	const res = await contacts.getContactsToFillForm("Other", "test", "");
	expect(spy2).toBeCalledTimes(1);
	expect(res).toStrictEqual([]);
	spy.mockClear();
	spy2.mockClear();
});

it("getContactsToFillForm (permission, no second name, type is Wedding Anniversary)", async () => {
	const fakeContactsList = [
		{
			name: "test",
			id: "1",
			contactType: "person",
		},
	];
	const spy = jest.spyOn(Contacts, "getPermissionsAsync");
	const spy2 = jest.spyOn(Contacts, "getContactsAsync");
	spy.mockResolvedValueOnce(
		//@ts-ignore
		{ status: "granted" }
	);
	spy2
		.mockResolvedValueOnce(
			//@ts-ignore
			{ data: fakeContactsList }
		)
		.mockResolvedValueOnce(
			//@ts-ignore
			{ data: [] }
		);

	const res = await contacts.getContactsToFillForm("Wedding Anniversary", "test", "");
	expect(spy2).toBeCalledTimes(2);
	expect(res).toStrictEqual([]);
	spy.mockClear();
	spy2.mockClear();
});

it("getContactsToFillForm (permission, with second name, type is Wedding Anniversary)", async () => {
	const fakeContactsList = [
		{
			name: "test",
			id: "1",
			contactType: "person",
		},
	];
	const spy = jest.spyOn(Contacts, "getPermissionsAsync");
	const spy2 = jest.spyOn(Contacts, "getContactsAsync");
	spy.mockResolvedValueOnce(
		//@ts-ignore
		{ status: "granted" }
	);
	spy2
		.mockResolvedValueOnce(
			//@ts-ignore
			{ data: fakeContactsList }
		)
		.mockResolvedValueOnce(
			//@ts-ignore
			{ data: fakeContactsList }
		);

	const res = await contacts.getContactsToFillForm("Wedding Anniversary", "test", "test2");
	expect(spy2).toBeCalledTimes(2);
	expect(res).toStrictEqual([]);
	spy.mockClear();
	spy2.mockClear();
});

it("getContactsToFillForm (permission, with no name, type is Wedding Anniversary)", async () => {
	const fakeContactsList = [
		{
			name: "test",
			id: "1",
			contactType: "person",
		},
	];
	const spy = jest.spyOn(Contacts, "getPermissionsAsync");
	const spy2 = jest.spyOn(Contacts, "getContactsAsync");
	spy.mockResolvedValueOnce(
		//@ts-ignore
		{ status: "granted" }
	);
	spy2
		.mockResolvedValueOnce(
			//@ts-ignore
			{ data: [] }
		)
		.mockResolvedValueOnce(
			//@ts-ignore
			{ data: fakeContactsList }
		);

	const res = await contacts.getContactsToFillForm("Wedding Anniversary", "", "test2");
	expect(spy2).toBeCalledTimes(2);
	expect(res).toStrictEqual([]);
	spy.mockClear();
	spy2.mockClear();
});

it("getContactsToFillForm (permission, no names, type is Wedding Anniversary)", async () => {
	const spy = jest.spyOn(Contacts, "getPermissionsAsync");
	const spy2 = jest.spyOn(Contacts, "getContactsAsync");
	spy.mockResolvedValueOnce(
		//@ts-ignore
		{ status: "granted" }
	);

	const res = await contacts.getContactsToFillForm("Wedding Anniversary", "", "");
	expect(spy2).toBeCalledTimes(0);
	expect(res).toStrictEqual([]);
	spy.mockClear();
	spy2.mockClear();
});

it("formatAddress, with all properties", async () => {
	const address = [
		{
			street: "1 Fake Drive",
			neighborhood: "Fake",
			city: "FakeTown",
			region: "FakeState",
			postalCode: "abc 123",
			label: "home",
			id: "2",
		},
	];
	const res = contacts.formatAddress(address);
	const expectedOutput = "1 Fake Drive, Fake, FakeTown, FakeState, abc 123";
	expect(res).toStrictEqual(expectedOutput);
});

it("formatAddress, with no neighborhood", async () => {
	const address = [
		{
			street: "1 Fake Drive",
			city: "FakeTown",
			region: "FakeState",
			postalCode: "abc 123",
			label: "home",
			id: "2",
		},
	];
	const res = contacts.formatAddress(address);
	const expectedOutput = "1 Fake Drive, FakeTown, FakeState, abc 123";
	expect(res).toStrictEqual(expectedOutput);
});

it("formatAddress, with no region and no neighborhood", async () => {
	const address = [
		{
			street: "1 Fake Drive",
			city: "FakeTown",
			postalCode: "abc 123",
			label: "home",
			id: "2",
		},
	];
	const res = contacts.formatAddress(address);
	const expectedOutput = "1 Fake Drive, FakeTown, abc 123";
	expect(res).toStrictEqual(expectedOutput);
});
