import React, { Component } from "react";
import {Fragment} from 'react';
import { scaleRotate as Menu } from "react-burger-menu";
import Searchbar from './Searchbar'

// export default props => {
class Sidebar extends Component {
  state={
    info: Sidebar
  }

  render(){
  return (
    // Pass on our props
    <Fragment>
        <div className="head-div">
        {/* <Searchbar /> */}
        </div>
    <Menu>

      <a className="menu-item" href="/">Home</a>

      <a className="menu-item" href="/random">Random</a>
      
        {this.props.emailID === null ?
             
        <Fragment>
            <a className="bm-item  menu-item" href="/sign-up">Sign Up</a>
            <a className="bm-item menu-item" href="/log-in">Log In</a>
        </Fragment>
        
        :
       
        <Fragment>
            <a className="bm-item menu-item" href="/profile">My Profile</a>
            <a className="bm-item menu-item" href="/log-out" onClick={this.props.actionLogout}>Log Out</a>
        </Fragment>
      
        }
      
      
      <br></br>
      
      {/* <Searchbar /> */}
      
    </Menu>
    </Fragment>
  )};
}
export default Sidebar;