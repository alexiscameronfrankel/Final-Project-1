import React from "react";
import {Fragment} from 'react';
import {Link} from 'react-router-dom';
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

      <Link className="menu-item" to="/"><i className="fas fa-home"></i> Home</Link>

      
        {props.emailID === null ?
         
        <Fragment>
            <Link className="bm-item  menu-item" to="/sign-up"><i className="fas fa-user-plus"></i> Sign Up</Link>
            <br></br>
            <Link className="bm-item menu-item" to="/log-in"><i className="fas fa-sign-in-alt"></i> Log In</Link>
        </Fragment>
        
        :
       
        <Fragment>
            <Link className="bm-item menu-item" to="/profile"><i className="fas fa-user-circle"></i> My Profile</Link>
            <br></br>
            <Link className="bm-item menu-item" to="/log-out" onClick={props.actionLogout}><i className="fas fa-sign-out-alt"></i> Log Out</Link>
        </Fragment>
      
        }
      <Link className="menu-item" to="/random">
      <i className="fas fa-random"></i> Random
      </Link>

      <Link className="menu-item" to="/new-recipe"> <i className="fas fa-plus-square"></i> New Recipe
      </Link>
      
      <Link className="menu-item" to="/allrecipes"><i className="fas fa-globe-americas"></i> All Recipes
      </Link>
      
      <br></br>
      
      <Searchbar />
      
    </Menu>
    </Fragment>
  )};
    
