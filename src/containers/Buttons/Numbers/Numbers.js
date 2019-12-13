import React from "react";

import classes from "./Numbers.module.css";
import Button from "../../../components/Button/Button";

const Numbers = () => {
	const numberButtons = [];
	const moreLess = <Button key="xx" text="&plusmn;" />;
	const decimalPoint = <Button key="xy" text="." />;
	for (var i = 9; i >= 0; i--) {
		var button = <Button key={i + "x"} text={i} />;
		numberButtons.push(button);
	}

	numberButtons.push(moreLess, decimalPoint);
	return <div className={classes.Numbers}>{numberButtons}</div>;
};

export default Numbers;
