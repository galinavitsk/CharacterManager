import * as React from "react";
import { Component, useState } from "react";
import { faDiceD20, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import Equal from "../../../../scripts/SolveDiceEqualtion";
import "./Calc.css";
import GetAbilityMod from "../../../../scripts/GetAbilityMod";
import { connect } from "react-redux";
import {
	UpdateCurrentHealth,
	UpdateCurrentHitDice,
	UpdateCharacter,
} from "../../../../redux/actionCreators";

const mapStateToProps = (state) => {
	return {
		currentHealth: state.currentHealth,
		maxHealth: state.maxHealth,
		constitution: state.abilityScores["Constitution"],
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateCurrentHealth: (payload) =>
		dispatch(UpdateCharacter(UpdateCurrentHealth(payload))),
	updateCurrentHitDice: (iD, payload) =>
		dispatch(UpdateCharacter(UpdateCurrentHitDice(iD, payload))),
});

const HitDiceRoller = (props) => {
	const [rolled, setRolled] = useState(null);
	const [substring, setSubstring] = useState("");

	const RollHitDice = () => {
		let hitDiceRolled = Math.floor(Math.random() * props.HD) + 1;
		setSubstring(
			"(" + hitDiceRolled + ")+" + GetAbilityMod(props.constitution)
		);
		setRolled(hitDiceRolled + GetAbilityMod(props.constitution));
	};

	const Accept = () => {
		let CH: number = props.currentHealth + rolled;
		if (CH > props.maxHealth) {
			CH = props.maxHealth;
		}
		props.updateCurrentHealth(CH);
		if (rolled > 0) {
			props.updateCurrentHitDice(props.classId, props.CHD - 1);
		}
		props.onHClose();
	};
	return (
		<>
			<div
				className="row"
				style={{ fontSize: "20px", color: "#708F93", justifyContent: "center" }}
			>
				Spend d{props.HD} HD
			</div>
			<div
				className="row"
				style={{ fontSize: "16px", color: "#708F93", justifyContent: "center" }}
			>
				{props.CHD}d{props.HD}
			</div>
			<div className="row">
				<div
					className="col-3 icon"
					style={{ fontSize: "40px", textAlign: "center" }}
					onClick={() => {
						RollHitDice();
					}}
				>
					<FontAwesomeIcon icon={faDiceD20} />
				</div>
				<div
					className="col-6"
					style={{ fontSize: "40px", color: "#708F93", textAlign: "center" }}
				>
					{rolled}
				</div>
				<div
					className="col-3 icon"
					style={{ fontSize: "40px", textAlign: "center" }}
					onClick={() => {
						Accept();
					}}
				>
					<FontAwesomeIcon icon={faCheck} />
				</div>
			</div>

			<div
				className="row"
				style={{ fontSize: "12px", color: "#708F93", justifyContent: "center" }}
			>
				{substring}
			</div>
		</>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(HitDiceRoller);
