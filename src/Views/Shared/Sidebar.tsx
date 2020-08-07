import * as React from "react";
import { Component } from "react";
import "./sidebar.css";
import ImportCompendium from "../../scripts/ImportCompendium";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUpload,
	faFileDownload,
	faDownload,
} from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {SaveCharacter} from "../../scripts/CharacterManipulation";
import { connect } from "react-redux";

const mapStateToProps = state => {
    if(state!=null){
    return {
        character:state
    };};
    return{};
  };
  
  const mapDispatchToProps = dispatch => ({
  })
const SideBar =(props)=>{

	const fileListToArray=(list) =>{
		const array = [];
		for (var i = 0; i < list.length; i++) {
			array.push(list.item(i));
		}
		return array;
	}
	const openFileDialog=()=> {
		document.getElementById("FileInput").click();
    }
    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result)
          ImportCompendium(text);
        };
        reader.readAsText(e.target.files[0]);
	
	}
		return (
			<div className="sidebar-nav">
				{props.character!=null?(
				<ul>
					<li className="nav-item">
						<Link to="/sheet">Sheet</Link>
					</li>
					<li className="nav-item">
						<Link to="/spells">Spells</Link>
					</li>
					<li className="nav-item">
						<Link to="/">Inventory</Link>
					</li>
					<li className="nav-item">
						<Link to="/">Lore</Link>
					</li>
				</ul>):null}
				<ul style={{ marginTop: "auto", marginBottom: "50px" }}>
					<li>
						<div
							className="sidebarlink"
							onClick={() => {openFileDialog.bind(this);
							}}
						>
							<input
								id="FileInput"
								className="FileInput"
								type="file"
								hidden
								onChange={(e)=>showFile(e)}
							/>
							<FontAwesomeIcon icon={faFileDownload} /> Import Compendium
						</div>
					</li>
					{props.character!=null ?(
					<li>
						<div
							className="sidebarlink"
							onClick={() => {
								SaveCharacter(props.character);
							}}
						>
							<FontAwesomeIcon icon={faUpload} /> Save Character
						</div>
					</li>):null}
					<li>
						<a href="">
							<FontAwesomeIcon icon={faDownload} /> Load Character
						</a>
					</li>
				</ul>
			</div>
		);
}

export default connect(mapStateToProps,mapDispatchToProps)(SideBar);
