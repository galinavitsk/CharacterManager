import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import "./featurestraits.css";
import { faChevronDown,faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateCurrentHealth: (payload: number) =>
		dispatch(UpdateCurrentHealth(payload)),
});

const ClassFeatures = (props) => {
    const [classFeature, setClassFeatureOpen]=React.useState(false);
    const [subclassFeature, setSubclassFeatureOpen]=React.useState(false);
    return (<>
							<div className="row featureHeader" style={{paddingLeft:"10px"}} onClick={()=>{setClassFeatureOpen(!classFeature)}}>Class: {props.c.className}
                            <div className="icon">{classFeature ? <FontAwesomeIcon icon={faChevronDown} />: <FontAwesomeIcon icon={faChevronLeft}/>}</div>
                            </div>
							{props.c.traits.length >= 1 &&
								props.c.traits.map((t) => (
                                    classFeature ? (
                                        <div className="row">
                                    <div className="col-3 StatCube">{t.name}</div>
                                    <div className="col-9 StatCubesmall">{t.description}</div>
                                </div>) : null 	
                                ))
                                }
                                <hr/>
							{props.c.subclass.traits.length >= 1 &&
								props.c.subclass.traits.map((s) => (
									<>
										<div className="row featureHeader" style={{paddingLeft:"20px"}}onClick={()=>(setSubclassFeatureOpen(!subclassFeature))}>
											Subclass: {props.c.subclass.subclassName}
                                            <div className="icon">{subclassFeature ? <FontAwesomeIcon icon={faChevronDown} />: <FontAwesomeIcon icon={faChevronLeft}/>}</div>
										</div>
                                        {subclassFeature ?(
										<div className="row">
											<div className="col-3 StatCube">{s.name}</div>
											<div className="col-9 StatCubesmall">{s.description}</div>
										</div>) :null}
									</>
								))}
                                <hr/>
        </>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(ClassFeatures);
