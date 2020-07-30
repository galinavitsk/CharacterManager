import {Trait} from './Trait';

import {Guid} from "guid-typescript";
export interface Race {
    //Score Imporvements
    id:Guid;
    name:string;
    Strength:number;
    Dexterity:number;
    Constitution:number;
    Intelligence:number;
    Wisdom:number;
    Charisma:number;
    size:string;
    speed:number;
    traits:Trait[];
}