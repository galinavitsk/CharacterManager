import {Trait} from './Trait';
import {Guid} from "guid-typescript";
export interface Subclass {
    id:Guid;
    subclassName: string;
    traits:Trait[];
}