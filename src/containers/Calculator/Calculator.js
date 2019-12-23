import React, { Component } from "react";
import classes from "./Calculator.module.css";

import Buttons from "../Buttons/Buttons";
import Screen from "../../components/Screen/Screen";
import Helpers from "../../helpers/Helpers";
import Constants from "../../helpers/Constants";

class Calculator extends Component {
	state = {
		input: "0",
		accumulator: 0,
		prevResult: "",
		currOperation: "",
	};
	render() {
		return (
			<div className={classes.Calculator}>
				<Screen input={this.state.input} prevResult={this.state.prevResult} />
				<Buttons buttonClicked={this.handleClick} />
			</div>
		);
	}

	handleClick = (event) => {
		const button = event.target;
		const operation = button.textContent;
		const action = button.getAttribute("data-action");
		switch (action) {
			case "number":
				this.handleNumber(operation);
				break;
			case "operation":
				this.handleOperator(operation);
				break;
			case "function":
				this.handleNumber(operation);
				break;
			default:
				break;
		}
	};

	handleNumber = (operation) => {
		const plusLess = Helpers.decodeHtml(Constants.SpecialKeys.PlusLess);
		let input = this.state.input;
		let parsed = parseInt(input);

		// To avoid concatenating the current number to the initial zero
		if (parsed === 0) input = "";

		if (operation === Constants.SpecialKeys.DecimalPoint) {
			if (input.indexOf(".") < 0) input = input.concat(".");
		} else if (operation === plusLess) {
			if (parsed > 0) {
				input = "-" + input;
			} else if (parsed < 0) {
				input = input.replace("-", "");
			} else input = "0";
		} else {
			input = input + operation;
		}
		this.setState({
			input: input,
		});
	};

	handleOperator = (operation, usePreviousOperation) => {
		let currOperation = "";
		let input = this.state.input;
		let prevResult = this.state.prevResult;
		let prevOperation = this.state.currOperation;

		// Use the accumulator to apply the last operation to the previos result
		if (usePreviousOperation) {
			input = this.state.accumulator;
		}

		if (prevResult === "") prevResult = "0";

		switch (operation) {
			case Helpers.decodeHtml(Constants.OperatorKeys.Add):
				currOperation = Constants.OperatorKeys.Add;
				this.add(input, prevResult, currOperation);
				break;

			case Helpers.decodeHtml(Constants.OperatorKeys.Substract):
				currOperation = Constants.OperatorKeys.Substract;
				this.subtract(input, prevResult, currOperation);
				break;

			case Helpers.decodeHtml(Constants.OperatorKeys.Multiply):
				currOperation = Constants.OperatorKeys.Multiply;
				this.multiply(input, prevResult, currOperation);
				break;

			case Helpers.decodeHtml(Constants.OperatorKeys.Equals):
				// If the user hits the Equals key, and there is no input
				// then apply the previously executed operation
				const usePreviousOp = input === "0";
				this.handleOperator(prevOperation, usePreviousOp);
				break;

			case Helpers.decodeHtml(Constants.OperatorKeys.Delete):
				// If there is only one digit, display a zero
				//Otherwise, delete the last digit
				if (input.length === 1) input = "0";
				else input = input.slice(0, -1);
				this.setState({
					input: input,
				});
				return;

			default:
				break;
		}
	};
	handleFunction = (operation) => {};

	add = (result, previousResult, currOperation) => {
		let prevResult = parseInt(previousResult) + parseInt(result);

		this.setState({
			input: "0",
			accumulator: result,
			prevResult: prevResult,
			currOperation: currOperation,
		});
	};

	subtract = (input, previousResult, currOperation) => {
		let prevResult = "";
		if (previousResult === "" || previousResult === "0") {
			prevResult = parseInt(input);
		} else {
			prevResult = parseInt(previousResult) - parseInt(input);
		}

		this.setState({
			input: "0",
			accumulator: input,
			prevResult: prevResult,
			currOperation: currOperation,
		});
	};

	multiply = (input, previousResult, currOperation) => {
		let prevResult = "";
		if (previousResult === "" || previousResult === "0") {
			prevResult = parseInt(input);
		} else {
			prevResult = parseInt(previousResult) * parseInt(input);
		}

		this.setState({
			input: "0",
			accumulator: input,
			prevResult: prevResult,
			currOperation: currOperation,
		});
	};
}
export default Calculator;
