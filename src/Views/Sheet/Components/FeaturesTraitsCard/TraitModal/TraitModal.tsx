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

const mapStateToProps = (state: { abilityScores: any; classes: any; }) => {
	return {
abilityScores:state.abilityScores,
classes:state.classes
	};
};

const mapDispatchToProps = (dispatch: any) => ({});

const TraitModal = (props) => {
	const [isEditing, setIsEditing] = React.useState(props.editing);
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
			props.trait.savingThrowsProf.map((s: any) =>
				savingThrows.set(`saving-${s}`, true)
			);
		}
		if (props.trait.skillsProf != null) {
			props.trait.skillsProf.map((skill: any) => skills.set(`skill-${skill}`, true));
		}
		if (props.trait.modifiers != null) {
			props.trait.modifiers.map((mod: { id: any; name: any; category: any; type: any; value: any; }) =>
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
			props.trait.smallProf.map((p: { id: any; type: any; prof: any; }) =>
				smallProfs.push({
					id: p.id,
					type: p.type,
					prof: p.prof,
				})
			);
		}
		if (props.trait.smallTools != null) {
			props.trait.smallTools.map((t: { id: any; name: any; bonus: any; attribute: any; mods: any; }) =>
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
		if(!props.isNew){
		setIsEditing(false);
		setModifiers([]);
		setSmallProfs([]);
		setSmallTools([]);}
		else{
			props.closeModal();
		}
	};

	const onSaveTrait = () => {
		var newSavingThrows=[];
		var newSkills=[];
		//Set Saving Thows
		{
			if (savingThrowsChecked.get(`saving-Strength`) == true) {
				newSavingThrows.push("Strength");
			}
			if (savingThrowsChecked.get(`saving-Dexterity`) == true) {
				newSavingThrows.push("Dexterity");
			}
			if (savingThrowsChecked.get(`saving-Constitution`) == true) {
				newSavingThrows.push("Constitution");
			}
			if (savingThrowsChecked.get(`saving-Intelligence`) == true) {
				newSavingThrows.push("Intelligence");
			}
			if (savingThrowsChecked.get(`saving-Wisdom`) == true) {
				newSavingThrows.push("Wisdom");
			}
			if (savingThrowsChecked.get(`saving-Charisma`) == true) {
				newSavingThrows.push("Charisma");
			}
		}
		//Set Ability Proficiencies
		{
			if (skillsChecked.get(`skill-Acrobatics`) == true) {
				newSkills.push("Acrobatics");
			}if (skillsChecked.get(`skill-Animal Handling`) == true) {
				newSkills.push("Animal Handling");
			}if (skillsChecked.get(`skill-Arcana`) == true) {
				newSkills.push("Arcana");
			}if (skillsChecked.get(`skill-Athetics`) == true) {
				newSkills.push("Athetics");
			}if (skillsChecked.get(`skill-Deception`) == true) {
				newSkills.push("Deception");
			}if (skillsChecked.get(`skill-History`) == true) {
				newSkills.push("History");
			}if (skillsChecked.get(`skill-Insight`) == true) {
				newSkills.push("Insight");
			}if (skillsChecked.get(`skill-Intimidation`) == true) {
				newSkills.push("Intimidation");
			}if (skillsChecked.get(`skill-Medicine`) == true) {
				newSkills.push("Medicine");
			}if (skillsChecked.get(`skill-Nature`) == true) {
				newSkills.push("Nature");
			}if (skillsChecked.get(`skill-Perception`) == true) {
				newSkills.push("Perception");
			}if (skillsChecked.get(`skill-Performance`) == true) {
				newSkills.push("Performance");
			}if (skillsChecked.get(`skill-Persuasion`) == true) {
				newSkills.push("Persuasion");
			}if (skillsChecked.get(`skill-Religion`) == true) {
				newSkills.push("Religion");
			}if (skillsChecked.get(`skill-Sleight of Hand`) == true) {
				newSkills.push("Sleight of Hand");
			}if (skillsChecked.get(`skill-Stealth`) == true) {
				newSkills.push("Stealth");
			}if (skillsChecked.get(`skill-Survival`) == true) {
				newSkills.push("Survival");
			}
		}
		if(!props.isNew){
		props.trait.name = traitName;
		props.trait.description = traitDescription;
		props.trait.savingThrowsProf = [...newSavingThrows];
		props.trait.skillsProf=[];
		
		
		props.trait.modifiers=modifiers;
		props.trait.smallProf=smallProfs;
		props.trait.smallTools=smallTools;
		setIsEditing(false);
		setModifiers([]);
		setSmallProfs([]);
		setSmallTools([]);}
		if(props.isNew){
			props.addFeature({name:traitName,
			description:traitDescription, 
			savingThrowsProf:newSavingThrows,
			skillsProf:newSkills,
			modifiers:modifiers,
			smallProf:smallProfs,
			smallTools:smallTools
		});}

	};
	const handleNameChange = (e: any) => {
		setTraitName(e.target.value);
	};
	const handleDescriptionChange = (e: any) => {
		setTraitDescription(e.target.value);
	};
	const handleSkillsCheck = (e: { target: { id: any; checked: any; }; }) => {
		var newSkillsCheck = new Map(skillsChecked).set(
			e.target.id,
			e.target.checked
		);
		setSkillsChecked(newSkillsCheck);
	};
	const handleSavingThrows = (e: { target: { id: any; checked: any; }; }) => {
		setSavingThrowsChecked(
			new Map(savingThrowsChecked).set(e.target.id, e.target.checked)
		);
	};

	//MODIFIERS
	const handleDeleteModifier = (modifier: { id: any; }) => {
		var newModifiers = [...modifiers];
		console.log(modifiers);
		for (let index = 0; index < newModifiers.length; index++) {
			if (newModifiers[index].id == modifier.id) {
				newModifiers.splice(index, 1);
			}
		}
		setModifiers(newModifiers);
	};
	const openEditModifier = (modifier: { id: React.SetStateAction<string>; name: any; category: React.SetStateAction<string>; type: React.SetStateAction<string>; value: React.SetStateAction<string>; }) => {
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
	const handleModifierCategoryChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
		setModifierCategory(e.target.value);
	};
	const handleModifierTypeChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
		setModifierType(e.target.value);
	};
	const handleModifierValueChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
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
	const handleDeleteProficiency = (prof: { id: any; }) => {
		var newSmallProf = [...smallProfs];
		for (let index = 0; index < newSmallProf.length; index++) {
			if (newSmallProf[index].id == prof.id) {
				newSmallProf.splice(index, 1);
			}
		}
		setSmallProfs(newSmallProf);
	};
	const handleSaveProf = (profType: any, profProf: any) => {
		var newProf = [...smallProfs];
		console.log(smallProfs);
		newProf.push({ id: Guid.create(), type: profType, prof: profProf });
		setSmallProfs(newProf);
	};
	//SMALL TOOLS
	const handleDeleteTool = (tool: { id: any; }) => {
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
				<ViewTrait trait={props.trait} 
				onStartEditing={onStartEditing} 
				abilityScores={props.abilityScores} 
				classes={props.classes} 
				/>
			)}
		</div>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(TraitModal);
