import * as React from 'react';
import { Component } from 'react';
export interface StatusBarProps {
    bColor:string,
    fColor:string
    value:number,
    label:string
}
 
export interface StatusBarState {
    
}
 
class StatusBar extends React.Component<StatusBarProps, StatusBarState> {
    render() { 
        return (
            <div className="health-box"
     style={{backgroundColor:this.props.bColor,
        height: "30px",
        width: "100%",
        margin: "0 auto",
        border: "1px solid #EAA69A"}}>
    <div className="health-bar"
         style={{backgroundColor: this.props.fColor,
       width: this.props.value+"%",
       height: "28px",
       bottom: "56px"}}></div>
    <div className="health-bar-text"
         style={{marginTop: "-1.7rem",
        fontSize: "16px",
        color: "#708F93"}}>
            {this.props.label} </div>
</div>
        );
    }
}
 
export default StatusBar;