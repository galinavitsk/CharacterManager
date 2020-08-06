import {Trait} from './Trait';

import {Guid} from "guid-typescript";
import { Modifier } from './Modifier';
export interface Race {
    //Score Imporvements
    id:Guid;
    name:string;
    modifiers:Modifier[];
    size:string;
    speed:number;
    traits:Trait[];
}