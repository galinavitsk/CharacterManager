
import {Character} from '../Data/Character';
import {Race} from '../Data/Race';
import * as types from './types';
// Initial (starting) state

    export const Naomi:Character={
        name:"Naomi",
        race:{
          name:"Fallen Aassimar",
          Strength:0,
          Dexterity:0,
          Constitution:0,
          Intelligence:0,
          Wisdom:0,
          Charisma:0,
          size:"medium",
          speed:30,
          Traits:[{
            name:"Darkvision",
            description:"You are able to see in the dark",
            proficiencies:null,
            modifiers:null,
            specialTraits:null
          }]
        },
        classes: [{iD:0,className:"Rogue",subclass:"Arcane Trickster", classLevel:4,hitDie:8,currentHDie:2},
        {iD:1,className:"Rogue",subclass:"Arcane Trickster", classLevel:20,hitDie:8,currentHDie:5}],
        abilityScores:{["Strength"]:20,["Dexterity"]:20,["Constitution"]:20,["Intelligence"]:20,["Wisdom"]:20,["Charisma"]:20},
        acbonus:0,
        maxHealth:120,
        currentHealth:100,
        tempHealth:10,
        inspiration:0
    };
  
  // Our root reducer starts with the initial state
  // and must return a representation of the next state
  export const rootReducer = (state = Naomi, action) => { switch (action.type) {
    case types.UPDATE_CURRENT_HEALTH:
        return { ...state, currentHealth: action.payload };
    case types.UPDATE_TEMP_HEALTH:
        return { ...state, tempHealth: action.payload };
    case types.UPDATE_CLASS_CURRENT_HIT_DICE:
      return { ...state,
        classes: state.classes.map(data => {
          if (data.iD != action.iD) {
            return data;
          }
          else {
            return {iD:data.iD,
              className:data.className,
              subclass:data.subclass,
               classLevel:data.classLevel,
               hitDie:data.hitDie,
               currentHDie:action.payload
            };
          }
        }
      )
    }
        
    default:
      return state;
  }
  };
  