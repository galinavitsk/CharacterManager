import { Character } from "../Data/Character";
import { Race } from "../Data/Race";
import * as types from "./types";
// Initial (starting) state

export const Naomi: Character = {
	name: "Naomi",
	race: {
		name: "Fallen Aassimar",
		Strength: 0,
		Dexterity: 0,
		Constitution: 0,
		Intelligence: 0,
		Wisdom: 0,
		Charisma: 0,
		size: "medium",
		speed: 30,
		Traits: [
			{
				name: "Darkvision",
				description: "You are able to see in the dark",
				proficiencies: null,
				modifiers: null,
				specialTraits: null,
			},
			{
				name: "Healing Hands",
				description:
					"Whatever Healing hands do. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
				proficiencies: null,
				modifiers: null,
				specialTraits: null,
			},
		],
	},
	classes: [
		{
			iD: 0,
			className: "Rogue",
      subclass: {
        subclassName:"Arcane Trickster", 
      traits:[{
        name: "Test Subclass Trait 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        proficiencies: null,
        modifiers: null,
        specialTraits: null,
      }]},
			classLevel: 4,
			hitDie: 8,
			currentHDie: 2,
			traits: [
				{
					name: "Test Class Trait",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					proficiencies: null,
					modifiers: null,
					specialTraits: null,
				},
				{
					name: "Test Class Trait 01",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					proficiencies: null,
					modifiers: null,
					specialTraits: null,
				},
			]
		},
		{
			iD: 1,
			className: "Rogue",
      subclass: {
        subclassName:"Arcane Trickster", 
      traits:[{
        name: "Test Subclass Trait 11",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        proficiencies: null,
        modifiers: null,
        specialTraits: null,
      }]},
			classLevel: 20,
			hitDie: 8,
      currentHDie: 5,
      traits: [
				{
					name: "Test Class Trait 11",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					proficiencies: null,
					modifiers: null,
					specialTraits: null,
				},
				{
					name: "Test Class Trait 12",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					proficiencies: null,
					modifiers: null,
					specialTraits: null,
				},
			]
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
      name: "Test General Trait 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      proficiencies: null,
      modifiers: null,
      specialTraits: null,
    },
    {
      name: "Test General Trait 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      proficiencies: null,
      modifiers: null,
      specialTraits: null,
    },
  ],
  background:{name:"Aclolyte",
  traits: [
    {
      name: "Test Background Trait 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      proficiencies: null,
      modifiers: null,
      specialTraits: null,
    },
    {
      name: "Test Background Trait 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      proficiencies: null,
      modifiers: null,
      specialTraits: null,
    },
  ] },
  conditions:[{
    name:"blind",
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  }],
  exhaustion:1,
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
					if (data.iD != action.iD) {
						return data;
					} else {
						return {
							iD: data.iD,
							className: data.className,
							subclass: data.subclass,
							classLevel: data.classLevel,
							hitDie: data.hitDie,
							currentHDie: action.payload,
						};
					}
				}),
			};

		default:
			return state;
	}
};
