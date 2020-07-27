import * as React from 'react';
import { Component, useState } from 'react';
import { faBackspace, faDivide,faTimes, faEquals, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Form from 'react-bootstrap/Form'
import Equal from '../../../Components/SolveDiceEqualtion'
import './Calc.css'
import { connect } from "react-redux";
import { UpdateCurrentHealth, UpdateTempHealth } from '../../../../redux/actionCreators';
 

const mapStateToProps = state => {
    return {
      currentHealth:state.currentHealth,
      maxHealth:state.maxHealth,
      classes:state.classes,
      tempHealth:state.tempHealth
    };
  };

  const mapDispatchToProps = dispatch => ({
    updateCurrentHealth: (payload) => dispatch(UpdateCurrentHealth(payload)),
    updateTempHealth: (payload)=> dispatch(UpdateTempHealth(payload))
  })


const PointsCalculator =props=>{
    
    const [points, setPoints] = useState("");

 const handleChange=(e:any)=> {
    setPoints(e.target.value)
  }

const Delete= () => {
    setPoints(points.slice(0, -1))
}

const Heal=()=>{if(points.length>0){
var changeAmount=Equal(points);
var ch=props.currentHealth+parseInt(changeAmount);
if(ch>props.maxHealth){
    ch=props.maxHealth;
}
props.updateCurrentHealth(ch);
props.onPToggle();
}

}

const Temp=()=>{
    if(points.length>0){
var newtemp=props.tempHealth+parseInt(Equal(points));
   
props.updateTempHealth(newtemp);
props.onPToggle();
}
}


    return ( 
        <div className="container">
            <div className="row">
            <Form.Control id="textBox" 
            type="text" 
            value={points}
            placeholder="enter damage/healing"
            onChange={handleChange.bind(this)}/>
            </div>
            <div className="row">
                <div className="col-3 calc-item" onClick={()=>setPoints(points+"d4")}>
                    d4
                </div>
                <div className="col-3 calc-item" onClick={()=>setPoints(points+"d6")}>
                  d6
                </div>
                <div className="col-3 calc-item" onClick={()=>setPoints(points+"d8")}>
                   d8 
                </div>
                <div className="col-3 calc-item-2" onClick={()=>{Delete()}}>
                <FontAwesomeIcon icon={faBackspace} />
                </div>
            </div>
            <div className="row">
                <div className="col-3 calc-item" onClick={()=>setPoints(points+"d10")}>
                    d10
                </div>
                <div className="col-3 calc-item" onClick={()=>setPoints(points+"d12")}>
                  d12
                </div>
                <div className="col-3">
                   
                </div>
                <div className="col-3 calc-item-2" onClick={()=>{setPoints(points+"/")}}>
                <FontAwesomeIcon icon={faDivide} />
                </div>
            </div>
            <div className="row">
                <div className="col-3 calc-item" onClick={()=>setPoints(points+"1")}>
                    1
                </div>
                <div className="col-3 calc-item" onClick={()=>setPoints(points+"2")}>
                  2
                </div>
                <div className="col-3 calc-item" onClick={()=>setPoints(points+"3")}>
                  3
                </div>
                <div className="col-3 calc-item-2" onClick={()=>setPoints(points+"*")}>
                <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
            <div className="row">
                <div className="col-3 calc-item" onClick={()=>setPoints(points+"4")}>
                    4
                </div>
                <div className="col-3 calc-item" onClick={()=>setPoints(points+"5")}>
                  5
                </div>
                <div className="col-3 calc-item" onClick={()=>setPoints(points+"6")}>
                  6
                </div>
                <div className="col-3 calc-item-2" onClick={()=>setPoints(points+"+")}>
                <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>
            <div className="row">
                <div className="col-3 calc-item" onClick={()=>setPoints(points+"7")}>
                    7
                </div>
                <div className="col-3 calc-item" onClick={()=>setPoints(points+"8")}>
                  8
                </div>
                <div className="col-3 calc-item" onClick={()=>setPoints(points+"9")}>
                  9
                </div>
                <div className="col-3 calc-item-2" onClick={()=>setPoints(points+"-")}>
                <FontAwesomeIcon icon={faMinus} />
                </div>
            </div>
            <div className="row">
                <div className="col-3 calc-item" onClick={()=>setPoints(points+"0")}>
                    0
                </div>
                <div className="col-3 calc-item" onClick={()=>setPoints(points+"(")}>
                 (
                </div>
                <div className="col-3 calc-item" onClick={()=>setPoints(points+")")}>
                  )
                </div>
                <div className="col-3 calc-item-2" onClick={()=>setPoints(Equal(points))}>
                <FontAwesomeIcon icon={faEquals} />
                </div>
            </div>
            <div className="row">
                <div className="col-4 calc-item-health" onClick={()=>{Heal()}}>
                    Heal
                </div>
                <div className="col-4 calc-item-health" onClick={()=>{Temp()}}>
                    Temp
                </div>
                <div className="col-4 calc-item-damage">
                    Damage
                </div>
            </div>
        </div> );
        }
 
 export default connect(mapStateToProps,mapDispatchToProps) (PointsCalculator);