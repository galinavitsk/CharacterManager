import * as React from "react";
import { Component, useState } from "react";
import {
	faCog,
	faCheck,
	faTimes,
	faMinusCircle,
	faPlusCircle,
	faEdit,
	faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import { GetAbilities, GetSkills } from "../../../../../Data/Abilities";
import {
	GetModifierCategories,
	GetModifierType,
	GetModifierValues,
	Modifier,
} from "../../../../../Data/Modifier";
import Overlay from "react-bootstrap/Overlay";
import ViewTrait from "./ViewTrait";
import ModifierEdit from "./ModifierEdit";
import { Guid } from "guid-typescript";
import SmallProficiencies from "./SmallProficiencies";
import SmallProficienciesAdd from "./SmallProficienciesAdd";
import SmallTools from "./SmallTools";
import SmallToolsAdd from "./SmallToolsAdd";

const mapStateToProps = (state) => {
	return {
abilityScores:state.abilityScores,
classes:state.classes

	};
};

const mapDispatchToProps = (dispatch) => ({});

const TraitModal = (props) => {
	const [isEditing, setIsEditing] = React.useState(false);
	const [traitName, setTraitName] = React.useState("");
	const [traitDescription, setTraitDescription] = React.useState("");
	const [skillsChecked, setSkillsChecked] = React.useState(new Map());
	const [savingThrowsChecked, setSavingThrowsChecked] = React.useState(
		new Map()
	);
	const [showProfficiencies, setShowProfficiencies] = React.useState(false);
	const proficinciesTarget = React.useRef(null);

	//MODIFIERS
	const [isModifierEdit, setIsModifierEdit] = React.useState(false);
	const [modifiers, setModifiers] = React.useState([]);
	const [modifierName, setModifierName] = React.useState(null);
	const [modifierId, setModifierId] = React.useState("");
	const [modifierCategory, setModifierCategory] = React.useState("");
	const [modifierType, setModifierType] = React.useState("");
	const [modifierValue, setModifierValue] = React.useState("");

	//SMALL PROFICIENCIES
	const [smallProfs, setSmallProfs] = React.useState([]);

	//SMALL TOOLS
	const [smallTools, setSmallTools] = React.useState([]);

	const onStartEditing = () => {
		var savingThrows = new Map();
		var skills = new Map();
		setTraitName(props.trait.name);
		setTraitDescription(props.trait.description);
		if (props.trait.savingThrowsProf != null) {
			props.trait.savingThrowsProf.map((s) =>
				savingThrows.set(`saving-${s}`, true)
			);
		}
		if (props.trait.skillsProf != null) {
			props.trait.skillsProf.map((skill) => skills.set(`skill-${skill}`, true));
		}
		if (props.trait.modifiers != null) {
			props.trait.modifiers.map((mod) =>
				modifiers.push({
					id: mod.id,
					name: mod.name,
					category: mod.category,
					type: mod.type,
					value: mod.value,
				})
			);
		}
		if (props.trait.smallProf != null) {
			props.trait.smallProf.map((p) =>
				smallProfs.push({
					id: p.id,
					type: p.type,
					prof: p.prof,
				})
			);
		}
		if (props.trait.smallTools != null) {
			props.trait.smallTools.map((t) =>
				smallTools.push({
					id: t.id,
					name: t.name,
					bonus: t.bonus,
					attribute: t.attribute,
					mods: t.mods,
				})
			);
		}
		setSavingThrowsChecked(new Map(savingThrows));
		setSkillsChecked(new Map(skills));
		setIsEditing(true);
	};
	const onStopEdit = () => {
		setIsEditing(false);
		setModifiers([]);
		setSmallProfs([]);
		setSmallTools([]);
	};

	const onSaveTrait = () => {
		props.trait.name = traitName;
		props.trait.description = traitDescription;
		props.trait.savingThrowsProf = [];
		props.trait.skillsProf=[];
		//Set Saving Thows
		{
			if (savingThrowsChecked.get(`saving-Strength`) == true) {
				props.trait.savingThrowsProf.push("Strength");
			}
			if (savingThrowsChecked.get(`saving-Dexterity`) == true) {
				props.trait.savingThrowsProf.push("Dexterity");
			}
			if (savingThrowsChecked.get(`saving-Constitution`) == true) {
				props.trait.savingThrowsProf.push("Constitution");
			}
			if (savingThrowsChecked.get(`saving-Intelligence`) == true) {
				props.trait.savingThrowsProf.push("Intelligence");
			}
			if (savingThrowsChecked.get(`saving-Wisdom`) == true) {
				props.trait.savingThrowsProf.push("Wisdom");
			}
			if (savingThrowsChecked.get(`saving-Charisma`) == true) {
				props.trait.savingThrowsProf.push("Charisma");
			}
		}
		//Set Ability Proficiencies
		{
			if (skillsChecked.get(`skill-Acrobatics`) == true) {
				props.trait.skillsProf.push("Acrobatics");
			}if (skillsChecked.get(`skill-Animal Handling`) == true) {
				props.trait.skillsProf.push("Animal Handling");
			}if (skillsChecked.get(`skill-Arcana`) == true) {
				props.trait.skillsProf.push("Arcana");
			}if (skillsChecked.get(`skill-Athetics`) == true) {
				props.trait.skillsProf.push("Athetics");
			}if (skillsChecked.get(`skill-Deception`) == true) {
				props.trait.skillsProf.push("Deception");
			}if (skillsChecked.get(`skill-History`) == true) {
				props.trait.skillsProf.push("History");
			}if (skillsChecked.get(`skill-Insight`) == true) {
				props.trait.skillsProf.push("Insight");
			}if (skillsChecked.get(`skill-Intimidation`) == true) {
				props.trait.skillsProf.push("Intimidation");
			}if (skillsChecked.get(`skill-Medicine`) == true) {
				props.trait.skillsProf.push("Medicine");
			}if (skillsChecked.get(`skill-Nature`) == true) {
				props.trait.skillsProf.push("Nature");
			}if (skillsChecked.get(`skill-Perception`) == true) {
				props.trait.skillsProf.push("Perception");
			}if (skillsChecked.get(`skill-Performance`) == true) {
				props.trait.skillsProf.push("Performance");
			}if (skillsChecked.get(`skill-Persuasion`) == true) {
				props.trait.skillsProf.push("Persuasion");
			}if (skillsChecked.get(`skill-Religion`) == true) {
				props.trait.skillsProf.push("Religion");
			}if (skillsChecked.get(`skill-Sleight of Hand`) == true) {
				props.trait.skillsProf.push("Sleight of Hand");
			}if (skillsChecked.get(`skill-Stealth`) == true) {
				props.trait.skillsProf.push("Stealth");
			}if (skillsChecked.get(`skill-Survival`) == true) {
				props.trait.skillsProf.push("Survival");
			}
		}
		props.trait.modifiers=modifiers;
		props.trait.smallProf=smallProfs;
		props.trait.smallTools=smallTools;
		setIsEditing(false);
		setModifiers([]);
		setSmallProfs([]);
		setSmallTools([]);
	};
	const handleNameChange = (e: any) => {
		setTraitName(e.target.value);
	};
	const handleDescriptionChange = (e: any) => {
		setTraitDescription(e.target.value);
	};
	const handleSkillsCheck = (e) => {
		var newSkillsCheck = new Map(skillsChecked).set(
			e.target.id,
			e.target.checked
		);
		setSkillsChecked(newSkillsCheck);
	};
	const handleSavingThrows = (e) => {
		setSavingThrowsChecked(
			new Map(savingThrowsChecked).set(e.target.id, e.target.checked)
		);
	};

	//MODIFIERS
	const handleDeleteModifier = (modifier) => {
		var newModifiers = [...modifiers];
		console.log(modifiers);
		for (let index = 0; index < newModifiers.length; index++) {
			if (newModifiers[index].id == modifier.id) {
				newModifiers.splice(index, 1);
			}
		}
		setModifiers(newModifiers);
	};
	const openEditModifier = (modifier) => {
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
			setModifierValue("+Proficiency Bonus");
		}
		setIsModifierEdit(true);
	};
	const handleModifierNameChange = (e: any) => {
		setModifierName(e.target.value);
	};
	const handleModifierCategoryChange = (e) => {
		setModifierCategory(e.target.value);
	};
	const handleModifierTypeChange = (e) => {
		setModifierType(e.target.value);
	};
	const handleModifierValueChange = (e) => {
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
	};

	//SMALL PROFICIENCIES
	const handleDeleteProficiency = (prof) => {
		var newSmallProf = [...smallProfs];
		for (let index = 0; index < newSmallProf.length; index++) {
			if (newSmallProf[index].id == prof.id) {
				newSmallProf.splice(index, 1);
			}
		}
		setSmallProfs(newSmallProf);
	};
	const handleSaveProf = (profType, profProf) => {
		var newProf = [...smallProfs];
		console.log(smallProfs);
		newProf.push({ id: Guid.create(), type: profType, prof: profProf });
		setSmallProfs(newProf);
	};
	//SMALL TOOLS
	const handleDeleteTool = (tool) => {
		var newSmallTools = [...smallTools];
		for (let index = 0; index < newSmallTools.length; index++) {
			if (newSmallTools[index].id == tool.id) {
				newSmallTools.splice(index, 1);
			}
		}
		setSmallTools(newSmallTools);
	};
	const handleSaveTool = (toolName:string, toolBonus:string, toolAttribute:string, toolMods:number) => {
		var newTools = [...smallTools];
		console.log(newTools);
		newTools.push({
			id: Guid.create(),
			name: toolName,
			bonus: toolBonus,
			attribute: toolAttribute,
			mods: toolMods,
		});
		setSmallTools(newTools);
	};

	return (
		<div className="container">
			{isEditing ? (
				isModifierEdit ? (
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
				) : (
					<>
						<div className="row">
							<div style={{ fontSize: "12px", color: "#86A4A8" }}>Name</div>
							<Form.Control
								type="text"
								value={traitName}
								placeholder=" "
								onChange={handleNameChange.bind(this)}
							/>
						</div>
						<hr />

						<div className="row">
							<div style={{ fontSize: "12px", color: "#86A4A8" }}>
								Description
							</div>
							<Form.Control
								as="textarea"
								value={traitDescription}
								onChange={handleDescriptionChange.bind(this)}
							/>
						</div>
						<hr />

						<div className="row">
							<div
								style={{ fontSize: "12px", color: "#86A4A8" }}
								ref={proficinciesTarget}
								onClick={() => setShowProfficiencies(!showProfficiencies)}
							>
								Check/Skill Proficiencies:{" "}
								{GetAbilities().map(
									(s) =>
										!!savingThrowsChecked.get(`saving-${s}`) && (
											<>{s} Saving Throw, </>
										)
								)}
								{GetSkills().map(
									(s) => !!skillsChecked.get(`skill-${s}`) && <>{s}, </>
								)}
							</div>
						</div>
						<Overlay
							target={proficinciesTarget.current}
							show={showProfficiencies}
							placement="right"
						>
							{({ placement, arrowProps, show: show, popper, ...props }) => (
								<div
									{...props}
									style={{
										backgroundColor: "#E9E7E1",
										padding: "2px 10px",
										color: "#86A4A8",
										boxShadow: "0px 3px 6px #00000029",
										border: " 1px solid #E4BDB4",
										borderRadius: 3,
										zIndex: 9999,
										...props.style,
									}}
								>
									<div className="row">
										<div className="col-5">
											<div className="row">
												<div
													className="col-12"
													style={{
														fontSize: "12px",
														color: "#86A4A8",
													}}
												>
													Saving Throws
												</div>
												<div
													className="col-2"
													style={{
														float: "right",
														textAlign: "right",
													}}
												></div>
											</div>
											<Form>
												{GetAbilities().map((s) => (
													<div key={`saving-${s}`}>
														<Form.Check
															custom
															type="checkbox"
															id={`saving-${s}`}
															label={`${s}`}
															checked={!!savingThrowsChecked.get(`saving-${s}`)}
															onChange={handleSavingThrows.bind(this)}
														/>
													</div>
												))}
											</Form>
										</div>
										<div className="col-7">
											<div className="row">
												<div
													className="col-12"
													style={{ fontSize: "12px", color: "#86A4A8" }}
												>
													Skills
												</div>
											</div>
											<Form>
												{GetSkills().map((skill) => (
													<div key={`skill-${skill}`}>
														<Form.Check
															custom
															checked={!!skillsChecked.get(`skill-${skill}`)}
															type="checkbox"
															id={`skill-${skill}`}
															label={`${skill}`}
															onChange={handleSkillsCheck.bind(this)}
														/>
													</div>
												))}
											</Form>
										</div>
									</div>
								</div>
							)}
						</Overlay>
						<hr />
						<div className="row" style={{ fontSize: "14px", color: "#86A4A8" }}>
							Modifiers:
						</div>
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
						<div className="row" style={{ fontSize: "12px", color: "#86A4A8" }}>
							Proficiencies
						</div>
						{smallProfs != null &&
							smallProfs.map((p) => (
								<SmallProficiencies
									p={p}
									handleDeleteProficiency={handleDeleteProficiency}
								/>
							))}
						<SmallProficienciesAdd handleSaveProf={handleSaveProf} />
						<hr />
						<div className="row" style={{ fontSize: "12px", color: "#86A4A8" }}>
							Tool Proficiencies and Custom Skills
						</div>
						{smallTools != null &&
							smallTools.map((t) => (
								<SmallTools t={t} handleDeleteTool={handleDeleteTool} />
							))}
						<SmallToolsAdd handleSaveTool={handleSaveTool} />
						<hr />
						<div className="row">
							<div className="col-6">
								<div className="icon" onClick={() => onStopEdit()}>
									<FontAwesomeIcon icon={faTimes} />
								</div>
							</div>
							<div className="col-6">
								<div
									className="icon"
									style={{ float: "right" }}
									onClick={() => onSaveTrait()}
								>
									<FontAwesomeIcon icon={faCheck} />
								</div>
							</div>
						</div>
					</>
				)
			) : (
				<ViewTrait trait={props.trait} onStartEditing={onStartEditing} abilityScores={props.abilityScores} classes={props.classes} />
			)}
		</div>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(TraitModal);
