import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import TopNavBar from './Views/Shared/TopNavBar';
import SideBar from './Views/Shared/Sidebar';
import Sheet from './Views/Sheet/index'
import Spells from './Views/Spells/index'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {Character} from './Data/Character';
import {Class} from './Data/Class'
 
const Naomi:Character={
    name:"Naomi",
    race:"Assimar",
    subrace:"Scourged",
    classes: [{className:"Rogue",subclass:"Arcane Trickster", classLevel:4,hitDie:8,currentHDie:2},
    {className:"Rogue",subclass:"Arcane Trickster", classLevel:20,hitDie:8,currentHDie:5}],
    abilityScores:{["Strength"]:20,["Dexterity"]:20,["Constitution"]:20,["Intelligence"]:20,["Wisdom"]:20,["Charisma"]:20},
    maxHealth:120,
    currentHealth:100,
    tempHealth:10
};

class App extends Component {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
          characterData: Naomi
        };
      }

  render() {
    return (
  <div>
    <TopNavBar/>
    <div className="row">
        <Router>
        <SideBar />
       <div className="content">
       <Switch>
          <Route path="/sheet">
            <Sheet Naomi={Naomi}/>
          </Route>
          <Route path="/spells">
            <Spells />
          </Route>
          <Route path="/">
            <Sheet Naomi={Naomi}/>
          </Route>
        </Switch>
       </div>

       </Router>
    </div>
  </div>
    );
  }
}
export default App;