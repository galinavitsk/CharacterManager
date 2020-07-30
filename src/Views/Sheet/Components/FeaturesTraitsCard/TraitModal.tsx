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
import { GetAbilities, GetSkills } from "../../../../Data/Abilities";
import {GetModifierCategories, GetModifierType, GetModifierValues} from "../../../../Data/Modifier";
import Overlay from "react-bootstrap/Overlay";

const mapStateToProps = (state) => {
	return {};
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
	const [showAddModifier, setShowAddModifier] = React.useState(false);
	const modifierTarget = React.useRef(null);
	const [isModifierEdit, setIsModifierEdit] = React.useState(false);
	const [modifiers, setModifiers] = React.useState([]);
	const [modifierName, setModifierName] = React.useState("");
	const [modifierCategory, setModifierCategory] = React.useState("");
	const [modifierType, setModifierType] = React.useState("");
	const [modifierValue, setModifierValue] = React.useState("");

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
			props.trait.modifiers.map((mod) => modifiers.push(mod));
		}
		setSavingThrowsChecked(new Map(savingThrows));
		setSkillsChecked(new Map(skills));
		setIsEditing(true);
	};
	const onStopEdit = () => {
		setIsEditing(false);
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
		setModifierName(modifier.name);
		setModifierCategory(modifier.category);
		setModifierType(modifier.type);
		setModifierValue(modifier.value);
		setIsModifierEdit(true);
	};
	const handleModifierNameChange = (e: any) => {
		setModifierName(e.target.value);
	};
	const handleModifierCategoryChange=(e)=>{
		setModifierCategory(e.target.value);
	}

	const handleModifierTypeChange=(e)=>{
		setModifierType(e.target.value);
	}

	const handleModifierValueChange=(e)=>{
		setModifierValue(e.target.value);
	}
	return (
		<div className="container">
			{isEditing ? (
				isModifierEdit ? (
					<>
						<div className="row">
							<div
								className="col-6 icon"
								style={{ textAlign: "left" }}
								onClick={() => {
									setIsModifierEdit(false);
								}}
							>
								<FontAwesomeIcon icon={faTimes} />
							</div>
							<div className="col-6 icon" style={{ textAlign: "right" }}>
								<FontAwesomeIcon icon={faSave} />
							</div>
						</div>
						<div className="row">
							<div style={{ fontSize: "14px", color: "#86A4A8" }}>
								Edit Modifier
							</div>
						</div>
						<div className="row">
							<div style={{ fontSize: "12px", color: "#86A4A8" }}>Name</div>
							<Form.Control
								type="text"
								value={modifierName}
								placeholder=" "
								onChange={handleModifierNameChange.bind(this)}
							/>
						</div>
						
						<div className="row" style={{ fontSize: "12px", color: "#86A4A8" }}>
						<div className="col-6">
						<div className="row">Category</div>
						<div className="row">
						
							<Form>
								<Form.Group controlId="categories.SelectCustom">
									
									<Form.Control as="select" 
									value={modifierCategory}
									onChange={handleModifierCategoryChange.bind(this)}
									custom>{
									GetModifierCategories().map((c)=>(

										<option>{c}</option>
									)
									)}
									</Form.Control>
								</Form.Group>
							</Form>
						</div>
						</div>
						<div className="col-6">
						<div className="row">Type</div>
						<div className="row">
						
							<Form>
								<Form.Group controlId="categories.SelectCustom">
									
									<Form.Control as="select" custom
									value={modifierType}
									onChange={handleModifierTypeChange.bind(this)}>{
									GetModifierType(modifierCategory).map((t)=>(

										<option>{t}</option>
									)
									)}
									</Form.Control>
								</Form.Group>
							</Form>
						</div>
						</div>
						</div>
						<div className="row">Type</div>
						<div className="row">
						
							<Form>
								<Form.Group controlId="categories.SelectCustom">
									
									<Form.Control as="select" custom
									value={modifierValue}
									htmlSize={5}
									onChange={handleModifierValueChange.bind(this)}>
										{
									GetModifierValues().map((v)=>(

										<option>{v}</option>
									)
									)}
									</Form.Control>
								</Form.Group>
							</Form>
						</div>
						
					</>
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
								Proficiencies:{" "}
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
											{m.name != null && m.name}
											{m.name == null && (
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
							onClick={() => setShowAddModifier(!showAddModifier)}
						>
							<div
								className="col-1 icon"
								style={{ paddingRight: "0", textAlign: "right" }}
							>
								<FontAwesomeIcon icon={faPlusCircle} />
							</div>
							<div className="col-10">Add new Modifier</div>
						</div>

						<div className="row">
							<div className="col-6">
								<div
									className="icon"
									onClick={() => {
										setIsEditing(false);
									}}
								>
									<FontAwesomeIcon icon={faTimes} />
								</div>
							</div>
							<div className="col-6">
								<div className="icon" style={{ float: "right" }}>
									<FontAwesomeIcon icon={faCheck} />
								</div>
							</div>
						</div>
					</>
				)
			) : (
				<>
					<div className="row">
						<span style={{ fontSize: "16px" }}>
							{props.trait.description != null && props.trait.name}
						</span>
					</div>
					<hr />
					<div className="row" style={{ fontSize: "12px" }}>
						{props.trait.description != null && props.trait.description}
					</div>
					<hr />

					<div className="row" style={{ fontSize: "12px" }}>
						{props.trait.savingThrowsProf != null &&
							props.trait.savingThrowsProf.map((p) => <>{p} Saving Throw, </>)}
						{props.trait.skillsProf != null &&
							props.trait.skillsProf.map((s) => <>{s}, </>)}
					</div>
					{props.trait.modifiers != null &&
						props.trait.modifiers.length >= 0 &&
						props.trait.modifiers.map((m) => (
							<>
								<hr />
								<div className="row" style={{ fontSize: "12px" }}>
									{m.name != null && m.name}
									{m.name == null && (
										<>
											{m.type} {m.value}
										</>
									)}
								</div>
							</>
						))}

					{props.trait.smallProf != null &&
						props.trait.smallProf.length >= 0 &&
						props.trait.smallProf.map((p) => (
							<>
								<hr />
								<div className="row" style={{ fontSize: "12px" }}>
									<div className="col-6 StatCubesmall">{p.name}</div>
									<div className="col-6 StatCubesmall">{p.prof}</div>
								</div>
							</>
						))}
					{props.trait.smallTools != null &&
						props.trait.smallTools.length >= 0 &&
						props.trait.smallTools.map((t) => (
							<>
								<hr />
								<div className="row" style={{ fontSize: "12px" }}>
									<div className="col-6 StatCubesmall">{t.name}</div>
									<div className="col-3 StatCubesmall">{t.mods}</div>
									<div className="col-3 StatCubesmall">{t.attribute}</div>
								</div>
							</>
						))}

					<div className="row" style={{ float: "right" }}>
						<div
							className="icon"
							onClick={() => {
								onStartEditing();
							}}
						>
							<FontAwesomeIcon icon={faCog} />
						</div>
					</div>
				</>
			)}
		</div>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(TraitModal);
