import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { TabsNavigator } from "./TabsNavigator";

const AppNavigator = () => {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<TabsNavigator />
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

export default AppNavigator;
