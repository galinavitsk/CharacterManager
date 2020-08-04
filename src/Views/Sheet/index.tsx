import * as React from "react";
import { Component } from "react";
import CharacterCard from "./Components/CharacterCard/CharacterCard";
import { Character } from "../../Data/Character";
import HealthCard from "./Components/HealthCard/HealthCard";
import SkillsScoresCard from "./Components/SkillsScoresCard";
import BasicStatsCard from "./Components/BasicStats/BasicStatsCard";
import FeaturesTrait from "./Components/FeaturesTraitsCard/FeaturesTrait";
import Conditions from "./Components/ConditionsCard/Conditions";
import AbilityScoresCard from "./Components/AbilityScoresCard/AbilityScoresCard";
import { ToastContainer } from "react-toastify";
export interface SheetProps {}

export interface SheetState {}

class Sheet extends React.Component<SheetProps, SheetState> {
	render() {
		return (
			<div className="container-fluid">
				<div className="row" style={{ marginRight: "0px" }}>
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
					{/* Same as */}
					<ToastContainer />
				</div>
			</div>
		);
	}
}

export default Sheet;
