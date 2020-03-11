import React from "react";
import { elastic as Menu } from "react-burger-menu";
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
      

      <a className="menu-item" href="/profile">
        My Profile
      </a>

      <a className="menu-item" href="/sign-up">
       Sign Up
      </a>

      <a className="menu-item" href="/log-in">
        Log In
      </a>
      <br></br>
      
      <Searchbar />
      
    </Menu>
  );
};