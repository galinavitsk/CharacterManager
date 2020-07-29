import {Trait} from './Trait';
import {Subclass} from './Subclass'
import {Guid} from "guid-typescript";
export interface Class {
    id:Guid;
    className: string;
    classLevel: number;
    subclass: Subclass;
    hitDie: number;
    currentHDie: number;
    traits:Trait[];
}