import { createStackNavigator } from "@react-navigation/stack";
import { act } from "react-test-renderer";
import { SettingsNavigator } from "../../navigation/SettingsNavigator";

it(`returns stack navigator`, async () => {
	const promise = Promise.resolve();
	const res = SettingsNavigator();
	expect(res).toBeTruthy();
	expect(res.type).toBe(createStackNavigator().Navigator);
	await act(() => promise);
});
