import * as React from 'react';
import { Component } from 'react';
import './sidebar.css';

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
        </div>
        );
    }
}
 
export default SideBar;