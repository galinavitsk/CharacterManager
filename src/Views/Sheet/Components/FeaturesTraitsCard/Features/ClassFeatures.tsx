import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import "../featurestraits.css";
import {
	faChevronDown,
	faChevronLeft,
	faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/esm/Modal";
import TraitModal from "../TraitModal/TraitModal";
import SubclassFeatures from "./SubclassFeatures";
import SingleClassFeature from "./SingleClassFeature";

import {UpdateSubclassTrait, UpdateClassTrait } from '../../../../../redux/actionCreators';


const mapStateToProps = (state: any) => {
	return {};
};

const mapDispatchToProps = (dispatch: any) => ({
	updateClassTrait: (newTraits,id) => dispatch(UpdateClassTrait(newTraits,id)),
	updateSubclassTrait: (newTraits,id) => dispatch(UpdateSubclassTrait(newTraits,id))

});

const ClassFeatures = (props: any) => {
	const [classFeature, setClassFeatureOpen] = React.useState(true);
	const [subclassFeature, setSubclassFeatureOpen] = React.useState(true);
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
	const deleteTrait = (category, trait) => {
		console.log(category)
		switch (category) {
			case "single":
				var newTraits = [...props.c.traits];
				for (let index = 0; index < newTraits.length; index++) {
					if (newTraits[index].id == trait.id) {
						newTraits.splice(index, 1);
					}
				}
				props.updateClassTrait(newTraits, props.c.id);
				break;
			case "subclass":
				var newTraits = [...props.c.subclass.traits];
				for (let index = 0; index < newTraits.length; index++) {
					if (newTraits[index].id == trait.id) {
						newTraits.splice(index, 1);
					}
				}
				props.updateSubclassTrait(newTraits, props.c.subclass.id);
				break;
			default:
				break;
		}


		setFeatureType("");
		setTrait(null);
		closeTraitModal();
	};
	const addNewTrait = (newTrait) => {
		switch (featureType) {
			case "single":
				props.c.traits.push(newTrait);
				props.updateClassTrait(props.c.traits,props.c.id)
				break;
			case "subclass":
				props.c.subclass.traits.push(newTrait);
				props.updateSubclassTrait(props.c.subclass.traits,props.c.subclass.id)
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
			case "single":
				var newTraits = [...props.c.traits];
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
				props.updateClassTrait(newTraits,props.c.id);
				break;
			case "subclass":
				var newTraits = [...props.c.subclass.traits];
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
				props.updateSubclassTrait(nwTraits,props.c.subclass.id)
				break;
			default:
				break;
		}
		setFeatureType("");
	};

	return (
		<>
			<div
				className="row featureHeader"
				onClick={() => {
					setClassFeatureOpen(!classFeature);
				}}
			>
				<div className="col-10">Class: {props.c.className}</div>
				<div className="col-2" style={{ float: "right", textAlign: "right" }}>
					<div className="icon">
						{classFeature ? (
							<FontAwesomeIcon icon={faChevronDown} />
						) : (
							<FontAwesomeIcon icon={faChevronLeft} />
						)}
					</div>
				</div>
			</div>

			{classFeature ? (
				<>
					{props.c.traits!=null && props.c.traits.length > 0 &&
						props.c.traits.map((t: any) => <SingleClassFeature trait={t} editTrait={editTrait} deleteTrait={deleteTrait}/>)}
					<div
						className="row icon"
						style={{ fontSize: "12px", paddingLeft: "20px" }}
						onClick={() => {
							setIsEditing(true);
							setIsNew(true);
							setFeatureType("single");
							setIsOpen(true);
						}}
					>
						<FontAwesomeIcon
							icon={faPlusCircle}
							style={{ marginRight: "5px" }}
						/>
						Add Class Feature
					</div>
				</>
			) : null}
			<hr />
			{props.c.subclass!=null &&<><div
						className="row featureHeader"
						onClick={() => setSubclassFeatureOpen(!subclassFeature)}
					>
						<div className="col-10">
							Subclass: {props.c.subclass.subclassName}
						</div>
						<div
							className="col-2"
							style={{ float: "right", textAlign: "right" }}
						>
							<div className="icon">
								{subclassFeature ? (
									<FontAwesomeIcon icon={faChevronDown} />
								) : (
									<FontAwesomeIcon icon={faChevronLeft} />
								)}
							</div>
						</div>
						</div>
			{props.c.subclass.traits!=null && props.c.subclass.traits.length > 0 && (
				<>
					
					{subclassFeature ? (
						<>
							{props.c.subclass.traits.map((s: { name: {}; description: React.ReactNode; }) => (
								<SubclassFeatures trait={s} editTrait={editTrait}  deleteTrait={deleteTrait} />
							))}
							</>
							
					) : null}
				</>
			)}<div
			className="row icon"
			style={{ fontSize: "12px", paddingLeft: "20px" }}
			onClick={() => {
				setIsEditing(true);
				setIsNew(true);
				setFeatureType("subclass");
				setIsOpen(true);
			}}
		>
			<FontAwesomeIcon
				icon={faPlusCircle}
				style={{ marginRight: "5px" }}
			/>
			Add Subclass Feature
		</div></>}
			<hr />
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
						onDelete={deleteTrait}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(ClassFeatures);
