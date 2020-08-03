import React, { useState } from "react";
import {Character} from '../../../../Data/Character';
import { connect } from "react-redux";
import './CharacterCard.css'
import GetCharacterLevel from "../../../../scripts/GetCharacterLevel"

 const mapStateToProps = (state: { name: any; race: { name: any; }; currentHealth: any; classes: any; }) => {
    return {
      name: state.name,
      race: state.race.name,
      currentHealth: state.currentHealth,
      classes: state.classes
    };
  };


  const CCard = (props: { name: React.ReactNode; classes: any[]; race: React.ReactNode; }) => {


    return(<div className="card">
        <div className="row">
            <div id="characterAvatar">
                <img style={{border:"1px solid #00000029"}} width="100" height="100" src='../../../../Resources/Letter2.jpg' />
            </div>
            <div id="characterInformation">
                <div id="characterName">{props.name} </div>
                <div id="characterRace"> {props.classes.length > 0 && GetCharacterLevel(props.classes) } {props.race} </div>
                {props.classes.length <= 0 &&
                <div className="characterClass">No Class Selected</div>
                }
                {props.classes.length>0 && 
                props.classes.map((c: { classLevel: React.ReactNode; subclass: { subclassName: React.ReactNode; }; className: React.ReactNode; })=>
                <div className="characterClass">{c.classLevel} {c.subclass.subclassName} {c.className}</div>)
                }
            </div>
        </div>
        
    </div>
  );
              }

  export default connect(mapStateToProps) (CCard);