 import {Class} from './Class';
 import {Race} from './Race';
 import {Trait} from './Trait';
import { Background } from './Background';
import {Guid} from "guid-typescript";
import { Condition } from './Condition';
import { SmallProf } from './SmallProf';
import { SmallTools } from './SmallTools';

 export interface Character {
     id:Guid;
    name: string;
    race: Race;
    classes: Class[];
    background:Background;
    abilityScores: { [key: string]: number; };
    acbonus:number;
    maxHealth: number;
    currentHealth: number;
    tempHealth: number;
    inspiration:number;
    traits:Trait[];
    conditions:Condition[];
    exhaustion:number;
    smallProf:SmallProf[];
    smallTools:SmallTools[];
}