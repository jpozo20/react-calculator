import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
	return (
		<button
			type="button"
			className={classes.Button}
			data-action={props.action}
			onClick={props.buttonClicked}>
			{props.text}
		</button>
	);
};

export default Button;
