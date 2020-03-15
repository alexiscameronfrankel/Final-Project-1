import React, { Component } from 'react';
import { Container, Card, ListGroup, ListGroupItem,
    Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Profile = (props) => {
    
    // if(!props.user.email){ 
    //     props.history.push('/log-in') 
    // }   
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
                <h1 className="prof-title"> CoolGuy84 | Dashboard {props.username}</h1>
            </Card.Header> 
          </Card.Title>
          <Card.Img className="prof-cover" variant="top" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F97%2F31%2Fcf%2F9731cf1aea0498272270f68e74eb2f42--background-images-linkedin-background.jpg&f=1&nofb=1" />
          
        </Card>
        <div className="settings">
        <Card className="sm-card" id="main-card" style={{ width: '18rem' }}>
            <Card.Header>Settings</Card.Header>
            <Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item className="settings-links"><Link to="/account"><Button className="settings-button" >Account</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/myrecipes"><Button className="settings-button" >MyRecipes</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/myactivity"><Button className="settings-button" >Activity</Button></Link></ListGroup.Item>
            </ListGroup>
            </Card.Header>
        </Card>
        <Card className="sm-card" id="main-card" style={{ width: '100%' }}>
            <Card.Header>Profile Settings</Card.Header>
            <Card.Header>
            <div className="prof-avatar">
                <img className="my-avatar" src="https://www.w3schools.com/w3images/avatar2.png"></img>
                <Card.Header className="my-avatar-header">
                <ListGroup>
                    <ListGroup.Item className="prof-list-item">Username: CoolGuy84</ListGroup.Item>
                    <ListGroup.Item className="prof-list-item">First Name: Michael</ListGroup.Item>
                    <ListGroup.Item className="prof-list-item">Last Name: Cooper</ListGroup.Item>
                </ListGroup>
                <ListGroup>
                    <ListGroup.Item className="prof-list-item">Dietary Preferences: Vegan, Gluten Free</ListGroup.Item>
                    <ListGroup.Item className="prof-list-item">Allergies: Peanut</ListGroup.Item>
                </ListGroup>
                </Card.Header>
            </div>
            </Card.Header>
            </Card>
            
        
        </div>
        
        
        </Container>
        </div>
    );
}

export default Profile;