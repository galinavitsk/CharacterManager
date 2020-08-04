import * as React from "react";
import { Component } from "react";
import Toast from "react-bootstrap/Toast";

export interface DiceRollProps {
    roll;
    deleteRoll;
}

export interface DiceRollState {}

class DiceRoll extends React.Component<DiceRollProps, DiceRollState> {
	state = {
		show: true,
	};
	render() {
		return (
			<Toast
				show={this.state.show}
				onClose={() => {
                    this.props.deleteRoll(this.props.roll);
                }}
                delay={3000}
                autohide
			>
				<Toast.Header>
                    <strong className="mr-auto">{
                    this.props.roll.title}</strong>
					<small></small>
				</Toast.Header>
				<Toast.Body>
					{this.props.roll.message}
				</Toast.Body>
			</Toast>
		);
	}
}

export default DiceRoll;
