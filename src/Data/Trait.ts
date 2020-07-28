import {Modifier} from './Modifier';

export interface Trait {
    name:string;
    description:string;
    proficiencies:string;
    specialTraits:number;
    modifiers:Modifier[];
}