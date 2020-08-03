import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import "./featurestraits.css";
import ClassFeatures from "./Features/ClassFeatures";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronDown,
	faChevronLeft,
	faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/esm/Modal";
import TraitModal from "./TraitModal/TraitModal";
import OtherFeatures from "./Features/OtherFeatures";
import BackgroundFeatures from "./Features/BackgroundFeatures";
import RaceFeatures from "./Features/RaceFeatures";

import { UpdateTrait } from '../../../../redux/actionCreators';

const mapStateToProps = (state: {
	race: any;
	classes: any;
	background: any;
	traits: any;
}) => {
	return {
		race: state.race,
		classes: state.classes,
		background: state.background,
		traits: state.traits,
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateTrait: (newTraits,category) => dispatch(UpdateTrait(newTraits,category))
});

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
	const deleteFeature = (category,trait) => {
		console.log("Test")
		closeTraitModal();
		switch (category) {
			case "racial":
				var newTraits = [...props.race.traits];
				for (let index = 0; index < newTraits.length; index++) {
					if (newTraits[index].id == trait.id) {
						newTraits.splice(index, 1);
					}
				}
				
		props.updateTrait(newTraits,"racial");
				break;
			case "background":
				var newTraits = [...props.background.traits];
				for (let index = 0; index < newTraits.length; index++) {
					if (newTraits[index].id == trait.id) {
						newTraits.splice(index, 1);
					}
				}
				props.updateTrait(newTraits,"background");
				break;
			case "other":
				var newTraits = [...props.traits];
				for (let index = 0; index < newTraits.length; index++) {
					if (newTraits[index].id == trait.id) {
						newTraits.splice(index, 1);
					}
				}props.updateTrait(newTraits,"other");
				break;
			default:
				break;
		}
		setFeatureType("");
		setTrait(null);

	};
	const addNewTrait = (newTrait: any) => {
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
						{showRaceFeatures ? (
							<>
								{props.race.traits.map(
									(r: { name: {}; description: React.ReactNode }) => (
										<RaceFeatures trait={r} deleteTrait={deleteFeature}/>
									)
								)}
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
						) : null}

						<hr></hr>
						{props.classes.length >= 1 &&
							props.classes.map((c: any) => <ClassFeatures c={c} deleteTrait={deleteFeature}/>)}

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
						{showBackgroundFeatures ? (
							<>
								{props.background.traits.map(
									(b: { name: {}; description: React.ReactNode }) => (
										<BackgroundFeatures trait={b} deleteTrait={deleteFeature}/>
									)
								)}
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
						) : null}

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
						{showOtherFeatures ? (
							<>
								{props.traits.map(
									(t: { name: {}; description: React.ReactNode }) => (
										<OtherFeatures trait={t} deleteTrait={deleteFeature}/>
									)
								)}
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
								</div>
							</>
						) : null}

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
