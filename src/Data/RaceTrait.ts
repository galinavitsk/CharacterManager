import {Modifier} from './Modifier';

export interface RaceTrait {
    name:string;
    description:string;
    proficiencies:string;
    specialTraits:number;
    modifiers:Modifier[];
}