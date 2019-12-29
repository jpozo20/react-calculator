import React, { Component } from "react";

import classes from "./Screen.module.css";

class Screen extends Component {
	render() {
		return (
			<div className={classes.Screen}>
				<div className={classes.PrevResult}>
					<span>{this.props.prevResult}</span>
				</div>
				<div className={classes.Result}>
					<span>{this.props.input}</span>
				</div>
			</div>
		);
	}
}

export default Screen;
