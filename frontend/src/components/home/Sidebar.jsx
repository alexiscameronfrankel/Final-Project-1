import React, { Fragment } from "react";
import { scaleRotate as Menu } from "react-burger-menu";
import Searchbar from './Searchbar'

export default props => {
  return (
    // Pass on our props
    <Menu {...props}>

      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/random">
        Random
      </a>
      
      {props.email ?
        <Fragment>
      <a className="bm-item menu-item" href="/profile">
        My Profile
      </a>
      <a className="bm-item menu-item" href="/log-out">
        Log Out
      </a>
      </Fragment>
      :
      <Fragment>

      <a className="bm-item  menu-item" href="/sign-up">
       Sign Up
       
      </a>

      <a className="bm-item menu-item" href="/log-in">
        Log In
      </a>
      </Fragment>
      }
      
      <br></br>
      
      <Searchbar />
      
    </Menu>
  );
};