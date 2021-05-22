import { CalendarNavigator } from "../../navigation/CalendarNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { act } from "@testing-library/react-native";

it(`returns stack navigator`, async () => {
	const promise = Promise.resolve();
	const res = CalendarNavigator();
	expect(res).toBeTruthy();
	expect(res.type).toBe(createStackNavigator().Navigator);
	await act(() => promise);
});
