import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import "../featurestraits.css";

import Form from "react-bootstrap/Form";
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
import { Guid } from "guid-typescript";

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => ({});
const SmallProficienciesAdd = (props) => {
	const [profType, setProfType] = React.useState("Language");
    const [profProf, setProfProf] = React.useState("");
    
	const handleTypeChange = (e) => {
		setProfType(e.target.value);
	};
	const handleProfChange = (e) => {
		setProfProf(e.target.value);
    };
    
	const SaveProf = () => {
        props.handleSaveProf(profType,profProf);
        setProfType("Language");
        setProfProf("");
	};
	return (
		<>
			<div className="row" style={{ fontSize: "12px" }}>
                <div className="col-1" style={{paddingRight:"0px"}}></div>
				<div className="col-5" style={{ paddingLeft:"0px", paddingRight: "5px" }}>
					<Form>
						<Form.Group controlId="categories.SelectCustom">
							<Form.Control
								as="select"
								custom
								value={profType}
								onChange={handleTypeChange.bind(this)}
							>
								<option>Language</option>
								<option>Weapon</option>
								<option>Armor</option>
								<option>Other</option>
							</Form.Control>
						</Form.Group>
					</Form>
				</div>
				<div className="col-5" style={{ padding: "0px", paddingRight: "5px" }}>
					<Form.Control
						type="text"
						value={profProf}
						placeholder=" "
						onChange={handleProfChange.bind(this)}
					/>
				</div>
				<div className="col-1" style={{paddingRight:"0px"}}>
					<div
						className="row"
						onClick={() => {
                            SaveProf();
						}}
					>
						<div className="icon" style={{ float: "right" }}>
							<FontAwesomeIcon icon={faCheck} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(SmallProficienciesAdd);
