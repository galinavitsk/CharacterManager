import * as React from 'react';
import { Component } from 'react';
import './topnav.css';
import { connect } from 'react-redux';
import { UpdateCurrentHitDice } from '../../redux/actionCreators';
 
const mapStateToProps = state => {
    return {
        classes:state.classes
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    updateCurrentHitDice: (id,payload) => dispatch(UpdateCurrentHitDice(id,payload))
  })

const TopNavBar  =props=> {
    const ResetHitDice=()=>{
        {props.classes.length>=0 && 
            props.classes.map((c)=>{
            props.updateCurrentHitDice(c.id,c.classLevel)})
            }
    }
   
        return ( 
        <div className="navbar navbar-default fixed-top top-nav">
            
                 <div className="col-sm" style={{marginTop:"auto",marginBottom:"auto"}}>
            <h1>Character Manager</h1>
                    </div>
        <div className="col-sm" style={{marginTop:"auto",marginBottom:"auto"}} >
            <ul id="topnav">
                <li>
                    <a href="" target="_self"> Rest</a>
                    <ul>
                <li><a href="#" target="_self" >Long Rest</a></li>
                <li><a href="#" target="_self" >Short Rest</a></li>
                <li><a href="#" target="_self" >Reset Hit Points</a></li>
                <li><a onClick={()=>ResetHitDice()}>Reset Hit Dice</a></li>
                <li><a href="#" target="_self" >Reset Spell Slots</a></li>
                    </ul>
                </li>
            </ul>
        </div>       
    </div> );
}
 
export default connect(mapStateToProps,mapDispatchToProps) (TopNavBar) ;