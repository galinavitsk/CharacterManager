import * as React from "react";
import { Component } from "react";
import { Trait } from "../../../../../Data/Trait";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import GetAbilityMod from "../../../../../scripts/GetAbilityMod";

import GetCharacterLevel from "../../../../../scripts/GetCharacterLevel";

import GetProficiency from "../../../../../scripts/GetProficiency";

export interface ViewTraitProps {
	trait: Trait;
	onStartEditing: () => void;
	abilityScores: { [x: string]: number; };
	classes: import("../../../../../Data/Class").Class[];
}

export interface ViewTraitState {}

class ViewTrait extends React.Component<ViewTraitProps, ViewTraitState> {
	render() {
		return (
			<>
				<div className="row">
					<span style={{ fontSize: "16px" }}>
						{this.props.trait.description != null && this.props.trait.name}
					</span>
				</div>
				<hr />
				<div className="row" style={{ fontSize: "12px" }}>
					{this.props.trait.description != null && this.props.trait.description}
				</div>
				<hr />

				<div className="row" style={{ fontSize: "12px" }}>
					{this.props.trait.savingThrowsProf != null &&
						this.props.trait.savingThrowsProf.map((p) => (
							<>{p} Saving Throw, </>
						))}
					{this.props.trait.skillsProf != null &&
						this.props.trait.skillsProf.map((s) => <>{s}, </>)}
				</div>
				{this.props.trait.modifiers != null &&
					this.props.trait.modifiers.length >= 0 &&
					this.props.trait.modifiers.map((m) => (
						<>
							<hr />
							<div className="row" style={{ fontSize: "12px" }}>
								{m.name != null && m.name}
								{m.name == null && (
									<>
										{m.type} {m.value}
									</>
								)}
							</div>
						</>
					))}
				{this.props.trait.smallProf != null && <hr />}
				{this.props.trait.smallProf != null &&
					this.props.trait.smallProf.length >= 0 &&
					this.props.trait.smallProf.map((p) => (
						<>
							<div className="row" style={{ fontSize: "12px" }}>
								<div className="col-6 StatCubesmall">{p.type}</div>
								<div className="col-6 StatCubesmall">{p.prof}</div>
							</div>
						</>
					))}

				<hr />
				{this.props.trait.smallTools != null &&
					this.props.trait.smallTools.length >= 0 &&
					this.props.trait.smallTools.map((t) => (
						<>
							<div className="row" style={{ fontSize: "12px" }}>
								<div className="col-6 StatCubesmall">{t.name}</div>
								<div className="col-3 StatCubesmall">
									{
										<>
										
											{t.attribute == "Query" && <>?</>}
											{t.bonus == "Proficient" &&
												t.attribute != "Query" &&
												t.mods +
													GetAbilityMod(this.props.abilityScores[t.attribute]) +
													GetProficiency(GetCharacterLevel(this.props.classes))}
											{t.bonus == "Expertise" &&
												t.attribute != "Query" &&
												t.mods +
													GetAbilityMod(this.props.abilityScores[t.attribute]) +
													GetProficiency(
														GetCharacterLevel(this.props.classes)
													) +
													GetProficiency(GetCharacterLevel(this.props.classes))}
													{t.bonus == "Jack of All Trades" &&
												t.attribute != "Query" &&
												t.mods +
													GetAbilityMod(this.props.abilityScores[t.attribute]) +1}
										</>
									}
								</div>
								<div className="col-3 StatCubesmall">{t.attribute}</div>
							</div>
						</>
					))}
				<div className="row" style={{ float: "right" }}>
					<div
						className="icon"
						onClick={() => {
							this.props.onStartEditing();
						}}
					>
						<FontAwesomeIcon icon={faCog} />
					</div>
				</div>
			</>
		);
	}
}

export default ViewTrait;
