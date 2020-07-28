import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import "./featurestraits.css";
import ClassFeatures from "./ClassFeatures";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronDown,
	faChevronLeft,
	faPlus,
	faCog,
} from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state) => {
	return {
		classes: state.classes,
        background: state.background,
        traits:state.traits
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateCurrentHealth: (payload: number) =>
		dispatch(UpdateCurrentHealth(payload)),
});

const FeaturesTrait = (props) => {
	const [showFeatures, setShowFeatures] = React.useState(false);

	const [showBackgroundFeatures, setShowBackgroundFeatures] = React.useState(
		false
	);
	const [showOtherFeatures, setShowOtherFeatures] = React.useState(false);

	return (
		<div className="card">
			<div className="container">
				<div
					className="row"
					style={{ fontSize: "20px", color: "#708F93" }}
					onClick={() => {
						setShowFeatures(!showFeatures);
					}}
				>
					Features and Traits{" "}
					<div className="icon">
						{showFeatures ? (
							<FontAwesomeIcon icon={faChevronDown} />
						) : (
							<FontAwesomeIcon icon={faChevronLeft} />
						)}
					</div>
				</div>
				<hr></hr>
				{showFeatures ? (<>
                   { props.classes.length >= 1 &&
							props.classes.map((c) => <ClassFeatures c={c} />)}
                    <hr/>
                    <div
                        className="row featureHeader"
                        style={{ paddingLeft: "10px" }}
                        onClick={() => {
                            setShowBackgroundFeatures(!showBackgroundFeatures);
                        }}
                    >
                        Background: {props.background.name}
                        <div className="icon">
                            {showBackgroundFeatures ? (
                                <FontAwesomeIcon icon={faChevronDown} />
                            ) : (
                                <FontAwesomeIcon icon={faChevronLeft} />
                            )}
                        </div>
                    </div>
                    {showBackgroundFeatures
                        ? props.background.traits.map((b) => (
                                <>
                                    <div className="row">
                                        <div className="col-3 StatCube">{b.name}</div>
                                        <div className="col-9 StatCubesmall">{b.description}</div>
                                    </div>
                                    <hr/>
                                </>
                          ))
                        : null}
                        <hr/>
                        <hr/>
                    <div
                        className="row featureHeader"
                        style={{ paddingLeft: "10px" }}
                        onClick={() => {
                            setShowOtherFeatures(!showOtherFeatures);
                        }}
                    >
                        Other(Feats, Features, Traits)
                        <div className="icon">
                            {showOtherFeatures ? (
                                <FontAwesomeIcon icon={faChevronDown} />
                            ) : (
                                <FontAwesomeIcon icon={faChevronLeft} />
                            )}
                        </div>
                    </div>
                    {showOtherFeatures
                        ? props.traits.map((t) => (
                                <>
                                    <div className="row">
                                        <div className="col-3 StatCube">{t.name}</div>
                                        <div className="col-9 StatCubesmall">{t.description}</div>
                                    </div>
                                    <hr/>
                                </>
                          ))
                        : null}
                        <hr/>
                        <hr/>
				</>) : null}
				
			</div>
		</div>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(FeaturesTrait);
