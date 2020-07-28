import {Trait} from './Trait';
import {Subclass} from './Subclass'
export interface Class {
    iD:number;
    className: string;
    classLevel: number;
    subclass: Subclass;
    hitDie: number;
    currentHDie: number;
    traits:Trait[];
}