import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import "./featurestraits.css";
import ClassFeatures from "./Features/ClassFeatures";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronDown,
	faChevronLeft,
	faPlus,
	faCog,
	faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/esm/Modal";
import TraitModal from "./TraitModal/TraitModal";
import OtherFeatures from "./Features/OtherFeatures";
import BackgroundFeatures from "./Features/BackgroundFeatures";
import RaceFeatures from "./Features/RaceFeatures";
import {
	trueDependencies,
	bellNumbersDependencies,
	falseDependencies,
} from "mathjs";

const mapStateToProps = (state) => {
	return {
		race: state.race,
		classes: state.classes,
		background: state.background,
		traits: state.traits,
	};
};

const mapDispatchToProps = (dispatch) => ({});

const FeaturesTrait = (props) => {
	const [showFeatures, setShowFeatures] = React.useState(false);

	const [showBackgroundFeatures, setShowBackgroundFeatures] = React.useState(
		true
	);
	const [showRaceFeatures, setShowRaceFeatures] = React.useState(true);
	const [showOtherFeatures, setShowOtherFeatures] = React.useState(true);
	const [isOpen, setIsOpen] = React.useState(false);
	const [trait, setTrait] = React.useState(null);
	const [isEditing, setIsEditing] = React.useState(false);
	const [isNew, setIsNew] = React.useState(false);
	const [featureType, setFeatureType] = React.useState("");

	const closeTraitModal = () => {
		setIsOpen(false);
		setIsEditing(false);
		setIsNew(false);
	};
	const addNewTrait = (newTrait) => {
		switch (featureType) {
			case "racial":
				props.race.traits.push(newTrait);
				break;
			case "background":
				props.background.traits.push(newTrait);
				break;
			case "other":
				props.traits.push(newTrait);
				break;
			default:
				break;
		}
		setFeatureType("");
		closeTraitModal();
	};

	return (
		<div className="card">
			<div className="container">
				<div
					className="row"
					style={{ fontSize: "20px", color: "#708F93" }}
					onClick={() => {
						setShowFeatures(!showFeatures);
					}}
				>
					<div className="col-10">Features and Traits</div>
					<div className="col-2" style={{ float: "right", textAlign: "right" }}>
						<div className="icon">
							{showFeatures ? (
								<FontAwesomeIcon icon={faChevronDown} />
							) : (
								<FontAwesomeIcon icon={faChevronLeft} />
							)}
						</div>
					</div>
				</div>
				<hr />
				{showFeatures ? (
					<>
						<div
							className="row featureHeader"
							onClick={() => {
								setShowRaceFeatures(!showRaceFeatures);
							}}
						>
							<div className="col-10">Race: {props.race.name}</div>
							<div
								className="col-2"
								style={{ float: "right", textAlign: "right" }}
							>
								<div className="icon">
									{showRaceFeatures ? (
										<FontAwesomeIcon icon={faChevronDown} />
									) : (
										<FontAwesomeIcon icon={faChevronLeft} />
									)}
								</div>
							</div>
						</div>
						{showRaceFeatures
							? <>{props.race.traits.map((r) => (
										<RaceFeatures trait={r} />
										
							  ))}
							  <div
							className="row icon"
							style={{ fontSize: "12px", paddingLeft: "20px" }}
							onClick={() => {
								setIsEditing(true);
								setIsNew(true);
								setFeatureType("racial");
								setIsOpen(true);
							}}
						>
							<FontAwesomeIcon
								icon={faPlusCircle}
								style={{ marginRight: "5px" }}
							/>
							Add Racial Feature
						</div>
									</>
							: null}

						

						<hr></hr>
						{props.classes.length >= 1 &&
							props.classes.map((c) => <ClassFeatures c={c} />)}

						<div
							className="row featureHeader"
							onClick={() => {
								setShowBackgroundFeatures(!showBackgroundFeatures);
							}}
						>
							<div className="col-10">Background: {props.background.name}</div>
							<div
								className="col-2"
								style={{ float: "right", textAlign: "right" }}
							>
								<div className="icon">
									{showBackgroundFeatures ? (
										<FontAwesomeIcon icon={faChevronDown} />
									) : (
										<FontAwesomeIcon icon={faChevronLeft} />
									)}
								</div>
							</div>
						</div>
						{showBackgroundFeatures
							? <>{props.background.traits.map((b) => (
										<BackgroundFeatures trait={b} />
										
							  ))}
							  <div
							className="row icon"
							style={{ fontSize: "12px", paddingLeft: "20px" }}
							onClick={() => {
								setIsEditing(true);
								setIsNew(true);
								setFeatureType("background");
								setIsOpen(true);
							}}
						>
							<FontAwesomeIcon
								icon={faPlusCircle}
								style={{ marginRight: "5px" }}
							/>
							Add Background Feature
						</div>
									</>
							: null}
							
						<hr />
						<div
							className="row featureHeader"
							onClick={() => {
								setShowOtherFeatures(!showOtherFeatures);
							}}
						>
							<div className="col-10">Other(Feats, Features, Traits)</div>
							<div
								className="col-2"
								style={{ float: "right", textAlign: "right" }}
							>
								<div className="icon">
									{showOtherFeatures ? (
										<FontAwesomeIcon icon={faChevronDown} />
									) : (
										<FontAwesomeIcon icon={faChevronLeft} />
									)}
								</div>
							</div>
						</div>
						{showOtherFeatures
							? <>{props.traits.map((t) => <OtherFeatures trait={t} />)}
							<div
							className="row icon"
							style={{ fontSize: "12px", paddingLeft: "20px" }}
							onClick={() => {
								setIsEditing(true);
								setIsNew(true);
								setFeatureType("other");
								setIsOpen(true);
							}}
						>
							<FontAwesomeIcon
								icon={faPlusCircle}
								style={{ marginRight: "5px" }}
							/>
							Add Other Feature
						</div></>
							: null}
							
						<hr />
					</>
				) : null}
			</div>
			<Modal
				show={isOpen}
				size="sm"
				onHide={() => setIsOpen(false)}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Body bsPrefix="modalContentCard">
					<TraitModal
						trait={trait}
						closeModal={closeTraitModal}
						editing={isEditing}
						isNew={isNew}
						addFeature={addNewTrait}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(FeaturesTrait);
