 import {Class} from './Class';
 import {Race} from './Race';

 export interface Character {

    name: string;
    
    race: Race;
    classes: Class[];
    abilityScores: { [key: string]: number; };
    acbonus:number;
    maxHealth: number;
    currentHealth: number;
    tempHealth: number;
    inspiration:number;
}