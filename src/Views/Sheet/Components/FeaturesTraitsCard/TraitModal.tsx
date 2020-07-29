import * as React from "react";
import { Component, useState } from "react";
import { faCog, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => ({});

const TraitModal = (props) => {
	const [isEditing, setIsEditing] = React.useState(false);
	const [traitName, setTraitName] = React.useState(props.trait.name);
	const onStopEdit = () => {
		setIsEditing(false);
	};

	const handleNameChange = (e: any) => {
		setTraitName(e.target.value);
	};
	return (
		<div className="container">
			{isEditing ? (
				<>
					<div className="row">
						<Form.Control
							id="textBox"
							type="text"
							value={traitName}
							placeholder=" "
							onChange={handleNameChange.bind(this)}
						/>
					</div>
					<div className="row">
						<div className="col-6">
							<div className="icon">
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
					{props.trait.proficiencies != null && (
						<>
							<hr />
							<div className="row" style={{ fontSize: "12px" }}>
								{" "}
								{props.trait.proficiencies}
							</div>
						</>
					)}
					{props.trait.specialTraits != null && (
						<>
							<hr />
							<div className="row" style={{ fontSize: "12px" }}>
								{" "}
								{props.trait.specialTraits}
							</div>
						</>
					)}
					
						{props.trait.modifiers != null &&
							props.trait.modifiers.length >= 0 &&
							props.trait.modifiers.map((m) => <><hr />
                            <div className="row" style={{ fontSize: "12px" }}>{m.name != null && m.name}</div></>)}
					
					
						{props.trait.smallProf != null &&
							props.trait.smallProf.length >= 0 &&
							props.trait.smallProf.map((p) => (
								<><hr />
                                <div className="row" style={{ fontSize: "12px" }}>
									<div className="col-6 StatCubesmall">{p.name}</div>
									<div className="col-6 StatCubesmall">{p.prof}</div>
                                    </div>
								</>
							))}
                            {props.trait.smallTools != null &&
							props.trait.smallTools.length >= 0 &&
							props.trait.smallTools.map((t) => (
								<><hr />
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
								setIsEditing(true);
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
