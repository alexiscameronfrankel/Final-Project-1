//Can attempt to extract info from object received and if saved send info to create recipe

import React, { Component } from 'react';
import actions from '../../services/index'
import { Container, Card, ListGroup, ListGroupItem,
Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import Footer from '../Footer';
import Searchbar from './Searchbar';
import Axios from 'axios'



class Random extends Component {
  state={
    info:[],
    title: String,
    category: String,
    instructions: String,
    thumbnail: String,
    youtube: String,
    source: String,
    ingredients: [],
    measure: []
  }
  async componentDidMount() {
    Axios.get('https://www.themealdb.com/api/json/v1/1/random.php').then(res=>{
      // console.log('frenchy working api',res)
      let x= res.data.meals[0]
      let mealsArray=[...this.state.info]
      mealsArray.push(x)
      this.setState({
        info: mealsArray,
        title: mealsArray[0].strMeal,
        category: mealsArray[0].strCategory,
        area: mealsArray[0].strArea,
        instructions: mealsArray[0].strInstructions,
        thumbnail: mealsArray[0].strMealThumb,
        youtube: mealsArray[0].strYoutube,
        source: mealsArray[0].strSource,
        ingredients: mealsArray[0].strIngredient1,
        measure: mealsArray[0].strMeasure1,
      })
    })
  }
  
  render() {
    console.log(this.state.info)
    console.log(this.state.title)
    return (
      <div>
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
          
          <Card.Title className="text-center"><h1>{this.state.title}</h1> </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Category: {this.state.category}  | Area: {this.state.area}</Card.Subtitle>
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
              <ListGroup className="list-group-flush text-center">
                <ListGroupItem>Prep Time - 10 Minutes |
                Cook Time - 20 Minutes |
                Ready In - 30 Mintues</ListGroupItem>
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

export default Random;
 