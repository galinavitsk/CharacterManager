import {RaceTrait} from './RaceTrait';

export interface Race {
    //Score Imporvements
    name:string;
    Strength:number;
    Dexterity:number;
    Constitution:number;
    Intelligence:number;
    Wisdom:number;
    Charisma:number;
    size:string;
    speed:number;
    Traits:RaceTrait[];
}