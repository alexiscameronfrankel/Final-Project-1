import React, { Component } from 'react';
import { Container, Card, ListGroup, ListGroupItem,
    Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Account = (props) => {
    
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
                <h1 className="prof-title">Account Preferences | CoolGuy84{props.username}</h1>
            </Card.Header> 
          </Card.Title>
          <Card.Header>
          <Card.Img className="prof-cover" variant="top" src="http://www.ironchefamerica.tv/us/images/lets-get-cooking.jpg "/>
          </Card.Header>
        </Card>
        <div className="settings">
        <Card className="sm-card" id="main-card" style={{ width: '18rem' }}>
            <Card.Header>Settings</Card.Header>
            <Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item className="settings-links"><Link to="/profile"><Button className="settings-button" >Profile</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/myrecipes"><Button className="settings-button" >Recipes</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/myactivity"><Button className="settings-button" >Activity</Button></Link></ListGroup.Item>
            </ListGroup>
            </Card.Header>
        </Card>
        <Card className="sm-card" id="main-card" style={{ width: '100%' }}>
            <Card.Header>Account Preferences</Card.Header>
            <Card>
            <form>
                <div className="form-group">
                    <label for="exampleInputEmail1">Change User Preferences</label>
                    <input type="username" className="form-control" id="exampleInputEmail1" aria-describedby="UserHelp" placeholder="Enter New Username" />
                    <small id="emailHelp" className="form-text text-muted">Required. Username must be unique</small>
                    <input type="firstname" className="form-control" id="exampleInputEmail1" aria-describedby="FirstNameHelp" placeholder="First Name" />
                    <input type="lastname" className="form-control" id="exampleInputEmail1" aria-describedby="LastNameHelp" placeholder="Last Name" />
                    <small id="emailHelp" className="form-text text-muted">Required</small>
                </div>
                
                <div className="form-group">
                    <input type="hidden" name="MAX_FILE_SIZE" value="4194304" />
                    <input type="file" />
                    <small id="emailHelp" className="form-text text-muted">Avatar Upload. 4MB Maximum.</small>

                </div>
                
                

                <Button type="submit" size="lg" className="btn btn-primary account-button" block>Submit</Button>
                
                </form>
            </Card>
           
            
        </Card>
        </div>
        
        
        </Container>
        </div>
    );
}

export default Account;