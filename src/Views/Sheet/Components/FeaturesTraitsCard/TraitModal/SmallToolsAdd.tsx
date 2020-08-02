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

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => ({});
const SmallToolsAdd = (props) => {
	const [toolName, setToolName] = React.useState("");
	const [toolBonus, setToolBonus] = React.useState("Proficient");
	const [toolAttribute, setToolAttribute] = React.useState("Strength");
	const [toolMods, setToolMods] = React.useState(0);

	const handleSaveTool = () => {
        props.handleSaveTool(toolName,toolBonus,toolAttribute,toolMods);
        setToolName(null);
        setToolBonus(null);
        setToolAttribute(null);
        setToolMods(null);

	};
	const handleNameChange = (e) => {
		setToolName(e.target.value);
	};
	const handleBonusChange = (e) => {
		setToolBonus(e.target.value);
	};
	const handleAttributeChange = (e) => {
		setToolAttribute(e.target.value);
    };
    const handleModsChange=(e)=>{
        setToolMods(e.target.value);
    }
	return (
				<>
					<div className="row" style={{ fontSize: "12px" }}>
                        <div className="col-3">Name:</div>
						<div className="col-9" style={{padding:"0px"}}><Form.Control
							type="text"
							value={toolName}
							placeholder=" "
							onChange={handleNameChange.bind(this)}
						/></div>
					</div>

					<div className="row">
                        <div className="col-6" style={{paddingRight:"5px"}}>
                        <Form>
							<Form.Group controlId="categories.SelectCustom">
								<Form.Control
									as="select"
									custom
									value={toolBonus}
									onChange={handleBonusChange.bind(this)}
								>
									<option>Proficient</option>
									<option>Expertise</option>
									<option>Jack of All Trades</option>
								</Form.Control>
							</Form.Group>
						</Form>
                        </div>
						<div className="col-4" style={{paddingLeft:"0px",paddingRight:"5px"}}>
							<Form>
								<Form.Group controlId="categories.SelectCustom">
									<Form.Control
										as="select"
										custom
										value={toolAttribute}
										onChange={handleAttributeChange.bind(this)}
									>
										<option>Strength</option>
										<option>Dexterity</option>
										<option>Constitution</option>
										<option>Intelligence</option>
										<option>Wisdom</option>
										<option>Charisma</option>
										<option>Query</option>
									</Form.Control>
								</Form.Group>
							</Form>
						</div>
                        <div className="col-2" style={{padding:"0px"}}>
                        <Form.Control
							type="text"
							value={toolMods}
							placeholder="0"
                            onChange={handleModsChange.bind(this)}
                            style={{marginTop:"3px"}}
						/>
                        </div>



					</div>

					<div className="row" style={{ fontSize: "12px" }}>
						<div className="col-6" onClick={() => {
									handleSaveTool();
								}}>
								<div className="icon" style={{ float: "left" }}>
									<FontAwesomeIcon icon={faCheck} />
								</div>
						</div>
					</div>
				</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(SmallToolsAdd);
