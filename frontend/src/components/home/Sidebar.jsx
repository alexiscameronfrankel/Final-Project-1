import React from "react";
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
        {/* <Searchbar /> */}
        </div>
    
    <Menu {...props} >

      <a className="menu-item" href="/"><i className="fas fa-home"></i> Home</a>

      
        {props.emailID === null ?
             
        <Fragment>
            <a className="bm-item  menu-item" href="/sign-up"><i className="fas fa-user-plus"></i> Sign Up</a>
            <br></br>
            <a className="bm-item menu-item" href="/log-in"><i className="fas fa-sign-in-alt"></i> Log In</a>
        </Fragment>
        
        :
       
        <Fragment>
            <a className="bm-item menu-item" href="/profile"><i className="fas fa-user-circle"></i> My Profile</a>
            <br></br>
            <a className="bm-item menu-item" href="/log-out" onClick={props.actionLogout}><i className="fas fa-sign-out-alt"></i> Log Out</a>
        </Fragment>
      
        }
      <a className="menu-item" href="/random">
      <i className="fas fa-random"></i> Random
      </a>

      <a className="menu-item" href="/new-recipe"> <i className="fas fa-plus-square"></i> New Recipe
      </a>
      
      <a className="menu-item" href="/allrecipes"><i className="fas fa-globe-americas"></i> All Recipes
      </a>
      
      <br></br>
      
      {/* <Searchbar /> */}
      
    </Menu>
    </Fragment>
  )};
    
