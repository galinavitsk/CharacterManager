
import {Trait} from './Trait';
import {Guid} from "guid-typescript";

export interface Background {

   id:Guid;
   name: string;
   traits:Trait[];
}