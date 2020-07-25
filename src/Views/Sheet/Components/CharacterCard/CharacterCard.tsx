import * as React from 'react';
import { Component } from 'react';
import {Character} from '../../../../Data/Character';

export interface CharacterCardProps {
    Naomi:Character;
}
 
export interface CharacterCardState {
    
}
 
class CharacterCard extends React.Component<CharacterCardProps, CharacterCardState> {
    
    
    render() { 
        
        return (
            
        <div className="card">
        <div className="row">
            <div className="col-md-5 col-sm-12">
                <img style={{border:"1px solid #00000029"}} width="150" height="150" src='./Resources/Letter 2.jpg' />
            </div>
            <div className="col-md-7 col-sm-12">
    
                <p style={{fontWeight:"bold", fontSize:"20px", color:"#708F93"}}> {this.props.Naomi.name} <span style={{fontSize:"16px",fontWeight:"normal", float:"right"}}>{this.props.Naomi.subrace} {this.props.Naomi.race} </span></p>
                {this.props.Naomi.classes.length <= 0 &&
                <p style={{fontSize:"16px",color:"#708F93"}}>No Class Selected</p>
                }
                {this.props.Naomi.classes.length>=0 && 
                this.props.Naomi.classes.map((c)=>
                <p style={{fontSize:"16px",color:"#708F93", marginBottom:"-.2em"}}>{c.classLevel} {c.subclass} {c.className}</p>)
                }
                
                <p style={{fontSize:"16px",color:"#708F93"}}>{this.props.Naomi.currentHealth}</p>
            </div>
        </div>
        
    </div>);
    }
}
 
export default CharacterCard;