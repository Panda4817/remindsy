import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";

import colours from "../../constants/Colours";

const CustomHeaderButton = (props: any) => {
	return (
		<HeaderButton
			{...props}
			iconSize={24}
			color={colours.yellow}
		/>
	);
};

export default CustomHeaderButton;
