import React, { useState } from "react";
import { connect } from "react-redux";
import ChooseRace from "./Components/Race/ChooseRace";

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => ({});

const CreateCharacterIndex = (props) => {
	const [racePicker, setRacePicker] = useState(false);
	const [race, setRace] = useState(null);

	return (
		<>
			{racePicker ? (
				<ChooseRace
					onCancel={() => setRacePicker(false)}
					onSetRace={(race) => setRace(race)}
				/>
			) : (
				<div
					className="card"
					style={{ width: "100%" }}
					onClick={() => setRacePicker(true)}
				>
					1-Choose Race
					{race != null && <>: {race.name}</>}
				</div>
			)}
		</>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateCharacterIndex);
