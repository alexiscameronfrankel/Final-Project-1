import React, {Component, Fragment} from 'react';
import {  Switch, Route, NavLink } from 'react-router-dom';
import Home from './components/home/Home';
import NotFound from './components/404/NotFound.js';
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';
import Profile from './components/profile/Profile';
import actions from './services/index';
import { Button, Navbar, NavDropdown, Form, FormControl, Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Likes from './components/profile/Likes';
import Footer from './components/Footer.jsx'
import Random from './components/home/Random'
import Sidebar from './components/home/Sidebar.jsx'
// import ImageUpload from './components/ImageUpload.js'
import Newrecipe from './components/Newrecipe';


class App extends Component {
  
  state = { 
      // email:null, 
      // createdAt: null, 
      // updatedAt: null, 
      // _id: null 
  }
  

  //*checks if user is logged in and gets a user object response or null from backend auth.js
  async componentDidMount() {
    let user = await actions.isLoggedIn()
    this.setState({...user.data})
    console.log('coolest ')
    
    // Axios.get('https://www.themealdb.com/api/json/v1/1/random.php').then(res=>{
    //   // console.log('frenchy working api',res)
    //   let x= res.data.meals[0]
    //   let mealsArray=[...this.state.info]
    //   mealsArray.push(x)
    //   this.setState({
    //     info: mealsArray
    //   })
    // })
  }

  //*Receives event from prop passed to component Login/SignUp
  setUser = (user) => this.setState(user)
  
  //*method logout on backend in auth.js used to logout user and null object sent to method setUser to logout frontend
  logOut = async () => {
    let res = await actions.logOut()
    this.setUser({
      email:null, 
      createdAt: null, 
      updatedAt: null, 
      _id: null }) //FIX 
  }



  // handleChange = e => {
  //   console.log(this.state)
  //   this.setState({[e.target.name]: e.target.value})
  // }

  // handleSubmit = e => {
  //     e.preventDefault()
  //         actions.newRecipe(this.state)
  //         .then(recipe=> {
  //             console.log(recipe) 
  //         }).catch(({ response }) => console.error(response));
  // }
  
  render(){
    // console.log(this.state)
    return (
      // <form onSubmit={this.handleSubmit}>
      //   <input type="text" name="title" onChange={this.handleChange}/>
      //   <input type="submit"/>
      // </form>



    <div id="App">
      <Sidebar emailID={this.state.email} pageWrapId={"page-wrap"} outerContainerId={"App"} />
    <div id="page-wrap">
    
      {/* <Nav>
        <NavLink to="/">Home |</NavLink>
  
        {this.state.email ? 
          <Fragment>
           <NavLink onClick={this.logOut} to='/'>Log Out |</NavLink> 
           <NavLink to="/profile">Profile|</NavLink>
           </Fragment>
           :
           <Fragment>
           <NavLink to="/sign-up">Sign Up |</NavLink>
           <NavLink to="/log-in">Log In |</NavLink>
           </Fragment>
          }
        
      </Nav> */}

      
      {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Food-Saver</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/account">Random Recipe</Nav.Link>
            
            <NavDropdown title="My Account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Favorites</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Premium</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Searchbar />

          <Nav>
            <Nav.Link href="/log-in">Log In</Nav.Link>
            <Nav.Link eventKey={2} href="/sign-up">
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar> */}

      
      
    
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route exact path="/profile" render={(props) => <Profile {...props} user={this.state}/>} />
        <Route exact path="/random" render={(props) => <Random {...props} />} />
        <Route exact path="/sign-up" render={(props)=><SignUp {...props} setUser={this.setUser} />} />
        <Route exact path="/log-in" render={(props) => <LogIn {...props} setUser={this.setUser}/>} />
        <Route exact path="/log-out" render={(props) => <Home {...props} actionLogout= {this.logOut()}  />} />
        <Route exact path="/new-recipe" render={(props) => <Newrecipe {...props} user={this.state}/>} />
        <Route exact path="/likes" render={(props) => <Likes {...props} setUser={this.setUser}/>} />
        <Route component={NotFound} />
      </Switch>
      {/* <ImageUpload/> */}
      <Footer />
      </div>
      </div>
  );
  }
}
export default App;
