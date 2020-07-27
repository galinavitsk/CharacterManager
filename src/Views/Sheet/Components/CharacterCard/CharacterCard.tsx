import React from "react";
import {Character} from '../../../../Data/Character';
import { connect } from "react-redux";
import './CharacterCard.css'

export interface CharacterCardProps {
    Naomi:Character;
}
 
export interface CharacterCardState {
    
}
 const mapStateToProps = (state: { name: any; race: any; subrace: any; currentHealth: any; classes: any; }) => {
    return {
      name: state.name,
      race: state.race,
      subrace: state.subrace,
      currentHealth: state.currentHealth,
      classes: state.classes
    };
  };

  const CCard = (props: { name: React.ReactNode; subrace: React.ReactNode; race: React.ReactNode; classes: any[]; currentHealth: React.ReactNode; }) => (
    <div className="card">
        <div className="row">
            <div id="characterAvatar">
                <img style={{border:"1px solid #00000029"}} width="100" height="100" src='../../../../Resources/Letter 2.jpg' />
            </div>
            <div id="characterInformation">
    
                <div id="characterName"> {props.name} </div>
                <div id="characterRace">{props.subrace} {props.race} </div>
                {props.classes.length <= 0 &&
                <div className="characterClass">No Class Selected</div>
                }
                {props.classes.length>=0 && 
                props.classes.map((c)=>
                <div className="characterClass">{c.classLevel} {c.subclass} {c.className}</div>)
                }
            </div>
        </div>
        
    </div>
  );


  export default connect(mapStateToProps) (CCard);