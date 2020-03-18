//Need to make this page a class (done)
//add axios call for profile routes
//button onclick method to save profile changes
//onClick of myrecipes > axios route needed for myrecipes in profile model array

import React, { Component } from 'react';
import actions from '../../services/index'
import { Container, Card, ListGroup, ListGroupItem,
    Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';
// import axios from 'axios';



class Profile extends Component {
        
    async componentDidMount (){
        actions.findProfileRecipes(this.props.user._id)
            .then(myRecipes => 
                console.log('myRecipesReceived', myRecipes))
                // this.setState({savedRecipes: myRecipes.data})
            .catch(({ response }) => {
             ;
                console.log('error loading',response)   
            })
        actions.getProfile(this.props.user._id)
            .then(profile =>
                console.log('myProfile received', profile))
                // this.setState({myProfile: profile.data})
            .catch(({ response }) =>
            console.log('error loading',response))
        };

        // if (!this.props.user.email) { 
        //     this.props.history.push('/log-in') 
        // } 

        render (){
            console.log(this.props)
        return (
        <div>
            {/* Profile
            Welcome {props.user.email} !!!  */}
            <Container className="home-recipe">
          {/* <img className="hero-img" src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F5446883.jpg&w=596&h=596&c=sc&poi=face&q=85"></img>
          <div className="hero-recipe">
          <h1 className="recipe-title">My Recipe Name</h1>
          <ul>
            <li>Step 1 - Boil Water at High Heat</li>
            <li>Step 2 - Boil Meat for 30 minutes</li>
            <li>Step 3 - Dice Vegetables into a Juliene Cut</li>
            <li>Step 4 - Prep Appetizers and Grab a Beer</li>
          </ul>
          </div> */}
          
          <Card id="main-card" 
          style={{ width: '100%' }}>
          
          <Card.Title className="text-center">
            <Card.Header>
                <h1 className="prof-title"> {this.props.user.email} | Dashboard </h1>
            </Card.Header> 
          </Card.Title>
          <Card.Header>
          <Card.Img className="prof-cover" variant="top" src="http://www.ironchefamerica.tv/us/images/lets-get-cooking.jpg" />
          </Card.Header>
        </Card>
        <div className="settings">
        <Card className="sm-card" id="main-card" style={{ width: '18rem' }}>
            <Card.Header>Settings</Card.Header>
            <Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item className="settings-links"><Link to="/account"><Button className="settings-button" ><i class="fas fa-user-cog"></i> Account</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/myrecipes"><Button className="settings-button" ><i class="fas fa-list"></i> MyRecipes</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/myactivity"><Button className="settings-button" ><i class="fas fa-chart-line"></i> Activity</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/log-out"><Button className="settings-button" ><i class="fas fa-sign-out-alt"></i> Logout</Button></Link></ListGroup.Item>
            </ListGroup>
            </Card.Header>
        </Card>
        <Card className="sm-card" id="main-card" style={{ width: '100%' }}>
            <Card.Header>Current Profile</Card.Header>
            <Card.Header>
            <div className="prof-avatar">
            <Card.Header>
                <Card.Img className="my-avatar" src="https://www.w3schools.com/w3images/avatar2.png"></Card.Img>
                </Card.Header>
                <Card.Header className="my-avatar-header">
                <ListGroup>
                    <ListGroup.Item className="prof-list-item">Username: <span className="account-info"> CoolGuy84</span></ListGroup.Item>
                    <ListGroup.Item className="prof-list-item">First Name: <span className="account-info"> Michael</span></ListGroup.Item>
                    <ListGroup.Item className="prof-list-item">Last Name: <span className="account-info"> Cooper</span></ListGroup.Item>
                </ListGroup>
                <ListGroup>
                    <ListGroup.Item className="prof-list-item">Dietary Preferences: <span className="account-info">Vegan, Gluten Free</span></ListGroup.Item>
                    <ListGroup.Item className="prof-list-item">Allergies: <span className="account-info">Peanut</span></ListGroup.Item>
                </ListGroup>
                </Card.Header>
            </div>
            </Card.Header>
            <Button type="submit" size="lg" className="btn btn-primary account-button block" ><Link className="account-btn" to="/account"><i className="fas fa-user-cog fa-2x"></i> Account</Link> </Button>
            </Card>
            
        
        </div>
        
        
        </Container>
        </div>
        )
}
}

export default Profile;