import React, { Component } from 'react';
import { Container, Card, ListGroup, ListGroupItem,
    Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const MyRecipes= (props) => {
    
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
                <h1 className="prof-title">Let's Get Cooking, Michael!</h1>
            </Card.Header> 
          </Card.Title>
          <Card.Img className="prof-cover" variant="top" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F97%2F31%2Fcf%2F9731cf1aea0498272270f68e74eb2f42--background-images-linkedin-background.jpg&f=1&nofb=1" />
          
        </Card>
        <div className="settings">
        <Card className="sm-card" id="main-card" style={{ width: '18rem' }}>
            <Card.Header>Settings</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item className="settings-links"><Link to="/account"><Button className="settings-button" >Account</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/myrecipes"><Button className="settings-button" >Recipes</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/myactivity"><Button className="settings-button" >Activity</Button></Link></ListGroup.Item>
            </ListGroup>
        </Card>
        <Card className="sm-card" id="main-card" style={{ width: '100%' }}>
            <Card.Header>Past Recipes</Card.Header>
            <div className="past-recipes">
            <Card className="past-recipe-card" style={{ width: '33%' }}>
            <Card.Img variant="top" src="https://i.ytimg.com/vi/ZJPpMSx3eSw/hqdefault.jpg" />
                <Card.Body>
                    <Card.Title> Tiquana Street Tacos</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="secondary" className="settings-button">View Recipe</Button>
                </Card.Body>
            </Card>
            <Card className="past-recipe-card" style={{ width: '33%' }}>
            <Card.Img variant="top" src="https://i.ytimg.com/vi/LIubvcunMBc/hqdefault.jpg" />
                <Card.Body>
                    <Card.Title>Brooklyn Style Pizza</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="secondary" className="settings-button">View Recipe</Button>
                </Card.Body>
            </Card>
            <Card className="past-recipe-card" style={{ width: '33%' }}>
            <Card.Img variant="top" src="https://i.ytimg.com/vi/CcwQeQ4VY7I/hqdefault.jpg" />
                <Card.Body>
                    <Card.Title>Kitchen Sink Nachos</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="secondary" className="settings-button">View Recipe</Button>
                </Card.Body>
            </Card>
            </div>
        </Card>
        
        </div>
        
        
        </Container>
        </div>
    );
}

export default MyRecipes;