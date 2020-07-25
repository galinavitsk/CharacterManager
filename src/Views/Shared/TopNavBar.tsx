import * as React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import './topnav.css';
 
class TopNavBar  extends React.Component {
    render() { 
        return ( 
        <div className="navbar navbar-default fixed-top top-nav sticky-top">
            
                 <div className="col-sm" style={{marginTop:"auto",marginBottom:"auto"}}>
            <h1>Character Manager</h1>
                    </div>
        <div className="col-sm" style={{marginTop:"auto",marginBottom:"auto"}} >
            <ul>
    
                <li>
                    <a href="">
                    <i className="fa fa-upload" aria-hidden="true"></i>
                    <FontAwesomeIcon icon={faUpload} /> Save Character</a>
                </li>
                <li>
                    <a href="" >
                        
                    <FontAwesomeIcon icon={faDownload} /> Load Character</a>
                </li>
            </ul>
        </div>       
    </div> );
    }
}
 
export default TopNavBar ;