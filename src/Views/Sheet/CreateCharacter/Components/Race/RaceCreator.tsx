import React, { useState } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMinusCircle,
	faEdit,
	faPlusCircle,
	faTimes,
	faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/esm/Modal";
import ModifierEdit from "../../../Components/FeaturesTraitsCard/TraitModal/ModifierEdit";
import { Guid } from "guid-typescript";
import RaceFeatures from "../../../Components/FeaturesTraitsCard/Features/RaceFeatures";
import TraitModal from "../../../Components/FeaturesTraitsCard/TraitModal/TraitModal";
import {MyEditor} from "../../../../Components/MyEditor"
const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => ({});

const RaceCreator = (props) => {
	const [modifiers, setModifiers] = React.useState(props.modifiers);
	const [isModifierEdit, setIsModifierEdit] = React.useState(false);
	const [modifierName, setModifierName] = React.useState(null);
	const [modifierId, setModifierId] = React.useState("");
	const [modifierCategory, setModifierCategory] = React.useState("");
	const [modifierType, setModifierType] = React.useState("");
	const [modifierValue, setModifierValue] = React.useState("");

	const [traits, setTraits] = React.useState(props.traits);
	const [traitsModalOpen, setTraitsModalOpen] = React.useState(false);
	const [isEditing, setIsEditing] = React.useState(false);
	const [isNew, setIsNew] = React.useState(false);

	const [saveModalOpen, setSaveModalOpen] = React.useState(false);

	const handleDeleteModifier = (modifier: { id: any }) => {
		var newModifiers = [...modifiers];
		for (let index = 0; index < newModifiers.length; index++) {
			if (newModifiers[index].id == modifier.id) {
				newModifiers.splice(index, 1);
			}
		}
		setModifiers(newModifiers);
		props.setRaceModifiers(newModifiers);
	};

	const openEditModifier = (modifier: {
		id: React.SetStateAction<string>;
		name: any;
		category: React.SetStateAction<string>;
		type: React.SetStateAction<string>;
		value: React.SetStateAction<string>;
	}) => {
		if (modifier != null) {
			setModifierId(modifier.id);
			setModifierName(modifier.name);
			setModifierCategory(modifier.category);
			setModifierType(modifier.type);
			setModifierValue(modifier.value);
		} else {
			setModifierName("");
			setModifierCategory("Bonus");
			setModifierType("Proficiency Bonus");
			setModifierValue("+0");
		}
		setIsModifierEdit(true);
	};
	const handleModifierNameChange = (e: any) => {
		setModifierName(e.target.value);
	};
	const handleModifierCategoryChange = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setModifierCategory(e.target.value);
		if (e.target.value == "Bonus") {
			setModifierType("Proficiency Bonus");
			setModifierValue("+Proficiency Bonus");
		}
		if (e.target.value == "Ability Score") {
			setModifierType("Strength");
			setModifierValue("+Proficiency Bonus");
		}
		if (e.target.value == "Ability Modifier") {
			setModifierType("Strength");
			setModifierValue("+Proficiency Bonus");
		}
		if (e.target.value == "Saving Throw") {
			setModifierType("Strength");
			setModifierValue("+Proficiency Bonus");
		}
		if (e.target.value == "Skill") {
			setModifierType("Acrobatics");
			setModifierValue("+Proficiency Bonus");
		}
	};
	const handleModifierTypeChange = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setModifierType(e.target.value);
	};
	const handleModifierValueChange = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setModifierValue(e.target.value);
	};
	const handleModifierSave = () => {
		var newModifier: Modifier = {
			id: Guid.create(),
			name: modifierName,
			category: modifierCategory,
			type: modifierType,
			value: modifierValue,
		};
		if (modifiers.filter((mod) => mod.id.equals(modifierId)).length > 0) {
			modifiers
				.filter((mod) => mod.id.equals(modifierId))
				.map(
					(m) => (
						(m.name = modifierName),
						(m.category = modifierCategory),
						(m.type = modifierType),
						(m.value = modifierValue)
					)
				);
		} else {
			modifiers.push(newModifier);
		}
		setIsModifierEdit(false);
		props.setRaceModifiers(newModifiers);
	};

	const deleteFeature = (category, trait) => {
		var newTraits = [...traits];
		for (let index = 0; index < newTraits.length; index++) {
			if (newTraits[index].id == trait.id) {
				newTraits.splice(index, 1);
			}
		}
		setTraits(newTraits);
		props.setRaceTraits(newTraits);
	};
	const editTrait = (newTrait: any, featureType: string) => {
		console.log(newTrait);
		var newTraits = [...traits];
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

		setTraits(newTraits);

		props.setRaceTraits(newTraits);

		closeTraitModal();
	};
	const closeTraitModal = () => {
		setTraitsModalOpen(false);
		setIsEditing(false);
		setIsNew(false);
	};
	const addNewTrait = (newTrait: any) => {
		var newTraits = [...traits];
		newTraits.push(newTrait);
		setTraits(newTraits);

		props.setRaceTraits(newTraits);
		closeTraitModal();
	};

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="icon" onClick={() => props.onStopEdit()}>
							<FontAwesomeIcon icon={faTimes} />
						</div>
					</div>
					<div className="col">
						<div
							className="icon"
							style={{ float: "right" }}
							onClick={() => setSaveModalOpen(true)}
						>
							<FontAwesomeIcon icon={faCheck} />
						</div>
					</div>
				</div>
				<div className="row">
					<Form style={{ width: "100%" }}>
						<Row>
							<Col>
								<Form.Group>
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="text"
										value={props.name}
										onChange={props.handleNameChange.bind(this)}
										placeholder=" "
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<MyEditor editorState={props.description} onChange={props.handleDescriptionChange}/>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group>
									<Form.Label>Size</Form.Label>
									<Form.Control
										as="select"
										custom
										value={props.size}
										onChange={props.handleSizeChange.bind(this)}
									>
										<option>Tiny</option>
										<option>Small</option>
										<option>Medium</option>
										<option>Large</option>
										<option>Huge</option>
										<option>Gragantuan</option>
									</Form.Control>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group>
									<Form.Label>Speed</Form.Label>
									<Form.Control
										type="text"
										placeholder=" "
										value={props.speed}
										onChange={props.handleSpeedChange.bind(this)}
									/>
								</Form.Group>
							</Col>
						</Row>
					</Form>
				</div>

				<hr />
				<div className="row">Modifiers</div>
				{modifiers != null &&
					modifiers.length > 0 &&
					modifiers.map((m) => (
						<>
							<div className="row" style={{ fontSize: "12px" }}>
								<div
									className="col-1 icon"
									style={{ paddingRight: "0", textAlign: "right" }}
									onClick={() => {
										handleDeleteModifier(m);
									}}
								>
									<FontAwesomeIcon icon={faMinusCircle} />
								</div>
								<div
									className="col-1 icon"
									style={{
										paddingLeft: "0",
										paddingRight: "0",
										textAlign: "right",
									}}
									onClick={() => openEditModifier(m)}
								>
									<FontAwesomeIcon icon={faEdit} />
								</div>
								<div className="col-8">
									{(m.name != null || m.name != "") && m.name}
									{(m.name == null || m.name == "") && (
										<>
											{m.type} {m.value}
										</>
									)}
								</div>
							</div>
						</>
					))}
				<div
					className="row"
					style={{ fontSize: "12px" }}
					onClick={() => openEditModifier(null)}
				>
					<div
						className="col-1 icon"
						style={{ paddingRight: "0", textAlign: "right" }}
					>
						<FontAwesomeIcon icon={faPlusCircle} />
					</div>
					<div className="col-10">Add new Modifier</div>
				</div>
				<hr />
				<div className="row">Traits</div>
				<>
					{traits != null &&
						traits.map((r: { name: {}; description: React.ReactNode }) => (
							<RaceFeatures
								trait={r}
								deleteTrait={deleteFeature}
								editTrait={editTrait}
							/>
						))}
					<div
						className="row icon"
						style={{ fontSize: "12px", paddingLeft: "20px" }}
						onClick={() => {
							setIsEditing(true);
							setIsNew(true);
							setTraitsModalOpen(true);
						}}
					>
						<FontAwesomeIcon
							icon={faPlusCircle}
							style={{ marginRight: "5px" }}
						/>
						Add Racial Feature
					</div>
				</>
			</div>

			<Modal
				show={isModifierEdit}
				size="sm"
				onHide={() => setIsModifierEdit(false)}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Body bsPrefix="modalContentCard">
					<div className="container-fluid">
						<ModifierEdit
							setIsModifierEdit={setIsModifierEdit}
							modifierName={modifierName}
							handleModifierNameChange={handleModifierNameChange}
							modifierCategory={modifierCategory}
							handleModifierCategoryChange={handleModifierCategoryChange}
							modifierType={modifierType}
							handleModifierTypeChange={handleModifierTypeChange}
							modifierValue={modifierValue}
							handleModifierValueChange={handleModifierValueChange}
							handleModifierSave={handleModifierSave}
						/>
					</div>
				</Modal.Body>
			</Modal>
			<Modal
				show={traitsModalOpen}
				size="sm"
				onHide={() => setTraitsModalOpen(false)}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Body bsPrefix="modalContentCard">
					<TraitModal
						trait={null}
						closeModal={closeTraitModal}
						editing={isEditing}
						isNew={isNew}
						addFeature={addNewTrait}
					/>
				</Modal.Body>
			</Modal>
			<Modal
				show={saveModalOpen}
				size="sm"
				onHide={() => setSaveModalOpen(false)}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Body bsPrefix="modalContentCard">
					<div className="container-fluid">
						<div className="row">
							<>
								{props.isEditing ? (
									<>Do you wish to save these changes to the compendium</>
								) : (
									<>Do you wish to add this race to the compendium?</>
								)}
							</>
						</div>
						<div className="row">
							<div className="col">
								<div
									className="icon"
									onClick={() => props.DoNotAddRaceToCompendium()}
								>
									<FontAwesomeIcon icon={faTimes} />
								</div>
							</div>
							<div className="col">
								<div
									className="icon"
									style={{ float: "right" }}
									onClick={() => props.AddRaceToCompendium()}
								>
									<FontAwesomeIcon icon={faCheck} />
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(RaceCreator);
