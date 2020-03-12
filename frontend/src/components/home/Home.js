import React, { Component } from 'react';
import actions from '../../services/index'
import { Container, Card, ListGroup, ListGroupItem,
Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import Footer from '../Footer';
import Searchbar from './Searchbar';


class Home extends Component {
  async componentDidMount() {
    //actions.test()
  }
  render() {
    return (
      <div>
        <div className="head-div">
        <Searchbar />
        </div>
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
          
          <Card id="main-card" style={{ width: '100%' }}>
          
          <Card.Title className="text-center"><h1>Old Fashioned Creamy Rice Pudding</h1> </Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">by: UserName</Card.Subtitle>
              <Card.Img variant="top" src="https://images.media-allrecipes.com/userphotos/720x405/7715085.jpg" />
              <Card.Body>
                
                <Card.Text>
                <ListGroup>
                <ListGroupItem>
                Combine cooked rice, 1 1/2 cups milk, and salt in a saucepan over medium heat;cook and stir until thick and creamy, 15 to 20 minutes.
                </ListGroupItem>
                <ListGroupItem>
                Stir remaining 1/2 cup milk, golden raisins, beaten egg, and white sugar into the rice mixture; stirring continually.
                </ListGroupItem>
                <ListGroupItem>
                Continue cooking until egg is set, 2 to 3 minutes.
                </ListGroupItem>
                <ListGroupItem>
                Remove saucepan from heat; stir butter and vanilla extract into the pudding.
                </ListGroupItem>
                </ListGroup>
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush text-center"  id="prep-time">
                <ListGroupItem>
                Prep Time - 10 Minutes |
                Cook Time - 20 Minutes |
                Ready In - 30 Mintues
                </ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href="#">
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary">Like</Button>
                    <Button variant="secondary">Change</Button>
                    <Button variant="secondary">Dislike</Button>
                    <Button variant="secondary">
                 Modify Recipe
                </Button>
                  </ButtonGroup>
                
                </Card.Link>
              </Card.Body>
            </Card>
        </Container>
        
        
      </div>
    );
  }
}

export default Home;
 