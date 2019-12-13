import React from "react";
import classes from "./Buttons.module.css";

import Numbers from "./Numbers/Numbers";
import Functions from "./Functions/Functions";
import Operators from "./Operators/Operators";

const Buttons = () => {
	return (
		<div className={classes.Buttons}>
			<Functions />
			<Numbers />
			<Operators />
		</div>
	);
};

export default Buttons;
