import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
	return (
		<button type="button" className={classes.Button}>
			{props.text}
		</button>
	);
};

export default Button;
