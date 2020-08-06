import * as React from "react";
import { Component } from "react";
import CharacterCard from "./Components/CharacterCard/CharacterCard";
import HealthCard from "./Components/HealthCard/HealthCard";
import SkillsScoresCard from "./Components/SkillsScoresCard";
import BasicStatsCard from "./Components/BasicStats/BasicStatsCard";
import FeaturesTrait from "./Components/FeaturesTraitsCard/FeaturesTrait";
import Conditions from "./Components/ConditionsCard/Conditions";
import AbilityScoresCard from "./Components/AbilityScoresCard/AbilityScoresCard";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import {GetAllCharacters} from "../../scripts/CharacterManipulation";
import { Character } from "../../Data/Character";
import {LoadCharacter} from "../../redux/actionCreators"
import CreateCharacterIndex from "./CreateCharacter/CreateCharacterIndex";
const mapStateToProps = (state) => {
	return {
		character: state,
	};
};

const mapDispatchToProps = (dispatch) => ({

	loadCharacter: (payload: number) =>
		dispatch(LoadCharacter(payload)),
});

const Sheet = (props) => {
	const [characters, setCharacters] = React.useState([]);
	const [isEditCharacter,setIsEditCharacter]=React.useState(false);

	const displayCharacters = (result) => {
		var newCharacters: Character[] = [];
		result.map((c) => newCharacters.push(c));
		setCharacters(newCharacters);
	};
	
	return (
		<div className="container-fluid">
			{React.useEffect(() => {
							GetAllCharacters((result) => {
								displayCharacters(result);
							});
						}, [])}
			<div className="row" style={{ marginRight: "0px" }}>
				{isEditCharacter==false ? (props.character != null ? (
					<>
						<div className="col-6" style={{ margin: "0px", padding: "0px" }}>
							<CharacterCard />
							<HealthCard />
							<BasicStatsCard />
							<FeaturesTrait />
							<Conditions />
						</div>
						<div className="col-3" style={{ margin: "0px", padding: "0px" }}>
							<AbilityScoresCard />
						</div>
						<div className="col-3" style={{ margin: "0px", padding: "0px" }}>
							<SkillsScoresCard />
						</div>
						<ToastContainer />
					</>
				) : (
					
					<>
						
						{characters.map((c) => (
							<>
							<div className="card" onClick={()=>props.loadCharacter(c)}>
								<div className="container-fluid">
								<div className="row">
									<div id="characterAvatar">
										<img
											style={{ border: "1px solid #00000029" }}
											width="100"
											height="100"
											src={require('../../Resources/Letter2.jpg')}
										/>
									</div>
								</div>
								<div className="row">
									{c.name}
								</div>
								<div className="row" style={{fontSize:"6px"}}>
									{c.id.value}
								</div>
								</div>
							</div></>
						))}
						<div className="card" onClick={()=>setIsEditCharacter(true)}>
								<div className="container-fluid">
								<div className="row">
									<div id="characterAvatar">
										<img
											style={{ border: "1px solid #00000029" }}
											width="100"
											height="100"
											src={require('../../Resources/Letter2.jpg')}
										/>
									</div>
								</div>
								<div className="row">
									NEW
								</div>
								</div>
							</div>
					</>
				)
				):<CreateCharacterIndex/>}
			</div>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Sheet);
