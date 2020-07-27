import * as React from 'react';
import { Component, useState } from 'react';
import StatusBar from '../../../Components/StatusBar';
import Modal from 'react-bootstrap/Modal';
import { connect } from "react-redux";
import { UpdateCurrentHealth } from '../../../../redux/actionCreators';
 

const mapStateToProps = (state: { currentHealth: any; maxHealth: any; classes: any; tempHealth: any; }) => {
    return {
      currentHealth:state.currentHealth,
      maxHealth:state.maxHealth,
      classes:state.classes,
      tempHealth:state.tempHealth
    };
  };

  const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: number; }) => any) => ({
    updateCurrentHealth: (payload: number) => dispatch(UpdateCurrentHealth(payload))
  })

const SkillsScoresCard =props=>{
    
    return(<>
        <div className="card" style={{textAlign:"center"}}>
        <span style={{fontSize:"20px",color:"#708F93"}}>Hit Points</span>
                
    </div>
    </> );}
 
 export default connect(mapStateToProps,mapDispatchToProps) (SkillsScoresCard);