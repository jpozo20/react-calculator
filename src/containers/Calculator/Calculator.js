import React, { Component } from "react";
import classes from "./Calculator.module.css";
import buttonClasses from "../../components/Button/Button.module.css";

import Buttons from "../Buttons/Buttons";
import Constants from "../../helpers/Constants";
import Helpers from "../../helpers/helpers";
import Screen from "../../components/Screen/Screen";

class Calculator extends Component {
	state = {
		input: "0",
		accumulator: 0,
		prevResult: 0,
		prevResultString: "",
		currOperation: "",
		prevButton: null,
		shouldUpdateInput: false,
	};
	noRenderState = {
		prevResult: 0,
		shouldUpdateWithoutRender: false,
	};
	render() {
		return (
			<div className={classes.Calculator}>
				<Screen input={this.state.input} prevResult={this.state.prevResultString} />
				<Buttons buttonClicked={this.handleClick} />
			</div>
		);
	}

	componentDidMount() {
		document.addEventListener("keyup", this.handleKeyPress, false);
	}

	addActiveStyle = (button, action) => {
		if (
			action === "number" ||
			button.textContent === Constants.FunctionKeys.Clear ||
			button.textContent === Constants.OperatorKeys.Delete ||
			button.textContent === Constants.OperatorKeys.Equals
		) {
			return;
		}

		button.classList.add(buttonClasses.Active);
		const prevButton = this.state.prevButton;
		if (prevButton != null && prevButton !== button) {
			prevButton.classList.remove(buttonClasses.Active);
		}
		this.setState({
			prevButton: button,
		});
	};

	handleClick = (event) => {
		const button = event.target;
		const operation = button.textContent;
		const action = button.getAttribute("data-action");
		this.handleInput(action, operation);
		this.addActiveStyle(button, action);
	};

	handleKeyPress = (event) => {
		const isNumeric = !isNaN(event.key) || event.key === Constants.SpecialKeys.DecimalPoint;
		if (isNumeric) {
			this.handleInput("number", event.key);
		} else {
			const eventResult = Helpers.getOperationFromKeyPress(event);
			this.handleInput(eventResult.action, eventResult.operation);
		}
	};

	handleInput = (action, operation) => {
		switch (action) {
			case "number":
				this.handleNumber(operation);
				break;
			case "operation":
				this.handleOperator(operation);
				break;
			case "function":
				this.handleFunction(operation);
				break;
			default:
				break;
		}
	};

