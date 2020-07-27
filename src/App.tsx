import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import TopNavBar from './Views/Shared/TopNavBar';
import SideBar from './Views/Shared/Sidebar';
import Sheet from './Views/Sheet/index'
import Spells from './Views/Spells/index'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {Character} from './Data/Character';
import { connect } from 'react-redux';
import { UpdateCurrentHitDice } from './redux/actionCreators';

const mapStateToProps = state => {
  return {
    currentHealth:state.currentHealth,
    maxHealth:state.maxHealth,
    classes:state.classes,
    tempHealth:state.tempHealth
  };
};

const mapDispatchToProps = dispatch => ({
  updateCurrentHitDice: (iD,payload) => dispatch(UpdateCurrentHitDice(iD,payload))
})

const App =(props)=>{

    return (
  <div>
    <TopNavBar/>
    <div className="row" style={{marginTop:"70px",width:"100%"}}>
        <Router>
        <SideBar />
       <div className="content">
       <Switch>
          <Route path="/sheet">
            <Sheet />
          </Route>
          <Route path="/spells">
            <Spells />
          </Route>
          <Route path="/">
            <Sheet />
          </Route>
        </Switch>
       </div>

       </Router>
    </div>
  </div>
    );
  }
  export default connect(mapStateToProps,mapDispatchToProps) (App);