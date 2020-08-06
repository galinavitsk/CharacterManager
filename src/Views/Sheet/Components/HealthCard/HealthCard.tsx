import * as React from "react";
import { Component, useState } from "react";
import StatusBar from "../../../Components/StatusBar";
import Modal from "react-bootstrap/Modal";
import PointsCalculator from "./PointsCalculator";
import HitDiceRoller from "./HitDiceRoller";
import { connect } from "react-redux";
import GetCharacterLevel from "../../../../scripts/GetCharacterLevel";
import GetProficiency from "../../../../scripts/GetProficiency"

const mapStateToProps = (state) => {
	return {
		currentHealth: state.currentHealth,
		maxHealth: state.maxHealth,
		classes: state.classes,
		tempHealth: state.tempHealth,
		race:state.race,
		background:state.background,
		traits:state.traits
	};
};

const mapDispatchToProps = (
	dispatch) => ({
});

function GetLabelHealth(ch: number, mh: number, temp: number) {
	let label: string = ch + "/" + mh;
	if (temp > 0) {
		label = ch + "/" + mh + " + " + temp + " TEMP";
	}

	return label;
}
function GetLabelHitDice(currentHD: number, HD: number) {
	let label: string = currentHD + "d" + HD;
	return label;
}

const HealthCard = (props) => {
	const [isOpenP, setIsOpenP] = useState(false);
	const [isOpenH, setIsOpenH] = useState(false);
	const [classId, setClassId] = useState();
	const [hitDie, setHitDie] = useState(4);
	const [currentHitDice, setCurrentHitDice] = useState(1);
	const onPToggle = () => {
		setIsOpenP(!isOpenP);
	};
	const onHOpen = (ID, HD, CHD) => {
		if (CHD > 0) {
			setClassId(ID);
			setHitDie(HD);
			setCurrentHitDice(CHD);
			setIsOpenH(true);
		}
	};
	const onHClose = () => {
		setIsOpenH(false);
	};
	const GetTotalHealth=()=>{
		
		var values = { currentScore: props.maxHealth, ProfAdded: false };
		if (props.race != null) {
			values=GetModifiers(props.race,values);
			if (props.race.traits != null) {
				props.race.traits.forEach((trait) => {
					values = GetModifiers(trait, values);
				});
			}
		}
		if (props.classes != null) {
			props.classes.forEach((c) => {
				if (c.traits != null) {
					c.traits.forEach((trait) => {
						values = GetModifiers(trait, values);
					});
				}
				if (c.subclass != null && c.subclass.traits != null) {
					c.subclass.traits.forEach((trait) => {
						values = GetModifiers(trait, values);
					});
				}
			});
		}
		if (props.background != null) {
			if (props.background.traits != null) {
				props.background.traits.forEach((trait) => {
					values == GetModifiers(trait, values);
				});
			}
		}
		if (props.traits != null) {
			props.traits.forEach((trait) => {
				values == GetModifiers(trait, values);
			});
		}
		return values.currentScore;
	}

	const GetModifiers = (trait, values) => {
		if (trait.modifiers != null) {
			trait.modifiers.forEach((modifier) => {
				if (modifier.category == "Bonus") {
					if(modifier.type=="Hit Points"){
						if (modifier.value == "+Proficiency Bonus") {
							if (values.ProfAdded == false) {
								values.currentScore += GetProficiency(
									GetCharacterLevel(props.classes),
									props.race,
									props.classes,
									props.background,
									props.traits
								);
								values.ProfAdded = true;
							}
						} else if (modifier.value.includes("+")) {
							values.currentScore += parseInt(
								modifier.value.toString().substr(1)
							);
						} else if (modifier.value.includes("-")) {
							values.currentScore -= parseInt(
								modifier.value.toString().substr(1)
							);
						}}
				}
			});
		}
		return values;
	};
	return (
		<>
			<div className="card" style={{ textAlign: "center" }}>
				<span style={{ fontSize: "20px", color: "#708F93" }}>Hit Points</span>
				<div
					className="HealthBar"
					onClick={() => {
						onPToggle();
					}}
				>
					<StatusBar
						bColor="#9DBE9E"
						fColor="#BAE6BC"
						value={(props.currentHealth / (GetTotalHealth())) * 100}
						label={GetLabelHealth(
							props.currentHealth,
							GetTotalHealth(),
							props.tempHealth
						)}
					/>
				</div>
				{props.classes.length >= 0 &&
					props.classes.map((c) => (
						<div style={{ marginTop: "2px" }}>
							<div
								className="HitPointsBar"
								onClick={() => {
									onHOpen(c.id, c.hitDie, c.currentHDie);
								}}
							>
								<StatusBar
									bColor="#c5d2db"
									fColor="#D8E2E9"
									value={(c.currentHDie / c.classLevel) * 100}
									label={GetLabelHitDice(c.currentHDie, c.hitDie)}
								/>
							</div>
						</div>
					))}
			</div>
			<Modal
				show={isOpenP}
				size="sm"
				onHide={onPToggle}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Body bsPrefix="modalContentCard">
					<PointsCalculator onPToggle={onPToggle.bind(this)} />
				</Modal.Body>
			</Modal>
			<Modal
				show={isOpenH}
				size="sm"
				onHide={onHClose}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Body bsPrefix="modalContentCard">
					<HitDiceRoller
						classId={classId}
						CHD={currentHitDice}
						HD={hitDie}
						onHClose={onHClose.bind(this)}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthCard);
