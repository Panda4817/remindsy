import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
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

const App = () => {
	let [fontsLoaded] = useFonts({
		regular: require("./assets/fonts/OpenSans-Regular.ttf"),
		bold: require("./assets/fonts/OpenSans-Bold.ttf"),
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}
	return (
		<Provider store={store}>
			<StatusBar style="light" />
			<AppNavigator />
		</Provider>
	);
};

export default App;
