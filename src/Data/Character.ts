 import {Class} from './Class';
 import {Race} from './Race';
 import {Trait} from './Trait';
import { Background } from './Background';

 export interface Character {

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
}