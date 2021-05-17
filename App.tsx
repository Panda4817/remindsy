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
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";

import AppNavigator from "./navigation/AppNavigator";
import reducers from "./store/reducers";
import { createDb, init } from "./helpers/db";
import { setNotifications } from "./helpers/notifications";

const db = createDb(SQLite);
init(db);

const rootReducer = combineReducers({
	events: reducers,
});

const store = createStore(
	rootReducer,
	applyMiddleware(ReduxThunk)
);

setNotifications();
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
	} else {
		return (
			<Provider store={store}>
				<StatusBar style="light" />
				<AppNavigator />
			</Provider>
		);
	}
};

export default App;
