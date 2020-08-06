import * as React from "react";
import { connect } from "react-redux";
import GetAbilityMod from "../../../../scripts/GetAbilityMod";
import "./BasicStatsCard.css";
import GetCharacterLevel from "../../../../scripts/GetCharacterLevel";

import GetProficiency from "../../../../scripts/GetProficiency";
import Overlay from "react-bootstrap/esm/Overlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { UpdateInspiration, UpdateCharacter } from "../../../../redux/actionCreators";
import { Guid } from "guid-typescript";
import { toast } from "react-toastify";

const mapStateToProps = (state) => {
	return {
		dexterity: state.abilityScores["Dexterity"],
		wisdom: state.abilityScores["Wisdom"],
		speed: state.race.speed,
		prof: state.proficiency,
		insp: state.inspiration,
		classes: state.classes,
		race: state.race,
		background: state.background,
		traits: state.traits,
	};
};

const mapDispatchToProps = (dispatch) => ({
  updateInspiration: (payload: number) => dispatch(UpdateCharacter(UpdateInspiration(payload))),
});

const BasicStatsCard = (props) => {
	const [showInspiration, setShowInspiration] = React.useState(false);
	const inspirationTarget = React.useRef(null);

	const [rolls, setRolls] = React.useState([]);

	const GetSpeed = () => {
		var values = { currentScore: 0, ProfAdded: false };
		values.currentScore = props.speed;
		return GetTraits(values, "speed");
	};
	const GetAC = () => {
		var values = { currentScore: 10, ProfAdded: false };
		return GetTraits(values, "ac");
	};
	const GetInitiative = () => {
		var values = {
			currentScore: GetAbilityMod(props.dexterity),
			ProfAdded: false,
		};
		return GetTraits(values, "initiative");
	};
	const GetPreception = () => {
		var values = { currentScore: 10, ProfAdded: false };
		return GetTraits(values, "preception");
	};
	const GetTraits = (values, needed) => {
		if (props.race != null) {
			values = GetModifiers(props.race, values, needed);
			if (props.race.traits != null) {
				props.race.traits.forEach((trait) => {
					values = GetModifiers(trait, values, needed);
				});
			}
		}
		if (props.classes != null) {
			props.classes.forEach((c) => {
				if (c.traits != null) {
					c.traits.forEach((trait) => {
						values = GetModifiers(trait, values, needed);
					});
				}
				if (c.subclass != null && c.subclass.traits != null) {
					c.subclass.traits.forEach((trait) => {
						values = GetModifiers(trait, values, needed);
					});
				}
			});
		}
		if (props.background != null) {
			if (props.background.traits != null) {
				props.background.traits.forEach((trait) => {
					values == GetModifiers(trait, values, needed);
				});
			}
		}
		if (props.traits != null) {
			props.traits.forEach((trait) => {
				values == GetModifiers(trait, values, needed);
			});
		}

		return values.currentScore;
	};
	const GetModifiers = (trait, values, needed) => {
		if (trait.modifiers != null) {
			trait.modifiers.forEach((modifier) => {
				if (modifier.category == "Bonus") {
					if (modifier.type == "Speed" && needed == "speed") {
						values = GetModifierValue(modifier, values);
					} else if (modifier.type == "Armor Class" && needed == "ac") {
						values = GetModifierValue(modifier, values);
					} else if (modifier.type == "Initiative" && needed == "initiative") {
						values = GetModifierValue(modifier, values);
					} else if (
						modifier.type == "Passive Preception" &&
						needed == "preception"
					) {
						values = GetModifierValue(modifier, values);
					}
				}
			});
		}
		return values;
	};
	const GetModifierValue = (modifier, values) => {
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
			values.currentScore += parseInt(modifier.value.toString().substr(1));
		} else if (modifier.value.includes("-")) {
			values.currentScore -= parseInt(modifier.value.toString().substr(1));
		}
		return values;
	};
	const GainInspiration = () => {
		props.updateInspiration(props.insp + 1);
		setShowInspiration(false);
	};
	const RollInspiration = () => {
		if (props.insp > 0) {
			props.updateInspiration(props.insp - 1);
			setShowInspiration(false);
			var rolled = Math.floor(Math.random() * 20) + 1;
			var roll = {
				id: Guid.create(),
				title: "Inspiration",
				message: rolled,
			};
			return toast(roll.title + " " + roll.message, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	return (
		<>
			<div className="card" style={{ textAlign: "center" }}>
				<div className="container">
					<div className="row">
						<div className="col-2">
							<div className="BasicStat">AC</div>
							<div id="ArmorClass">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 82.34 108.25"
									height="50px"
								>
									<g id="Layer_2" data-name="Layer 2">
										<g id="Capa_1" data-name="Capa 1">
											<path
												className="a"
												d="M78.23,4.32C75.47,2.62,53.49.5,41.17.5S6.87,2.62,4.11,4.32.5,7.08.5,10.69V65.91a36,36,0,0,0,1.06,6.37C3.26,77.38,12.18,88,24.29,97.34s15.07,10.41,16.88,10.41S46,106.68,58.05,97.34s21-20,22.73-25.06a36,36,0,0,0,1.06-6.37V10.69C81.84,7.08,81,6,78.23,4.32Z"
											/>
											<text
												className="b"
												transform="translate(10.77 60.36)"
												style={{ fontSize: "45px" }}
											>
												{GetAC() + GetAbilityMod(props.dexterity)}
											</text>
										</g>
									</g>
								</svg>
							</div>
						</div>
						<div className="col-3">
							<div className="BasicStat">Initiative</div>
							<div id="Initiative">
								<svg
									version="1.1"
									id="Layer_1"
									width="50"
									height="50"
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									viewBox="0 0 74 72"
								>
									<g>
										<rect className="a" width="74" height="72" />
									</g>
									<text
										transform="matrix(1 0 0 1 18.5325 46.2998)"
										className="b"
									>
										+ {GetInitiative()}
									</text>
								</svg>
							</div>
						</div>
						<div className="col-7">
							<div className="row">
								<div className="col-8 StatCube" style={{ textAlign: "left" }}>
									Speed
								</div>
								<div className="col-4 StatCube" style={{ textAlign: "right" }}>
									{GetSpeed()} feet
								</div>
							</div>
							<div className="row">
								<div className="col-8 StatCube" style={{ textAlign: "left" }}>
									Proficiency
								</div>
								<div className="col-4 StatCube" style={{ textAlign: "right" }}>
									+
									{GetProficiency(
										GetCharacterLevel(props.classes),
										props.race,
										props.classes,
										props.background,
										props.traits
									)}
								</div>
							</div>
							<div className="row">
								<div className="col-8 StatCube" style={{ textAlign: "left" }}>
									Passive Perception
								</div>
								<div className="col-4 StatCube" style={{ textAlign: "right" }}>
									{GetPreception()}
								</div>
							</div>
							<div className="row">
								<div className="col-8 StatCube" style={{ textAlign: "left" }}>
									Inspiration
								</div>
								<div
									className="col-4 StatCube"
									style={{ textAlign: "right" }}
									ref={inspirationTarget}
									onClick={() => setShowInspiration(!showInspiration)}
								>
									{props.insp}
								</div>
								<Overlay
									target={inspirationTarget.current}
									show={showInspiration}
									placement="right"
								>
									{({
										placement,
										arrowProps,
										show: show,
										popper,
										...props
									}) => (
										<div
											{...props}
											style={{
												backgroundColor: "#E9E7E1",
												padding: "2px 10px",
												color: "#86A4A8",
												boxShadow: "0px 3px 6px #00000029",
												border: " 1px solid #E4BDB4",
												borderRadius: 3,
												zIndex: 9999,
												...props.style,
											}}
										>
											<div className="container-fluid">
												<div
													className="row icon"
													style={{ fontSize: "12px" }}
													onClick={() => GainInspiration()}
												>
													<FontAwesomeIcon
														icon={faCaretUp}
														style={{ marginRight: "5px" }}
													/>{" "}
													Gain Inspiration
												</div>
												<div
													className="row icon"
													style={{ fontSize: "12px" }}
													onClick={() => RollInspiration()}
												>
													<FontAwesomeIcon
														icon={faCaretDown}
														style={{ marginRight: "5px" }}
													/>{" "}
													Spend Inspiration
												</div>
											</div>
										</div>
									)}
								</Overlay>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicStatsCard);
