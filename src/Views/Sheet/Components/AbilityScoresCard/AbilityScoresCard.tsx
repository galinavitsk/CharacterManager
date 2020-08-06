import * as React from "react";
import { connect } from "react-redux";
import GetAbilityMod from "../../../../scripts/GetAbilityMod";
import GetCharacterLevel from "../../../../scripts/GetCharacterLevel";
import GetProficiency from "../../../../scripts/GetProficiency";
import { Guid } from "guid-typescript";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mapStateToProps = (state) => {
	return {
		abilityScores: state.abilityScores,
		race: state.race,
		classes: state.classes,
		background: state.background,
		traits: state.traits,
	};
};

const mapDispatchToProps = (dispatch) => ({});

const AbilityScoresCard = (props) => {
	const [rolls, setRolls] = React.useState([]);

	const GetAbilityScore = (ability) => {
		var values = { currentScore: 0, ProfAdded: false };
		values.currentScore = props.abilityScores[ability];
		if (props.race != null) {
			values=GetModifiers(props.race,values,ability,"score");
			if (props.race.traits != null) {
				props.race.traits.forEach((trait) => {
					values = GetModifiers(trait, values, ability, "score");
				});
			}
		}
		if (props.classes != null) {
			props.classes.forEach((c) => {
				if (c.traits != null) {
					c.traits.forEach((trait) => {
						values = GetModifiers(trait, values, ability, "score");
					});
				}
				if (c.subclass != null && c.subclass.traits != null) {
					c.subclass.traits.forEach((trait) => {
						values = GetModifiers(trait, values, ability, "score");
					});
				}
			});
		}
		if (props.background != null) {
			if (props.background.traits != null) {
				props.background.traits.forEach((trait) => {
					values == GetModifiers(trait, values, ability, "score");
				});
			}
		}
		if (props.traits != null) {
			props.traits.forEach((trait) => {
				values == GetModifiers(trait, values, ability, "score");
			});
		}

		return values.currentScore;
	};

	const GetAbilityModifier = (ability) => {
		var values = { currentScore: 0, ProfAdded: false };
		values.currentScore = GetAbilityMod(props.abilityScores[ability]);
		if (props.race != null) {
			values=GetModifiers(props.race,values,ability,"mod");
			if (props.race.traits != null) {
				props.race.traits.forEach((trait) => {
					values = GetModifiers(trait, values, ability, "mod");
				});
			}
		}
		if (props.classes != null) {
			props.classes.forEach((c) => {
				if (c.traits != null) {
					c.traits.forEach((trait) => {
						values = GetModifiers(trait, values, ability, "mod");
					});
				}
				if (c.subclass != null && c.subclass.traits != null) {
					c.subclass.traits.forEach((trait) => {
						values = GetModifiers(trait, values, ability, "mod");
					});
				}
			});
		}
		if (props.background != null) {
			if (props.background.traits != null) {
				props.background.traits.forEach((trait) => {
					values == GetModifiers(trait, values, ability, "mod");
				});
			}
		}
		if (props.traits != null) {
			props.traits.forEach((trait) => {
				values == GetModifiers(trait, values, ability, "mod");
			});
		}

		return values.currentScore;
	};

	const GetSavingThrow = (ability) => {
		var values = { currentScore: 0, ProfAdded: false };
		values.currentScore = GetAbilityMod(props.abilityScores[ability]);
		if (props.race != null) {
			values=GetModifiers(props.race,values,ability,"save");
			if (props.race.traits != null) {
				props.race.traits.forEach((trait) => {
					values = GetModifiers(trait, values, ability, "save");
				});
			}
		}
		if (props.classes != null) {
			props.classes.forEach((c) => {
				if (c.traits != null) {
					c.traits.forEach((trait) => {
						values = GetModifiers(trait, values, ability, "save");
					});
				}
				if (c.subclass != null && c.subclass.traits != null) {
					c.subclass.traits.forEach((trait) => {
						values = GetModifiers(trait, values, ability, "save");
					});
				}
			});
		}
		if (props.background != null) {
			if (props.background.traits != null) {
				props.background.traits.forEach((trait) => {
					values == GetModifiers(trait, values, ability, "save");
				});
			}
		}
		if (props.traits != null) {
			props.traits.forEach((trait) => {
				values == GetModifiers(trait, values, ability, "save");
			});
		}

		return values.currentScore;
	};

	const GetModifiers = (trait, values, ability, needed) => {
		if (trait.modifiers != null) {
			trait.modifiers.forEach((modifier) => {
				if (modifier.category == "Ability Score" && needed == "score") {
					if (modifier.type == ability) {
						if (modifier.value == "+Proficiency Bonus") {
							if (values.ProfAdded == false) {
								values.currentScore += GetProficiency(
									GetCharacterLevel(props.classes),
									props.race,
									props.classes,
									props.background,
									props.traits
								);
								values.ProfAdded = true;
							}
						} else if (modifier.value.includes("+")) {
							values.currentScore += parseInt(
								modifier.value.toString().substr(1)
							);
						} else if (modifier.value.includes("-")) {
							values.currentScore -= parseInt(
								modifier.value.toString().substr(1)
							);
						}
					}
				}
				if (modifier.category == "Ability Modifier" && needed == "mod") {
					if (modifier.type == ability) {
						if (modifier.value == "+Proficiency Bonus") {
							if (values.ProfAdded == false) {
								values.currentScore += GetProficiency(
									GetCharacterLevel(props.classes),
									props.race,
									props.classes,
									props.background,
									props.traits
								);
								values.ProfAdded = true;
							}
						} else if (modifier.value.includes("+")) {
							values.currentScore += parseInt(
								modifier.value.toString().substr(1)
							);
						} else if (modifier.value.includes("-")) {
							values.currentScore -= parseInt(
								modifier.value.toString().substr(1)
							);
						}
					}
				}
				if (modifier.category == "Saving Throw" && needed == "save") {
					if (modifier.type == ability) {
						if (modifier.value == "+Proficiency Bonus") {
							if (values.ProfAdded == false) {
								values.currentScore += GetProficiency(
									GetCharacterLevel(props.classes),
									props.race,
									props.classes,
									props.background,
									props.traits
								);
								values.ProfAdded = true;
							}
						} else if (modifier.value.includes("+")) {
							values.currentScore += parseInt(
								modifier.value.toString().substr(1)
							);
						} else if (modifier.value.includes("-")) {
							values.currentScore -= parseInt(
								modifier.value.toString().substr(1)
							);
						}
					}
				}
			});
		}
		return values;
	};

	const RollSavingThrow = (ability) => {
		var rolled = Math.floor(Math.random() * 20) + 1;
		var total = rolled + GetSavingThrow(ability);
		var roll = {
			id: Guid.create(),
			title: ability + " Saving Throw",
			message: total + "=" + rolled + "+" + GetSavingThrow(ability),
		};
		return(toast(roll.title+" " + roll.message, {
			position: 'bottom-right',
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined
			}));
	};
	return (
		<>
			
			<div className="card" style={{ textAlign: "center" }}>
				<div className="container">
					<div className="row">Ability Scores</div>
					<div className="row">
						<div className="col-2" style={{ fontSize: "10px", padding: "0px" }}>
							Score
						</div>
						<div className="col-6" style={{ fontSize: "10px", padding: "0px" }}>
							Ability
						</div>
						<div className="col-2" style={{ fontSize: "10px", padding: "0px" }}>
							Mod
						</div>
						<div className="col-2" style={{ fontSize: "10px", padding: "0px" }}>
							Save
						</div>
					</div>
					{Object.keys(props.abilityScores).map((key) => (
						<div className="row">
							<div className="col-2 StatCubesmall" style={{ padding: "0px" }}>
								{GetAbilityScore(key)}
							</div>
							<div className="col-6 StatCubesmall" style={{ padding: "0px" }}>
								{key}
							</div>
							<div className="col-2 StatCubesmall" style={{ padding: "0px" }}>
								+{GetAbilityModifier(key)}
							</div>
							<div
								className="col-2 StatCubesmall"
								style={{ padding: "0px" }}
								onClick={() => {
									RollSavingThrow(key);
								}}
							>
								+{GetSavingThrow(key)}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(AbilityScoresCard);
