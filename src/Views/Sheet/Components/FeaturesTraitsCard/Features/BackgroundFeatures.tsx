import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import "../featurestraits.css";
import {
	faChevronDown,
	faChevronLeft,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/esm/Modal";
import TraitModal from "../TraitModal";

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => ({

});
const BackgroundFeatures = (props) => {
	const [isOpen, setIsOpen] = React.useState(false);
    const [trait, setTrait] = React.useState(null);
    const [expanded,setExpanded]=React.useState(null);
	const [type, setType] = React.useState(null);
	const openTraitModal = (t,ty) => {
		setType(ty);
		setTrait(t);
		setIsOpen(true);
	};
	return (
		<>
			
                
                {expanded ? (
                    <><div
                    className="row StatCube"
                    style={{background:"#E4BDB4"}}
                    onClick={() => {
                        setExpanded(false)
                    }}
                ><div className="col-10">  {props.trait.name} </div>
                <div className="col-2" style={{float:"right", textAlign:"right"}}><div className="icon">
               <FontAwesomeIcon icon={faChevronDown} /></div> 
           </div></div>
                    <div className="row StatCubesmall">
                    {props.trait.description}<p></p>
                    <div className="icon"  onClick={()=>{openTraitModal(props.trait,"background")}}>
               <FontAwesomeIcon icon={faInfoCircle} /></div> 
                </div></>
                ):<div
				className="row StatCube"
				onClick={() => {
					setExpanded(true)
				}}
			><div className="col-10">  {props.trait.name} </div>
             <div className="col-2" style={{float:"right", textAlign:"right"}}><div className="icon">
            <FontAwesomeIcon icon={faChevronLeft} /></div> 
        </div></div>}

			<Modal
				show={isOpen}
				size="sm"
				onHide={() => setIsOpen(false)}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Body bsPrefix="modalContentCard">
					<TraitModal trait={trait} type={type} />
				</Modal.Body>
			</Modal>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundFeatures);
