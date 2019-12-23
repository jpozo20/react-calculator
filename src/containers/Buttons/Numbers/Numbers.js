import React from "react";

import classes from "./Numbers.module.css";
import Button from "../../../components/Button/Button";

const Numbers = (props) => {
	const numberButtons = [];
	const moreLess = (
		<Button
			key="xx"
			text="&plusmn;"
			action="number"
			buttonClicked={props.buttonClicked}
		/>
	);
	const decimalPoint = (
		<Button
			key="xy"
			text="."
			action="number"
			buttonClicked={props.buttonClicked}
		/>
	);
	for (var i = 9; i >= 0; i--) {
		var button = (
			<Button
				key={i + "x"}
				text={i}
				buttonClicked={props.buttonClicked}
				action="number"
			/>
		);
		numberButtons.push(button);
	}

	numberButtons.push(moreLess, decimalPoint);
	return <div className={classes.Numbers}>{numberButtons}</div>;
};

export default Numbers;
