import Constants from "./Constants";

const Helpers = {
	decodeHtml: (htmlEntity) => {
		var txt = document.createElement("textarea");
		txt.innerHTML = htmlEntity;
		return txt.value;
	},
	getOperationFromKeyPress: (event) => {
		const eventKey = event.key;
		const result = {
			operation: "",
			action: "",
		};

		switch (eventKey) {
			case Constants.OperatorKeys.Add:
				result.operation = Constants.OperatorKeys.Add;
				result.action = "operation";
				break;
			case Constants.OperatorKeys.Substract:
				result.operation = Constants.OperatorKeys.Substract;
				result.action = "operation";
				break;
			case Constants.OperatorKeys.Equals:
				result.operation = Constants.OperatorKeys.Equals;
				result.action = "operation";
				break;
			case "/":
				result.operation = Constants.OperatorKeys.Division;
				result.action = "operation";
				break;
			case "*":
				result.operation = Constants.OperatorKeys.Multiply;
				result.action = "operation";
				break;
			case "Backspace":
			case "Delete":
				result.operation = Constants.OperatorKeys.Delete;
				result.action = "operation";
				break;
			case "Escape":
				result.operation = Constants.FunctionKeys.Clear;
				result.action = "function";
				break;
			case Constants.FunctionKeys.Percentage:
				result.operation = Constants.FunctionKeys.Percentage;
				result.action = "function";
				break;

			default:
				break;
		}

		return result;
	},
};

export default Helpers;
