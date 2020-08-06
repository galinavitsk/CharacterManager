import React, { useState } from "react";
import { connect } from "react-redux";
import { faSave, faTimes, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RaceCreator from "./RaceCreator";

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => ({});

const ChooseRace = (props) => {
  const [races, setRaces] = React.useState([]);
  const[currentSelected,setCurrentlySelecter]=React.useState(null);
  const [creatingNewRace,setCreatingNewRace]=React.useState(false)

	return (
		<>
			<div className="card" style={{ width: "100%" }}>
				<div className="container">
          {creatingNewRace ? <RaceCreator/>:(<>
					<div className="row">
						<div className="col-6 icon">
							<FontAwesomeIcon icon={faTimes} />
						</div>
						<div className="col-6 icon" style={{ textAlign: "right" }}>
							<FontAwesomeIcon icon={faSave} />
						</div>
					</div>
					<div className="row">
						<div className="col-2">{races.map((race) => race.name)}</div>
					</div>
					<div className="row icon" style={{justifyContent:"center",alignItems:"center"}} onClick={()=>setCreatingNewRace(true)}>
            
							<FontAwesomeIcon icon={faPlusCircle} style={{marginRight:"10px"}}/>Create New Race
          </div>
          </>)}
				</div>
			</div>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseRace);
