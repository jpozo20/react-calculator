import React from "react";
import classes from "./Buttons.module.css";

import Numbers from "./Numbers/Numbers";
import Functions from "./Functions/Functions";
import Operators from "./Operators/Operators";

const Buttons = (props) => {
	return (
		<div className={classes.Buttons}>
			<Functions buttonClicked={props.buttonClicked} />
			<Numbers buttonClicked={props.buttonClicked} />
			<Operators buttonClicked={props.buttonClicked} />
		</div>
	);
};

export default Buttons;
