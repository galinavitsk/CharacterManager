import * as React from "react";
import { Component, useState } from "react";
import StatusBar from "../../../Components/StatusBar";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { UpdateCurrentHealth } from "../../../../redux/actionCreators";
import GetAbilityMod from "../../../../scripts/GetAbilityMod";
import "./BasicStatsCard.css";
import GetCharacterLevel from "../../../../scripts/GetCharacterLevel"

import GetProficiency from "../../../../scripts/GetProficiency"

const mapStateToProps = (state) => {
	return {
		dexterity: state.abilityScores["Dexterity"],
    wisdom: state.abilityScores["Wisdom"],
    AC:state.acbonus,
    speed:state.race.speed,
    prof:state.proficiency,
    insp:state.inspiration,
    classes:state.classes
	};
};

const mapDispatchToProps = (
	dispatch: (arg0: { type: string; payload: number }) => any
) => ({
	updateCurrentHealth: (payload: number) =>
		dispatch(UpdateCurrentHealth(payload)),
});

const BasicStatsCard = (props) => {
	return (
		<>
			<div className="card" style={{ textAlign: "center" }}>
        <div className="container">
				<div className="row">
					<div className="col-2">
						<div className="BasicStat">AC</div>
						<div id="ArmorClass">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82.34 108.25"
            height="50px">
              <g id="Layer_2" data-name="Layer 2"><g id="Capa_1" data-name="Capa 1">
                <path className="a" d="M78.23,4.32C75.47,2.62,53.49.5,41.17.5S6.87,2.62,4.11,4.32.5,7.08.5,10.69V65.91a36,36,0,0,0,1.06,6.37C3.26,77.38,12.18,88,24.29,97.34s15.07,10.41,16.88,10.41S46,106.68,58.05,97.34s21-20,22.73-25.06a36,36,0,0,0,1.06-6.37V10.69C81.84,7.08,81,6,78.23,4.32Z"/>
            <text className="b" transform="translate(10.77 60.36)" style={{fontSize:"45px"}}>{10+props.AC+GetAbilityMod(props.dexterity)}</text></g></g></svg>
						</div>
					</div>
					<div className="col-3">
						<div className="BasicStat">Initiative</div>       
						<div id="Initiative">
              <svg version="1.1" id="Layer_1"
              width="50"   
              height="50"
              xmlns="http://www.w3.org/2000/svg"  
               x="0px" y="0px"
              viewBox="0 0 74 72">
<g>
	<rect className="a" width="74" height="72"/>
</g>
<text transform="matrix(1 0 0 1 18.5325 46.2998)" className="b">+ {GetAbilityMod(props.dexterity)}</text>
</svg>
						</div>
					</div>
          <div className="col-7">
            <div className="row">
              <div className="col-8 StatCube" style={{textAlign:"left"}}>Speed</div>
              <div className="col-4 StatCube" style={{textAlign:"right"}}>{props.speed} feet</div>
            </div>
            <div className="row">
              <div className="col-8 StatCube" style={{textAlign:"left"}}>Proficiency</div>
              <div className="col-4 StatCube" style={{textAlign:"right"}}>+{GetProficiency(GetCharacterLevel(props.classes))}</div>
            </div>
            <div className="row">
              <div className="col-8 StatCube" style={{textAlign:"left"}}>Passive Perception</div>
              <div className="col-4 StatCube" style={{textAlign:"right"}}>{10+GetAbilityMod(props.wisdom)}</div>
            </div>
            <div className="row">
              <div className="col-8 StatCube" style={{textAlign:"left"}}>Inspiration</div>
              <div className="col-4 StatCube" style={{textAlign:"right"}}>{props.insp}</div>
            </div>
          </div>
				</div>
			</div>
      </div>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicStatsCard);
