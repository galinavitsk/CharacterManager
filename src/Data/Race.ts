import {Trait} from './Trait';

import {Guid} from "guid-typescript";
export interface Race {
    //Score Imporvements
    id:Guid;
    name:string;
    abilityScores: { [key: string]: number; };
    size:string;
    speed:number;
    traits:Trait[];
}