import React from "react";

import classes from "./Functions.module.css";
import Button from "../../../components/Button/Button";

const Functions = () => {
	const functionButtons = [];
	//                      SQRT,     x ^ 2,     x ^ n,
	const functions = ["%", "\u221a", "x\u00b2", "x\u207f", "log", "logn"];
	functions.forEach((item) => {
		functionButtons.push(<Button key={item} text={item} />);
	});
	return <div className={classes.Functions}>{functionButtons}</div>;
};

export default Functions;
