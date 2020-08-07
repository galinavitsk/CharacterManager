import React, { useState } from "react";
import { connect } from "react-redux";
import {
	faSave,
	faTimes,
	faPlusCircle,
	faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RaceCreator from "./RaceCreator";
import SaveToCompendium from "../../../../../scripts/SaveToCompendium";
import { LoadRaces } from "../../../../../scripts/LoadCompendium";
import { Race } from "../../../../../Data/Race";
import { Guid } from "guid-typescript";
import {ContentState, EditorState} from 'draft-js';


const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => ({});

const ChooseRace = (props) => {
	const [isEditing, setIsEditing] = React.useState(false);
	const [isNew, setIsNew] = React.useState(false);
	const [races, setRaces] = React.useState([]);
	const [currentSelected, setCurrentlySelecter] = React.useState(null);
	const [editingRace, setEditingRace] = React.useState(false);
	const [raceId, setRaceId] = React.useState(null);
	const [raceName, setRaceName] = React.useState("");
	const [raceDescription, setRaceDescription] = React.useState(EditorState.createEmpty());
	const [raceSize, setRaceSize] = React.useState("Medium");
	const [raceSpeed, setRaceSpeed] = React.useState(30);
	const [raceModifiers, setRaceModifiers] = React.useState([]);
	const [raceTraits, setRaceTraits] = React.useState([]);

	const handleNameChange = (e: any) => {
		setRaceName(e.target.value);
	};
	const handleDescriptionChange = (e: any) => {
		setRaceDescription(e.target.editorState);
	};
	const handleSizeChange = (e: any) => {
		setRaceSize(e.target.value);
	};
	const handleSpeedChange = (e: any) => {
		setRaceSpeed(e.target.value);
	};
	const DoNotAddRaceToCompendium = () => {
		let race = {
			id: Guid.create(),
			name: raceName,
			description: raceDescription,
			modifiers: [...raceModifiers],
			size: raceSize,
			speed: raceSpeed,
			traits: [...raceTraits],
		};
		setEditingRace(false);
		props.onSetRace(race);
		setRaceId(null);
		setRaceName("");
		setRaceDescription("");
		setRaceModifiers([]);
		setRaceSize("Medium");
		setRaceSpeed(30);
		setRaceTraits([]);
	};
	const AddRaceToCompendium = () => {
		var setId;
		if (raceId != null) {
			setId = raceId;
		} else {
			setId = Guid.create();
		}
		let race = {
			id: setId,
			name: raceName,
			description: raceDescription,
			modifiers: [...raceModifiers],
			size: raceSize,
			speed: raceSpeed,
			traits: [...raceTraits],
		};
		setEditingRace(false);
		props.onSetRace(race);
		SaveToCompendium(race,()=>{LoadRaces((result) => {
			console.log("TEST");
			console.log(result);
			DisplayRaces(result);
		})});
		setCurrentlySelecter(race);
		setRaceId(null);
		setRaceName("");
		setRaceDescription("");
		setRaceModifiers([]);
		setRaceSize("Medium");
		setRaceSpeed(30);
		setRaceTraits([]);
	};
	const DisplayRaces = (result) => {
		var newRaces: Race[] = [];
		result.map((r) => newRaces.push(r));
		setRaces(newRaces.sort());
	};
	const openRaceEditor = () => {
		setRaceId(currentSelected.id);
		setRaceName(currentSelected.name);
		if (currentSelected.description) {
			var contentStateDesription = EditorState.createWithContent(ContentState.createFromText(currentSelected.description))
			setRaceDescription(contentStateDesription);
		}
		setRaceSize(currentSelected.size);
		setRaceSpeed(currentSelected.speed);
		setRaceModifiers(currentSelected.modifiers);
		setRaceTraits(currentSelected.traits);
		setIsEditing(true);
		setEditingRace(true);
	};

	return (
		<>
			<div className="card" style={{ width: "100%" }}>
				<div className="container">
					{React.useEffect(() => {
						LoadRaces((result) => {
							DisplayRaces(result);
						});
					}, [])}
					{editingRace ? (
						<RaceCreator
							isEditing={isEditing}
							isNew={isNew}
							name={raceName}
							handleNameChange={handleNameChange}
							description={raceDescription}
							handleDescriptionChange={handleDescriptionChange}
							size={raceSize}
							handleSizeChange={handleSizeChange}
							speed={raceSpeed}
							handleSpeedChange={handleSpeedChange}
							modifiers={raceModifiers}
							setRaceModifiers={setRaceModifiers}
							traits={raceTraits}
							setRaceTraits={setRaceTraits}
							onStopEdit={() => setEditingRace(false)}
							DoNotAddRaceToCompendium={DoNotAddRaceToCompendium}
							AddRaceToCompendium={AddRaceToCompendium}
						/>
					) : (
						<>
							<div className="row">
								<div className="col-6 icon" onClick={() => props.onCancel()}>
									<FontAwesomeIcon icon={faTimes} />
								</div>
							</div>
							<div className="row">
								<div className="col-3">
									{races.map((race) => (
										<div
											className="raceName icon"
											onClick={() => setCurrentlySelecter(race)}
										>
											{race.name}
										</div>
									))}
								</div>
								<div className="verticalDivider" />
								<div className="col-6">
									{currentSelected != null && (
										<>
											{currentSelected.name}
											<span
												className="icon"
												style={{
													justifyContent: "center",
													alignItems: "center",
												}}
												onClick={() => openRaceEditor()}
											>
												<FontAwesomeIcon
													icon={faEdit}
													style={{ marginLeft: "10px" }}
												/>
											</span>
											<hr />
											<div style={{ fontSize: "12px" }}>
												<strong>Size:</strong> {currentSelected.size}
												<br />
												<strong>Speed: </strong>
												{currentSelected.speed} feet
												<hr/>
												{currentSelected.description}
												<hr/>
												<strong>Modifiers</strong>
											</div>
										</>
									)}
								</div>
							</div>
							<div
								className="row icon"
								style={{ justifyContent: "center", alignItems: "center" }}
								onClick={() => {
									setIsNew(true);
									setEditingRace(true);
								}}
							>
								<FontAwesomeIcon
									icon={faPlusCircle}
									style={{ marginRight: "10px" }}
								/>
								Create New Race
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseRace);
