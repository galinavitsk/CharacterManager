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
const SmallProficiencies = (props) => {
	const [profId, setProfId] = React.useState("");
	const [profType, setProfType] = React.useState("");
	const [profProf, setProfProf] = React.useState("");
	const [expanded, setExpanded] = React.useState(false);
	const openProfEdit = () => {
		setProfId(props.p.id);
		setProfType(props.p.type);
		setProfProf(props.p.prof);
		setExpanded(true);
	};
	const handleTypeChange = (e) => {
		setProfType(e.target.value);
	};
	const handleProfChange = (e) => {
		setProfProf(e.target.value);
    };
    const handleSaveProf=()=>{
        props.p.type=profType;
        props.p.prof=profProf;
        setExpanded(false);
    }
	return (
		<>
			{expanded ? (
				<>
					<div className="row" style={{ fontSize: "12px" }}>
                    

                        <div className="col-5"
                        
                        style={{paddingRight:"5px"}}>
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
						<div className="col-5"
                        
                        style={{padding:"0px", paddingRight:"5px"}}>
							<Form.Control
								type="text"
								value={profProf}
								placeholder=" "
								onChange={handleProfChange.bind(this)}
							/>
						</div>
						<div
                            className="col-1"
						><div className="row"
                        
					onClick={() => {
						handleSaveProf();
					}}>
							<div className="icon" style={{ float: "right" }}>
								<FontAwesomeIcon icon={faCheck} />
							</div>
                            </div>
                            <div className="row" 
							onClick={() => {
								setExpanded(false);
							}}>
							<div className="icon" style={{ float: "right" }}>
								<FontAwesomeIcon icon={faTimes} />
							</div>
                            </div>
						</div>
					</div>
				</>
			) : (
				<div
					className="row"
					style={{ fontSize: "12px" }}
					onClick={() => {
						openProfEdit();
					}}
				><div
                className="col-1 icon"
                style={{ paddingLeft: "0", textAlign: "left" }}
                onClick={() => {
                    props.handleDeleteProficiency(props.p);
                }}
            >
                <FontAwesomeIcon icon={faMinusCircle} />
            </div>
					<div className="col-5 StatCubesmall">{props.p.type}</div>
					<div className="col-6 StatCubesmall">{props.p.prof}</div>
				</div>
			)}
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(SmallProficiencies);
