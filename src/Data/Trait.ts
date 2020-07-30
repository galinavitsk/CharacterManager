import { Modifier } from "./Modifier";
import { Guid } from "guid-typescript";
import { SmallProf } from "./SmallProf";
import { SmallTools } from "./SmallTools";

export interface Trait {
	id: Guid;
	name: string;
	description: string;
	savingThrowsProf: string[];
	skillsProf: string[];
	modifiers: Modifier[];
	smallProf: SmallProf[];
	smallTools: SmallTools[];
}
