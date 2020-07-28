import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return {
        exhaustion:state.exhaustion
	};
};

const mapDispatchToProps = (dispatch) => ({
});

const Exhaustion = (props) => {

	return (<>
        {props.exhaustion==0 ?(
            <>
									<div className="row">
										<div className="col-3 StatCube">Exhaustion</div>
										<div className="col-3 StatCube">Level 0</div>
										<div className="col-6 StatCubesmall">Insert Level 0 Desciption</div>
									</div>
									<hr />
								</>
        ):null}
       { props.exhaustion==1 ?(
            <>
									<div className="row">
										<div className="col-3 StatCube">Exhaustion</div>
										<div className="col-3 StatCube">Level 1</div>
										<div className="col-6 StatCubesmall">Insert Level 1 Desciption</div>
									</div>
									<hr />
								</>
        ):null}
        { props.exhaustion==2 ?(
            <>
									<div className="row">
										<div className="col-3 StatCube">Exhaustion</div>
										<div className="col-3 StatCube">Level 2</div>
										<div className="col-6 StatCubesmall">Insert Level 2 Desciption</div>
									</div>
									<hr />
								</>
        ):null}
        { props.exhaustion==3 ?(
            <>
									<div className="row">
										<div className="col-3 StatCube">Exhaustion</div>
										<div className="col-3 StatCube">Level 3</div>
										<div className="col-6 StatCubesmall">Insert Level 3 Desciption</div>
									</div>
									<hr />
								</>
        ):null}
        { props.exhaustion==4 ?(
            <>
									<div className="row">
										<div className="col-3 StatCube">Exhaustion</div>
										<div className="col-3 StatCube">Level 4</div>
										<div className="col-6 StatCubesmall">Insert Level 4 Desciption</div>
									</div>
									<hr />
								</>
        ):null}
        { props.exhaustion==5 ?(
            <>
									<div className="row">
										<div className="col-3 StatCube">Exhaustion</div>
										<div className="col-3 StatCube">Level 5</div>
										<div className="col-6 StatCubesmall">Insert Level 5 Desciption</div>
									</div>
									<hr />
								</>
        ):null}
        { props.exhaustion==6 ?(
            <>
									<div className="row">
										<div className="col-3 StatCube">Exhaustion</div>
										<div className="col-3 StatCube">Level 6</div>
										<div className="col-6 StatCubesmall">Insert Level 6 Desciption</div>
									</div>
									<hr />
								</>
        ):null}
</>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(Exhaustion);
