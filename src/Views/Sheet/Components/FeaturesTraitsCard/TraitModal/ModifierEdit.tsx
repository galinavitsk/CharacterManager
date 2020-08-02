import * as React from "react";
import { Component } from "react";
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
import {GetModifierCategories, GetModifierType, GetModifierValues} from "../../../../../Data/Modifier";
import Overlay from "react-bootstrap/Overlay";
import ViewTrait from "./ViewTrait"

export interface ModifierEditProps {
    setIsModifierEdit: (arg0: boolean) => void;
    modifierName:string;
    modifierType:string;
    modifierCategory:string;
    modifierValue:string;
    handleModifierNameChange;
    handleModifierCategoryChange;
    handleModifierTypeChange;
    handleModifierValueChange;
    handleModifierSave;
}

export interface ModifierEditState {}

class ModifierEdit extends React.Component<
	ModifierEditProps,
	ModifierEditState
> {
	render() {
		return (
			<>
				<div className="row">
					<div
						className="col-6 icon"
						style={{ textAlign: "left" }}
						onClick={() => {
							this.props.setIsModifierEdit(false);
						}}
					>
						<FontAwesomeIcon icon={faTimes} />
					</div>
					<div className="col-6 icon" style={{ textAlign: "right" }} onClick={this.props.handleModifierSave}>
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
						value={this.props.modifierName}
						placeholder=" "
						onChange={this.props.handleModifierNameChange.bind(this)}
					/>
				</div>

				<div className="row" style={{ fontSize: "12px", color: "#86A4A8" }}>
					<div className="col-6">
						<div className="row">Category</div>
						<div className="row">
							<Form>
								<Form.Group controlId="categories.SelectCustom">
									<Form.Control
										as="select"
										value={this.props.modifierCategory}
										onChange={this.props.handleModifierCategoryChange.bind(this)}
										custom
									>
										{GetModifierCategories().map((c) => (
											<option>{c}</option>
										))}
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
									<Form.Control
										as="select"
										custom
										value={this.props.modifierType}
										onChange={this.props.handleModifierTypeChange.bind(this)}
									>
										{GetModifierType(this.props.modifierCategory).map((t) => (
											<option>{t}</option>
										))}
									</Form.Control>
								</Form.Group>
							</Form>
						</div>
					</div>
				</div>
				<div className="row">Value</div>
				<div className="row">
					<Form>
						<Form.Group controlId="categories.SelectCustom">
							<Form.Control
								as="select"
								custom
								value={this.props.modifierValue}
								htmlSize={5}
								onChange={this.props.handleModifierValueChange.bind(this)}
							>
								{GetModifierValues().map((v) => (
									<option>{v}</option>
								))}
							</Form.Control>
						</Form.Group>
					</Form>
				</div>
			</>
		);
	}
}

export default ModifierEdit;
