import React from "react";
import {Character} from '../../../../Data/Character';
import { connect } from "react-redux";

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
            <div className="col-md-5 col-sm-12">
                <img style={{border:"1px solid #00000029"}} width="150" height="150" src='../../../../Resources/Letter 2.jpg' />
            </div>
            <div className="col-md-7 col-sm-12">
    
                <p style={{fontWeight:"bold", fontSize:"20px", color:"#708F93"}}> {props.name} <span style={{fontSize:"16px",fontWeight:"normal", float:"right"}}>{props.subrace} {props.race} </span></p>
                {props.classes.length <= 0 &&
                <p style={{fontSize:"16px",color:"#708F93"}}>No Class Selected</p>
                }
                {props.classes.length>=0 && 
                props.classes.map((c)=>
                <p style={{fontSize:"16px",color:"#708F93", marginBottom:"-.2em"}}>{c.classLevel} {c.subclass} {c.className}</p>)
                }
            </div>
        </div>
        
    </div>
  );


  export default connect(mapStateToProps) (CCard);