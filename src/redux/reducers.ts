import { Character } from "../Data/Character";
import { Race } from "../Data/Race";
import * as types from "./types";
import { Guid } from "guid-typescript";
// Initial (starting) state

export const Naomi: Character = {
	id: Guid.create(),
	name: "Naomi",
	race: {
		id: Guid.create(),
		name: "Fallen Aassimar",

		abilityScores: {
			["Strength"]: 2,
			["Dexterity"]: 3,
			["Constitution"]: -4,
			["Intelligence"]: 1,
			["Wisdom"]: 1,
			["Charisma"]: 0,
		},
		size: "medium",
		speed: 30,
		traits: [
			{
				id: Guid.create(),
				name: "Darkvision",
				description: "You are able to see in the dark",
				savingThrowsProf: null,
				skillsProf: null,
				modifiers: null,

				smallProf: [{ id: Guid.create(), prof: "Shortword", type: "Weapon" }],
				smallTools: [
					{
						id: Guid.create(),
						name: "Test Tool",
						bonus: "Proficient",
						attribute: "Strength",
						mods: 0,
					},
				],
			},
			{
				id: Guid.create(),
				name: "Healing Hands",
				description:
					"Whatever Healing hands do. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
				savingThrowsProf: null,
				skillsProf: null,
				modifiers: null,

				smallProf: [{ id: Guid.create(), prof: "Shortword", type: "Weapon" }],
				smallTools: [
					{
						id: Guid.create(),
						name: "Test Tool",
						bonus: "Proficient",
						attribute: "Strength",
						mods: 0,
					},
				],
			},
		],
	},
	classes: [
		{
			id: Guid.create(),
			className: "Rogue",
			subclass: {
				id: Guid.create(),
				subclassName: "Arcane Trickster",
				traits: [
					{
						id: Guid.create(),
						name: "Test Subclass Trait 1",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
						savingThrowsProf: ["Strength", "Constitution"],
						skillsProf: ["Acrobatics"],
						modifiers: null,
						smallProf: [
							{ id: Guid.create(), prof: "Shortword", type: "Weapon" },
						],
						smallTools: [
							{
								id: Guid.create(),
								name: "Test Tool",
								bonus: "Proficient",
								attribute: "Strength",
								mods: 0,
							},
						],
					},
				],
			},
			classLevel: 4,
			hitDie: 8,
			currentHDie: 2,
			traits: [
				{
					id: Guid.create(),
					name: "Test Class Trait",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					savingThrowsProf: null,

					skillsProf: null,
					modifiers: null,

					smallProf: [{ id: Guid.create(), prof: "Shortword", type: "Weapon" }],
					smallTools: [
						{
							id: Guid.create(),
							name: "Test Tool",
							bonus: "Proficient",
							attribute: "Strength",
							mods: 0,
						},
					],
				},
				{
					id: Guid.create(),
					name: "Test Class Trait 01",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					savingThrowsProf: null,

					skillsProf: null,
					modifiers: null,

					smallProf: [{ id: Guid.create(), prof: "Shortword", type: "Weapon" }],
					smallTools: [
						{
							id: Guid.create(),
							name: "Test Tool",
							bonus: "Proficient",
							attribute: "Strength",
							mods: 0,
						},
					],
				},
			],
		},
		{
			id: Guid.create(),
			className: "Rogue",
			subclass: {
				id: Guid.create(),
				subclassName: "Arcane Trickster",
				traits: [
					{
						id: Guid.create(),
						name: "Test Subclass Trait 11",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
						savingThrowsProf: null,

						skillsProf: null,
						modifiers: null,
						smallProf: [
							{ id: Guid.create(), prof: "Shortword", type: "Weapon" },
						],
						smallTools: [
							{
								id: Guid.create(),
								name: "Test Tool",
								bonus: "Proficient",
								attribute: "Strength",
								mods: 0,
							},
						],
					},
				],
			},
			classLevel: 20,
			hitDie: 8,
			currentHDie: 5,
			traits: [
				{
					id: Guid.create(),
					name: "Test Class Trait 11",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					savingThrowsProf: null,

					skillsProf: null,
					modifiers: null,
					smallProf: [{ id: Guid.create(), prof: "Shortword", type: "Weapon" }],
					smallTools: [
						{
							id: Guid.create(),
							name: "Test Tool",
							bonus: "Proficient",
							attribute: "Strength",
							mods: 0,
						},
					],
				},
				{
					id: Guid.create(),
					name: "Test Class Trait 12",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					savingThrowsProf: null,

					skillsProf: null,
					modifiers: null,
					smallProf: [{ id: Guid.create(), prof: "Shortword", type: "Weapon" }],
					smallTools: [
						{
							id: Guid.create(),
							name: "Test Tool",
							bonus: "Proficient",
							attribute: "Strength",
							mods: 0,
						},
					],
				},
			],
		},
	],
	abilityScores: {
		["Strength"]: 20,
		["Dexterity"]: 20,
		["Constitution"]: 20,
		["Intelligence"]: 20,
		["Wisdom"]: 20,
		["Charisma"]: 20,
	},
	acbonus: 0,
	maxHealth: 120,
	currentHealth: 100,
	tempHealth: 10,
	inspiration: 0,
	traits: [
		{
			id: Guid.create(),
			name: "Test General Trait 1",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			savingThrowsProf: ["Strength", "Constitution"],
			skillsProf: ["Acrobatics"],
			modifiers: [
				{
					id: Guid.create(),
					name: null,
					category: "Bonus",
					type: "Weapon Attacks",
					value: "-2",
				},
			],

			smallProf: [{ id: Guid.create(), prof: "Shortword", type: "Weapon" }],
			smallTools: [
				{
					id: Guid.create(),
					name: "Test Tool",
					bonus: "Proficient",
					attribute: "Strength",
					mods: 0,
				},
			],
		},
		{
			id: Guid.create(),
			name: "Test General Trait 2",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			savingThrowsProf: null,

			skillsProf: null,
			modifiers: [
				{
					id: Guid.create(),
					name: "Bonus:Proficiency",
					category: "Bonus",
					type: "Proficiency Bonus",
					value: "+4",
				},
			],

			smallProf: [{ id: Guid.create(), prof: "Shortword", type: "Weapon" }],
			smallTools: [
				{
					id: Guid.create(),
					name: "Test Tool",
					bonus: "Proficient",
					attribute: "Strength",
					mods: 0,
				},
			],
		},
	],
	background: {
		id: Guid.create(),
		name: "Aclolyte",
		traits: [
			{
				id: Guid.create(),
				name: "Test Background Trait 1",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
				savingThrowsProf: null,
				skillsProf: null,
				modifiers: null,

				smallProf: [{ id: Guid.create(), prof: "Shortword", type: "Weapon" }],
				smallTools: [
					{
						id: Guid.create(),
						name: "Test Tool",
						bonus: "Proficient",
						attribute: "Strength",
						mods: 0,
					},
				],
			},
			{
				id: Guid.create(),
				name: "Test Background Trait 2",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
				savingThrowsProf: null,
				skillsProf: null,
				modifiers: null,

				smallProf: [{ id: Guid.create(), prof: "Shortword", type: "Weapon" }],
				smallTools: [
					{
						id: Guid.create(),
						name: "Test Tool",
						bonus: "Proficient",
						attribute: "Strength",
						mods: 0,
					},
				],
			},
		],
	},
	conditions: [
		{
			id: Guid.create(),
			name: "blind",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
		},
	],
	exhaustion: 1,

	smallProf: [{ id: Guid.create(), prof: "Shortword", type: "Weapon" }],
	smallTools: [
		{
			id: Guid.create(),
			name: "Test Tool",
			bonus: "Proficient",
			attribute: "Str",
			mods: 0,
		},
	],
};

