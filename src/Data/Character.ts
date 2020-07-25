 import {Class} from './Class';

 export interface Character {
    name: string;
    race: string;
    subrace: string;
    classes: Class[];
    abilityScores: { [key: string]: number; };
    maxHealth: number;
    currentHealth: number;
    tempHealth: number;
}