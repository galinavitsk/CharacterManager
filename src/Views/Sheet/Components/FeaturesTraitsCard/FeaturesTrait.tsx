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

import { ModifyTraits } from "../../../../redux/actionCreators";

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
	modifyTraits: (newTraits, category) =>
		dispatch(UpdateCharacter(ModifyTraits(newTraits, category))),
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
	const deleteFeature = (category, trait) => {
		closeTraitModal();
		switch (category) {
			case "racial":
				var newTraits = [...props.race.traits];
				for (let index = 0; index < newTraits.length; index++) {
					if (newTraits[index].id == trait.id) {
						newTraits.splice(index, 1);
					}
				}

				props.modifyTraits(newTraits, "racial");
				break;
			case "background":
				var newTraits = [...props.background.traits];
				for (let index = 0; index < newTraits.length; index++) {
					if (newTraits[index].id == trait.id) {
						newTraits.splice(index, 1);
					}
				}
				props.modifyTraits(newTraits, "background");
				break;
			case "other":
				var newTraits = [...props.traits];
				for (let index = 0; index < newTraits.length; index++) {
					if (newTraits[index].id == trait.id) {
						newTraits.splice(index, 1);
					}
				}
				props.modifyTraits(newTraits, "other");
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
				var newTraits = [...props.race.traits];
				newTraits.push(newTrait);
				props.modifyTraits(newTraits, "racial");
				break;
			case "background":
				var newTraits = [...props.background.traits];
				newTraits.push(newTrait);
				props.modifyTraits(newTraits, "background");
				break;
			case "other":
				var newTraits = [...props.traits];
				newTraits.push(newTrait);
				props.modifyTraits(newTraits, "other");
				break;
			default:
				break;
		}
		setFeatureType("");
		closeTraitModal();
	};

	const editTrait = (newTrait: any, featureType: string) => {
		console.log(newTrait);
		switch (featureType) {
			case "racial":
				var newTraits = [...props.race.traits];
				newTraits.map((trait) => {
					if (trait.id == newTrait.id) {
						trait.name = newTrait.name;
						trait.description = newTrait.description;
						trait.savingThrowsProf = newTrait.savingThrowsProf;
						trait.modifiers = newTrait.modifiers;
						trait.smallProf = newTrait.smallProf;
						trait.smallTools = newTrait.smallTools;
					}
				});
				console.log(newTraits);
				props.modifyTraits(newTraits, "racial");
				break;
			case "background":
				var newTraits = [...props.background.traits];
				newTraits.map((trait) => {
					if (trait.id == newTrait.id) {
						trait.name = newTrait.name;
						trait.description = newTrait.description;
						trait.savingThrowsProf = newTrait.savingThrowsProf;
						trait.modifiers = newTrait.modifiers;
						trait.smallProf = newTrait.smallProf;
						trait.smallTools = newTrait.smallTools;
					}
				});
				props.modifyTraits(newTraits, "background");
				break;
			case "other":
				var newTraits = [...props.traits];
				newTraits.map((trait) => {
					if (trait.id == newTrait.id) {
						trait.name = newTrait.name;
						trait.description = newTrait.description;
						trait.savingThrowsProf = newTrait.savingThrowsProf;
						trait.modifiers = newTrait.modifiers;
						trait.smallProf = newTrait.smallProf;
						trait.smallTools = newTrait.smallTools;
					}
				});
				props.modifyTraits(newTraits, "other");
				break;
			default:
				break;
		}
		setFeatureType("");
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
										<RaceFeatures
											trait={r}
											deleteTrait={deleteFeature}
											editTrait={editTrait}
										/>
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
							props.classes.map((c: any) => (
								<ClassFeatures c={c} deleteTrait={deleteFeature} />
							))}

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
										<BackgroundFeatures
											trait={b}
											deleteTrait={deleteFeature}
											editTrait={editTrait}
										/>
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
										<OtherFeatures
											trait={t}
											deleteTrait={deleteFeature}
											editTrait={editTrait}
										/>
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
