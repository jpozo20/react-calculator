import React from "react";

import classes from "./Numbers.module.css";
import Button from "../../../components/Button/Button";

const Numbers = (props) => {
	const numberButtons = [];
	const moreLess = (
		<Button key="xx" text="&plusmn;" action="number" buttonClicked={props.buttonClicked} />
	);
	const decimalPoint = (
		<Button key="xy" text="." action="number" buttonClicked={props.buttonClicked} />
	);
	const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
	for (var i = 0; i <= 9; i++) {
		var button = (
			<Button key={i + "x"} text={numbers[i]} buttonClicked={props.buttonClicked} action="number" />
		);
		numberButtons.push(button);
	}

	numberButtons.push(moreLess, decimalPoint);
	return <div className={classes.Numbers}>{numberButtons}</div>;
};

export default Numbers;
