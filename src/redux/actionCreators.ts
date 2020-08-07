import * as types from "./types";
import { Guid } from "guid-typescript";
import { Trait } from "../Data/Trait";
import { ModifyCharacter } from "../scripts/CharacterManipulation";

export const LoadCharacter = (character) => ({
	type: types.LOAD_CHARACTER,
	payload: character,
});
export const UpdateCurrentHealth = (ch: number) => ({
	type: types.UPDATE_CURRENT_HEALTH,
	payload: ch,
});
export const UpdateTempHealth = (temp: number) => ({
	type: types.UPDATE_TEMP_HEALTH,
	payload: temp,
});
export const UpdateCurrentHitDice = (id: Guid, newHD: number) => ({
	type: types.UPDATE_CLASS_CURRENT_HIT_DICE,
	id: id,
	payload: newHD,
});
export const ModifyTraits = (newTraits: Trait, category: string) => ({
	type: types.MODIFY_TRAITS,
	payload: newTraits,
	location: category,
});
export const UpdateClassTrait = (newTraits: Trait, id: Guid) => ({
	type: types.UPDATE_CLASS_TRAIT,
	payload: newTraits,
	id: id,
});
export const UpdateSubclassTrait = (newTraits: Trait, id: Guid) => ({
	type: types.UPDATE_SUBCLASS_TRAIT,
	payload: newTraits,
	id: id,
});
export const UpdateTrait = (newTrait: Trait, id: Guid) => ({
	type: types.UPDATE_TRAIT,
	payload: newTrait,
	id: id,
});
export const UpdateInspiration = (newInspiration: number) => ({
	type: types.UPDATE_INSPIRATION,
	payload: newInspiration,
});
export function UpdateCharacter(action) {
	return (dispatch,getState) => {
		dispatch(action);
		var character =getState();
		console.log(character);
		var Datastore = require("nedb"),
			characters = new Datastore({ filename: "Characters.db" });
		characters.loadDatabase();
		characters.remove({ id: character.id }, { multi: true }, function (
			err,
			numRemoved
		) {});
		characters.insert(character);
	};
}
