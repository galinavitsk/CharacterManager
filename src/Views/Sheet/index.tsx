import * as React from 'react';
import { Component } from 'react';
import CharacterCard from './Components/CharacterCard/CharacterCard';
import {Character} from '../../Data/Character';
import HealthCard from './Components/HealthCard/HealthCard';
export interface SheetProps {
    Naomi:Character;
}
 
export interface SheetState {
    
}
 
class Sheet extends React.Component<SheetProps, SheetState> {


    render() { 
        return (
            <div className="row" style={{margin:"0px"}}>
            <div className="col-6" style={{margin:"0px",padding:"0px"}}>
        <CharacterCard/>
        <HealthCard/>
        </div>
        <div className="col-3" style={{margin:"0px",padding:"0px"}}>
        <h1>Hello world</h1>
        </div>
        <div className="col-3" style={{margin:"0px",padding:"0px"}}>
        <h1>Hello world</h1>
        </div>

        </div>);
    }
}
 
export default Sheet;