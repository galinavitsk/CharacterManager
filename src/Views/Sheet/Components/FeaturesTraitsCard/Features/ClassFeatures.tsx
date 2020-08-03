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
import { truncateSync } from "fs";
import SingleClassFeature from "./SingleClassFeature";

const mapStateToProps = (state: any) => {
	return {};
};

const mapDispatchToProps = (dispatch: any) => ({});

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
	const addNewTrait = (newTrait) => {
		switch (featureType) {
			case "single":
				props.c.traits.push(newTrait);
				break;
			case "subclass":
				props.c.subclass.traits.push(newTrait);
				break;
			default:
				break;
		}
		setFeatureType("");
		closeTraitModal();
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
					{props.c.traits.length >= 1 &&
						props.c.traits.map((t: any) => <SingleClassFeature trait={t} />)}
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
			{props.c.subclass.traits.length >= 1 && (
				<>
					<div
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
					{subclassFeature ? (
						<>
							{props.c.subclass.traits.map((s) => (
								<SubclassFeatures trait={s} />
							))}
							<div
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
							</div>
						</>
					) : null}
				</>
			)}
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
					/>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(ClassFeatures);
