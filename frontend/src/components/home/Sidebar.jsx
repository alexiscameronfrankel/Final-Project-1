import React, { Component } from "react";
import {Fragment} from 'react';
import { scaleRotate as Menu } from "react-burger-menu";
import Searchbar from './Searchbar'

export default props => {
// class Sidebar extends Component {
//   state={
//     info: Sidebar
//   }

console.log(props)

  return (
    // Pass on our props
    <Fragment>
        <div className="head-div">
        <Searchbar />
        </div>
    
    <Menu {...props} >

      <a className="menu-item" href="/">Home</a>

      
        {props.emailID === null ?
             
        <Fragment>
            <a className="bm-item  menu-item" href="/sign-up">Sign Up</a>
            <br></br>
            <a className="bm-item menu-item" href="/log-in">Log In</a>
        </Fragment>
        
        :
       
        <Fragment>
            <a className="bm-item menu-item" href="/profile">My Profile</a>
            <br></br>
            <a className="bm-item menu-item" href="/log-out" onClick={props.actionLogout}>Log Out</a>
        </Fragment>
      
        }
      <a className="menu-item" href="/random">
        Random
      </a>

      <a className="menu-item" href="/new-recipe">
        New Recipe
      </a>
      
      <a className="menu-item" href="/allrecipes">
        All Recipes
      </a>
      
      <br></br>
      
      {/* <Searchbar /> */}
      
    </Menu>
    </Fragment>
  )};
    