	handleNumber = (operation) => {
		const plusLess = Helpers.decodeHtml(Constants.SpecialKeys.PlusLess);
		let input = this.state.input;
		let parsed = Number(input);

		// To avoid concatenating the current number to the initial zero
		if (this.state.shouldUpdateInput) input = "";
		if (input === "0") input = "";

		if (operation === Constants.SpecialKeys.DecimalPoint) {
			if (input.indexOf(".") < 0) {
				if (input === "") input = "0";
				input = input.concat(".");
			}
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
			shouldUpdateInput: false,
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

			case Helpers.decodeHtml(Constants.OperatorKeys.Division):
				currOperation = Constants.OperatorKeys.Division;
				this.divide(input, prevResult, currOperation);
				break;

			case Helpers.decodeHtml(Constants.OperatorKeys.Equals):
				// If the user hits the Equals key, and there is no input
				// then apply the previously executed operation
				const usePreviousOp = input === "0";
				this.handleOperator(prevOperation, usePreviousOp);
				break;

			case Helpers.decodeHtml(Constants.OperatorKeys.Delete):
				// If there is only one digit, display a zero
				// Otherwise, delete the last digit
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
	handleFunction = (operation, usePreviousOperation) => {
		let currOperation = "";
		let input = this.state.input;
		let prevResult = this.state.prevResult;
		// Use the accumulator to apply the last operation to the previos result
		if (usePreviousOperation) {
			input = this.state.accumulator;
		}

		if (prevResult === "") prevResult = "0";
		switch (operation) {
			case Helpers.decodeHtml(Constants.FunctionKeys.Percentage):
				currOperation = Constants.FunctionKeys.Percentage;
				this.percentage(input, prevResult, currOperation);
				break;

			case Helpers.decodeHtml(Constants.FunctionKeys.SquareRoot):
				currOperation = Constants.FunctionKeys.SquareRoot;
				this.squareRoot(input, prevResult, currOperation);
				break;

			case Helpers.decodeHtml(Constants.FunctionKeys.PowerTwo):
				currOperation = Constants.FunctionKeys.PowerTwo;
				this.powerTwo(input, prevResult, currOperation);
				break;

			case Helpers.decodeHtml(Constants.FunctionKeys.Logarithm):
				currOperation = Constants.FunctionKeys.Logarithm;
				this.logarithm(input, prevResult, currOperation);
				break;

			case Helpers.decodeHtml(Constants.FunctionKeys.NaturalLogarithm):
				currOperation = Constants.FunctionKeys.NaturalLogarithm;
				this.logarithmNatural(input, prevResult, currOperation);
				break;

			case Helpers.decodeHtml(Constants.FunctionKeys.Clear):
				this.clear();
				break;

			default:
				break;
		}
	};

	clear = () => {
		//Make sure the button is not null
		if (this.state.prevButton) {
			this.state.prevButton.classList.remove(buttonClasses.Active);
		}
		this.setState({
			input: "0",
			accumulator: 0,
			prevResult: 0,
			prevResultString: "",
			currOperation: "",
		});
	};

	add = (input, previousResult, currOperation) => {
		//If the calc is cleared and they press an operation button, do nothing
		let prevResultString = this.state.prevResultString;
		if (input === "0" && previousResult === 0) return;

		let lastChar = prevResultString.length - 1;
		let addChar = Constants.OperatorKeys.Add;
		currOperation = prevResultString[lastChar];

		if (previousResult === "" || previousResult === 0) {
			previousResult = Number(input);
			prevResultString = input + "+";
		} else {
			//If there's an operation in course, switch the operation to addition
			if (currOperation !== addChar) {
				if (input == previousResult) {
					prevResultString = Helpers.switchOperation(prevResultString, addChar);
					currOperation = addChar;
				} else {
					//Otherwise, execute previous operation and continue
					this.noRenderState.shouldUpdateWithoutRender = true;
					this.handleOperator(currOperation);

					//Update local state before applying current operation
					previousResult = this.noRenderState.prevResult;

					//Apply current operation
					prevResultString = prevResultString + input + "+";
					input = previousResult;
				}
			} else {
				previousResult = Number(previousResult) + Number(input);
				prevResultString = prevResultString + input + "+";
				input = previousResult;
			}
		}

		if (this.noRenderState.shouldUpdateWithoutRender) {
			this.noRenderState.prevResult = previousResult;
		}
		this.setState({
			input: input,
			accumulator: input,
			prevResult: previousResult,
			prevResultString: prevResultString,
			currOperation: currOperation,
			shouldUpdateInput: true,
		});
	};

	subtract = (input, previousResult, currOperation) => {
		//If the calc is cleared and the press an operation button, do nothing
		let prevResultString = this.state.prevResultString;
		if (input === "0" && previousResult === 0) return;

		let lastChar = prevResultString.length - 1;
		let substractChar = Constants.OperatorKeys.Substract;
		currOperation = prevResultString[lastChar];

		if (previousResult === "" || previousResult === 0) {
			previousResult = Number(input);
			prevResultString = input + "-";
		} else {
			//If there's an operation in course, switch the operation to addition
			if (currOperation !== substractChar && input == previousResult) {
				prevResultString = Helpers.switchOperation(prevResultString, substractChar);
				currOperation = substractChar;
			} else {
				previousResult = Number(previousResult) - Number(input);
				prevResultString = prevResultString + input + "-";
				input = previousResult;
			}
		}

		if (this.noRenderState.shouldUpdateWithoutRender) {
			this.noRenderState.prevResult = previousResult;
		}
		this.setState({
			input: input,
			accumulator: input,
			prevResult: previousResult,
			prevResultString: prevResultString,
			currOperation: currOperation,
			shouldUpdateInput: true,
		});
	};

	multiply = (input, previousResult, currOperation) => {
		//If the calc is cleared and the press an operation button, do nothing
		let prevResultString = this.state.prevResultString;
		if (input === "0" && previousResult === 0) return;

		let lastChar = prevResultString.length - 1;
		let multiplyChar = Constants.OperatorKeys.Multiply;
		currOperation = prevResultString[lastChar];

		if (previousResult === "" || previousResult === 0) {
			previousResult = Number(input);
			prevResultString = input + "x";
		} else {
			//If there's an operation in course, switch the operation to addition
			if (currOperation !== multiplyChar && input == previousResult) {
				prevResultString = Helpers.switchOperation(prevResultString, multiplyChar);
				currOperation = multiplyChar;
			} else {
				previousResult = Number(previousResult) * Number(input);
				prevResultString = prevResultString + input + "x";
				input = previousResult;
			}
		}

		if (this.noRenderState.shouldUpdateWithoutRender) {
			this.noRenderState.prevResult = previousResult;
		}
		this.setState({
			input: input,
			accumulator: input,
			prevResult: previousResult,
			prevResultString: prevResultString,
			currOperation: currOperation,
			shouldUpdateInput: true,
		});
	};

	divide = (input, previousResult, currOperation) => {
		//If the calc is cleared and the press an operation button, do nothing
		let prevResultString = this.state.prevResultString;
		if (input === "0" && previousResult === 0) return;

		let lastChar = prevResultString.length - 1;
		let divisionChar = Constants.OperatorKeys.Division;
		currOperation = prevResultString[lastChar];

		if (previousResult === "" || previousResult === 0) {
			previousResult = Number(input);
			prevResultString = input + "/";
		} else {
			//Avoid divide by zero exception
			if (input === "0") {
			} else {
				//If there's an operation in course, switch the operation to addition
				if (currOperation !== divisionChar && input == previousResult) {
					prevResultString = Helpers.switchOperation(prevResultString, divisionChar);
					currOperation = divisionChar;
				} else {
					previousResult = Number(previousResult) / Number(input);
					prevResultString = prevResultString + input + "/";
					input = previousResult;
				}
			}
		}

		if (this.noRenderState.shouldUpdateWithoutRender) {
			this.noRenderState.prevResult = previousResult;
		}
		this.setState({
			input: input,
			accumulator: input,
			prevResult: previousResult,
			prevResultString: prevResultString,
			currOperation: currOperation,
			shouldUpdateInput: true,
		});
	};

	percentage = (input, previousResult, currOperation) => {
		let prevResult = "";
		if (previousResult === "" || previousResult === "0") {
			prevResult = Number(input);
		} else {
			prevResult = Number(previousResult) * (Number(input) / 100);
		}

		this.setState({
			input: "0",
			accumulator: input,
			prevResult: prevResult,
			currOperation: currOperation,
		});
	};

	squareRoot = (input, previousResult, currOperation) => {
		if (input === "0" && previousResult !== "0") {
			previousResult = Math.sqrt(Number(previousResult));
		} else {
			previousResult = Math.sqrt(Number(input));
		}
		this.setState({
			input: "0",
			accumulator: input,
			prevResult: previousResult,
			currOperation: currOperation,
		});
	};

	powerTwo = (input, previousResult, currOperation) => {
		if (input === "0" && previousResult !== "0") {
			previousResult = Math.pow(Number(previousResult), 2);
		} else {
			previousResult = Math.pow(Number(input), 2);
		}
		this.setState({
			input: "0",
			accumulator: input,
			prevResult: previousResult,
			currOperation: currOperation,
		});
	};

	powerN = (input, previousResult, currOperation) => {
		previousResult = Math.pow(Number(previousResult), Number(input));

		this.setState({
			input: "0",
			accumulator: input,
			prevResult: previousResult,
			currOperation: currOperation,
		});
	};

	logarithm = (input, previousResult, currOperation) => {
		if (input === "0" && previousResult !== "0") {
			previousResult = Math.log10(Number(previousResult));
		} else {
			previousResult = Math.log10(Number(input));
		}
		this.setState({
			input: "0",
			accumulator: input,
			prevResult: previousResult,
			currOperation: currOperation,
		});
	};

	logarithmNatural = (input, previousResult, currOperation) => {
		if (input === "0" && previousResult !== "0") {
			previousResult = Math.log(Number(previousResult));
		} else {
			previousResult = Math.log(Number(input));
		}
		this.setState({
			input: "0",
			accumulator: input,
			prevResult: previousResult,
			currOperation: currOperation,
		});
	};
}

export default Calculator;
