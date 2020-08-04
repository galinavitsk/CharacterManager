import { Guid } from "guid-typescript";
export interface Modifier {
	id: Guid;
	name: string;
	category: string;
	type: string;
	value: string;
}

export function GetModifierCategories() {
	return [
		"Bonus",
		"Ability Score",
		"Ability Modifier",
		"Saving Throw",
		"Skill",
	];
}
export function GetModifierType(category: string) {
	switch (category) {
		case "Bonus":
			return [
				"Proficiency Bonus",
				"Weapon Attacks",
				"Weapon Damage",
				"Melee Attacks",
				"Melee Damage",
			];
		case "Ability Score":
			return [
				"Strength",
				"Dexterity",
				"Constitution",
				"Intelligence",
				"Wisdom",
				"Charisma",
			];
		case "Ability Modifier":
			return [
				"Strength",
				"Dexterity",
				"Constitution",
				"Intelligence",
				"Wisdom",
				"Charisma",
			];
		case "Saving Throw":
			return [
				"Strength",
				"Dexterity",
				"Constitution",
				"Intelligence",
				"Wisdom",
				"Charisma",
			];
		case "Skill":
			return [
				"Acrobatics",
				"Animal Handling",
				"Arcana",
				"Athetics",
				"Deception",
				"History",
				"Insight",
				"Intimidation",
				"Medicine",
				"Nature",
				"Perception",
				"Performance",
				"Persuasion",
				"Religion",
				"Sleight of Hand",
				"Stealth",
				"Survival",
			];
		default:
			return null;
	}
	return null;
}

export function GetModifierValues(category) {
	var values: string[] = [];
	for (let index = 100; index > 0; index--) {
		values.push("-" + index.toString());
	}
	values.push("+Proficiency Bonus");
	if (category == "Skill") {
		values.push("Expertise");
	}
	for (let index = 0; index < 101; index++) {
		values.push("+" + index.toString());
	}
	return values;
}
