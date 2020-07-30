import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronDown,
	faChevronLeft,
	faPlus,
	faCog,
} from "@fortawesome/free-solid-svg-icons";
import Exhaustion from "./Exhaustion";

const mapStateToProps = (state) => {
	return {
		conditions: state.conditions,
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateCurrentHealth: (payload: number) =>
		dispatch(UpdateCurrentHealth(payload)),
});

const Conditions = (props) => {
	const [showConditions, setShowConditions] = React.useState(false);

	return (
		<div className="card">
			<div className="container">
				<div
					className="row"
					style={{ fontSize: "20px", color: "#708F93" }}
					onClick={() => {
						setShowConditions(!showConditions);
					}}
				><div className="col-10">
					Conditions</div>
					<div className="col-2"  style={{float:"right", textAlign:"right"}}>
					<div className="icon">
						{showConditions ? (
							<FontAwesomeIcon icon={faChevronDown} />
						) : (
							<FontAwesomeIcon icon={faChevronLeft} />
						)}
					</div></div>
				</div>
				<hr></hr>
				{showConditions ? (
					<>
						<Exhaustion />
						<hr />
						{props.conditions.length>=1 && props.conditions.map((c)=>(<>
						<div className="row">
							<div className="col-3 StatCube">{c.name}</div>
							<div className="col-9 StatCubesmall">
							{c.description}
							</div>
						</div>
						<hr /></>
						))}
					</>
				) : null}
			</div>
		</div>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(Conditions);
