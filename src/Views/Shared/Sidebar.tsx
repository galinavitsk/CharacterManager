import * as React from "react";
import { Component } from "react";
import "./sidebar.css";
import LoadCompendium from "../../scripts/LoadCompendium";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUpload,
	faFileDownload,
	faDownload,
} from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export interface SideBarProps {}

export interface SideBarState {}

class SideBar extends React.Component<SideBarProps, SideBarState> {
	constructor(props) {
		super(props);
		this.openFileDialog = this.openFileDialog.bind(this);
	}
	fileListToArray(list) {
		const array = [];
		for (var i = 0; i < list.length; i++) {
			array.push(list.item(i));
		}
		return array;
	}
	openFileDialog() {
		document.getElementById("FileInput").click();
    }
    showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result)
          LoadCompendium(text);
        };
        reader.readAsText(e.target.files[0]);
      }
    
	render() {
		return (
			<div className="sidebar-nav">
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
				</ul>
				<ul style={{ marginTop: "auto", marginBottom: "50px" }}>
					<li>
						<div
							className="sidebarlink"
							onClick={() => {
								this.openFileDialog();
							}}
						>
							<input
								id="FileInput"
								className="FileInput"
								type="file"
								hidden
								onChange={(e)=>this.showFile(e)}
							/>
							<FontAwesomeIcon icon={faFileDownload} /> Import Compendium
						</div>
					</li>
					<li>
						<a href="">
							<FontAwesomeIcon icon={faUpload} /> Save Character
						</a>
					</li>
					<li>
						<a href="">
							<FontAwesomeIcon icon={faDownload} /> Load Character
						</a>
					</li>
				</ul>
			</div>
		);
	}
}

export default SideBar;
