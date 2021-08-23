import * as Contacts from "expo-contacts";
import { Address } from "expo-contacts";

export const getContactsPermissions = async () => {
	let statusObj = await Contacts.getPermissionsAsync();
	if (statusObj.status !== "granted") {
		statusObj = await Contacts.requestPermissionsAsync();
	}
	return statusObj.status;
};

export const filterContacts = (contacts: Contacts.Contact[], type: string) => {
	const filteredContacts = contacts.filter((contact) => {
		if (contact.addresses !== undefined) {
			return contact;
		}
		if (type == "Birthday" && contact.birthday !== undefined) {
			return contact;
		}
		return;
	});
	return filteredContacts;
};

export const getContacts = async (type: string, name: string, secondName: string | "") => {
	const permissionStatus = await getContactsPermissions();
	if (permissionStatus !== "granted") {
		return [];
	}

	let contacts: Contacts.Contact[] = [];
	if (type == "Birthday" && name !== "") {
		contacts = (
			await Contacts.getContactsAsync({
				fields: [Contacts.Fields.Birthday, Contacts.Fields.Addresses],
				name: name,
			})
		).data;
	} else if (type == "Other" && name !== "") {
		contacts = (
			await Contacts.getContactsAsync({
				fields: [Contacts.Fields.Addresses],
				name: name,
			})
		).data;
	} else if (type == "Wedding Anniversary" && (name !== "" || secondName !== "")) {
		contacts = (
			await Contacts.getContactsAsync({
				fields: [Contacts.Fields.Addresses],
				name: name,
			})
		).data;
		(
			await Contacts.getContactsAsync({
				fields: [Contacts.Fields.Addresses],
				name: secondName,
			})
		).data.map((contact) => contacts.push(contact));
	}

	return filterContacts(contacts, type);
};

export const formatAddress = (lst: Address[]) => {
	return `${lst[0].street}${lst[0].neighborhood ? ", " + lst[0].neighborhood + "," : ","} ${
		lst[0].city
	}${lst[0].region ? ", " + lst[0].region + "," : ","} ${lst[0].postalCode}`;
};
