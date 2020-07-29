
import {Guid} from "guid-typescript";
export interface Modifier {
    id:Guid;
    name:string,
    category:string,
    type:string,
    value:string
}