import React, { Component } from "react";

import classes from "./Operators.module.css";
import Button from "../../../components/Button/Button";

class Operators extends Component {
	render() {
		const operatorButtons = [];
		//                 Delete,  Multiply,   Divide
		const operators = ["\u232b", "\u00d7", "\u00f7", "+", "-", "="];
		operators.forEach((item) => {
			operatorButtons.push(<Button key={item} text={item} />);
		});
		return <div className={classes.Operators}>{operatorButtons}</div>;
	}
}

export default Operators;
