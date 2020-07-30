import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import "../featurestraits.css";
import {
	faChevronDown,
	faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/esm/Modal";
import TraitModal from "../TraitModal";
import SubclassFeatures from "./SubclassFeatures";
import { truncateSync } from "fs";
import SingleClassFeature from "./SingleClassFeature";

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => ({
});

const ClassFeatures = (props) => {
	const [classFeature, setClassFeatureOpen] = React.useState(true);
	const [subclassFeature, setSubclassFeatureOpen] = React.useState(true);


	return (
		<>
			<div
				className="row featureHeader"
				onClick={() => {
					setClassFeatureOpen(!classFeature);
				}}
			><div className="col-10">
				Class: {props.c.className}
				</div>
				<div className="col-2"  style={{float:"right", textAlign:"right"}}>
				<div className="icon">
					{classFeature ? (
						<FontAwesomeIcon icon={faChevronDown} />
					) : (
						<FontAwesomeIcon icon={faChevronLeft} />
					)}</div>
				</div>
			</div>
			{props.c.traits.length >= 1 &&
				props.c.traits.map((t) =>
					classFeature ? (
						<SingleClassFeature trait={t}/>
					) : null
				)}
			<hr />
			{props.c.subclass.traits.length >= 1 &&
				props.c.subclass.traits.map((s) => (
					<>
						<div
							className="row featureHeader"
							onClick={() => setSubclassFeatureOpen(!subclassFeature)}
						>
							<div className="col-10">
							Subclass: {props.c.subclass.subclassName}</div>
							<div className="col-2"  style={{float:"right", textAlign:"right"}}>
							<div className="icon">
								{subclassFeature ? (
									<FontAwesomeIcon icon={faChevronDown} />
								) : (
									<FontAwesomeIcon icon={faChevronLeft} />
								)}
							</div></div>
						</div>
						{subclassFeature ? (
							<SubclassFeatures trait={s}/>
						) : null}
					</>
				))}
			<hr />
		</>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(ClassFeatures);