// Our root reducer starts with the initial state
// and must return a representation of the next state
export const rootReducer = (state = Naomi, action) => {
	switch (action.type) {
		case types.UPDATE_CURRENT_HEALTH:
			return { ...state, currentHealth: action.payload };
		case types.UPDATE_TEMP_HEALTH:
			return { ...state, tempHealth: action.payload };
		case types.UPDATE_CLASS_CURRENT_HIT_DICE:
			return {
				...state,
				classes: state.classes.map((data) => {
					if (data.id != action.id) {
						return data;
					} else {
						return {
							id: data.id,
							className: data.className,
							subclass: data.subclass,
							classLevel: data.classLevel,
							hitDie: data.hitDie,
							currentHDie: action.payload,
							traits: data.traits,
						};
					}
				}),
			};
		case types.MODIFY_TRAITS:
			switch (action.location) {
				case "racial":
					return { ...state, race: { ...state.race, traits: [...action.payload] } };
					break;
				case "background":
					return {
						...state,
						background: { ...state.background, traits: [...action.payload] },
					};
					break;
				case "other":
					return { ...state, traits: [...action.payload] };
					break;
				default:
					return { ...state };
					break;
			}
		case types.UPDATE_CLASS_TRAIT:
			return {
				...state,
				classes: state.classes.map((data) => {
					if (data.id != action.id) {
						return data;
					} else {
						console.log(action.payload);
						return {
							id: data.id,
							className: data.className,
							subclass: data.subclass,
							classLevel: data.classLevel,
							hitDie: data.hitDie,
							currentHDie: data.currentHDie,
							traits: action.payload,
						};
					}
				}),
			};
		case types.UPDATE_SUBCLASS_TRAIT:
			return {
				...state,
				classes: state.classes.map((data) => {
					console.log(data);
					if (data.subclass.id != action.id) {
						return data;
					} else {
						console.log(action.payload);
						return {
							...data,
							subclass: {
								id: data.subclass.id,
								subclassName: data.subclass.subclassName,
								traits: action.payload,
							},
						};
					}
				}),
			};

		default:
			return state;
	}
};
