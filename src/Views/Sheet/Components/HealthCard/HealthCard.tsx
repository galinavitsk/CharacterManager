import * as React from 'react';
import { Component } from 'react';

import {Character} from '../../../../Data/Character';
import StatusBar from '../../../Components/StatusBar'
export interface HealthCardProps {
    Naomi:Character
}
 
export interface HealthCardState {
    
}
 
class HealthCard extends React.Component<HealthCardProps, HealthCardState> {

    GetLabelHealth(){
        let label:string = this.props.Naomi.currentHealth+"/"+this.props.Naomi.maxHealth;
        return label;
    };
    GetLabelHitDice(currentHD:number,HD:number){
        let label:string = currentHD + "d"+HD
        return label
    }
    render() { 
        return ( 
        <div className="card" style={{textAlign:"center"}}>
        <span style={{fontSize:"20px",color:"#708F93"}}>Hit Points</span>
        <div className="HealthBar">
            <StatusBar bColor="#9DBE9E"
                       fColor="#BAE6BC"
                       value={(this.props.Naomi.currentHealth/this.props.Naomi.maxHealth)*100}
                       label={this.GetLabelHealth()}/>
             {this.props.Naomi.classes.length>=0 && 
                this.props.Naomi.classes.map((c)=>
                <div style={{marginTop:"2px"}}>
                <StatusBar bColor="#c5d2db"
                       fColor="#D8E2E9"
                       value={(c.currentHDie/c.classLevel)*100}
                       label={this.GetLabelHitDice(c.currentHDie,c.hitDie)}/>
                       </div>
                )}
                
        </div>
    </div> );
    }
}
 
export default HealthCard;