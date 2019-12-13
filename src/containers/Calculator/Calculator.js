import React, { Component } from "react";
import classes from "./Calculator.module.css";

import Buttons from "../Buttons/Buttons";
import Screen from "../../components/Screen/Screen";

class Calculator extends Component {
	render() {
		return (
			<div className={classes.Calculator}>
				<Screen />
				<Buttons />
			</div>
		);
	}
}

export default Calculator;
