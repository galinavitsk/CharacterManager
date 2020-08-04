import * as React from "react";
import { Component, useState } from "react";
import StatusBar from "../../../Components/StatusBar";
import Modal from "react-bootstrap/Modal";
import PointsCalculator from "./PointsCalculator";
import HitDiceRoller from "./HitDiceRoller";
import { connect } from "react-redux";
import { UpdateCurrentHealth } from "../../../../redux/actionCreators";

const mapStateToProps = (state: {
	currentHealth: any;
	maxHealth: any;
	classes: any;
	tempHealth: any;
}) => {
	return {
		currentHealth: state.currentHealth,
		maxHealth: state.maxHealth,
		classes: state.classes,
		tempHealth: state.tempHealth,
	};
};

const mapDispatchToProps = (
	dispatch: (arg0: { type: string; payload: number }) => any
) => ({
	updateCurrentHealth: (payload: number) =>
		dispatch(UpdateCurrentHealth(payload)),
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

const HealthCard = (props: {
	currentHealth: number;
	maxHealth: number;
	tempHealth: number;
	classes: any[];
}) => {
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
						value={(props.currentHealth / props.maxHealth) * 100}
						label={GetLabelHealth(
							props.currentHealth,
							props.maxHealth,
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
