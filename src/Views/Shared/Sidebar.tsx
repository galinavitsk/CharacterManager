import * as React from 'react';
import { Component } from 'react';
import './sidebar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
export interface SideBarProps {
    
}
 
export interface SideBarState {
    
}
 
class SideBar extends React.Component<SideBarProps, SideBarState> {
 
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
        <ul style={{marginTop:"auto",marginBottom:"50px"}}>

        <li>
                    <a href="">
                    <FontAwesomeIcon icon={faUpload} /> Save Character</a>
                </li>
                <li>
                    <a href="" >
                        
                    <FontAwesomeIcon icon={faDownload} /> Load Character</a>
                </li>
        </ul>
        </div>
        );
    }
}
 
export default SideBar;