import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import {
	createStore,
	combineReducers,
	applyMiddleware,
} from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import * as Notifications from "expo-notifications";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";

import AppNavigator from "./navigation/AppNavigator";
import reducers from "./store/reducers";
import { init } from "./helpers/db";

init()
	.then(() => {
		console.log("done");
	})
	.catch((err) => {
		console.log(err);
	});

const rootReducer = combineReducers({
	events: reducers,
});

const store = createStore(
	rootReducer,
	applyMiddleware(ReduxThunk)
);

Notifications.setNotificationHandler({
	handleNotification: async () => {
		return {
			shouldShowAlert: true,
			shouldPlaySound: true,
			shouldSetBadge: false,
		};
	},
});
ScreenOrientation.lockAsync(
	ScreenOrientation.OrientationLock.PORTRAIT
);

const fetchFonts = () => {
	return Font.loadAsync({
		regular: require("./assets/fonts/OpenSans-Regular.ttf"),
		bold: require("./assets/fonts/OpenSans-Bold.ttf"),
	});
};
export default function App() {
	const [dataLoaded, setDataLoaded] = useState(false);

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
				onError={(err) => console.log(err)}
			/>
		);
	}
	return (
		<Provider store={store}>
			<StatusBar style="light" />
			<AppNavigator />
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
