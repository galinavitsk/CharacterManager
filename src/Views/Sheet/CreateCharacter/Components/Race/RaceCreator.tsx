import React, { useState } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => ({});

const RaceCreator = (props) => {
	const [races, setRaces] = useState([]);

	return (
		<>
			<div className="container">
				<div className="row">
				<Form style={{width:"100%"}}><Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control type="text" placeholder=" " />
					
					</Form.Group>
						<Form.Group >
							<Form.Label>Size</Form.Label>
							<Form.Control
								as="select"
								custom
							>
									<option>Tiny</option>
									<option>Small</option>
									<option>Medium</option>
									<option>Large</option>
									<option>Huge</option>
									<option>Gragantuan</option>
							</Form.Control>
						</Form.Group>
					</Form>
				</div>
			</div>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(RaceCreator);
