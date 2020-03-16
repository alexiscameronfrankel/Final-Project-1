//Can attempt to extract info from object received and if saved send info to create recipe

import React, { Component } from 'react';
import Axios from 'axios'
import { Container, Card, ListGroup, ListGroupItem,
Button, ButtonGroup, } from 'react-bootstrap';
// import Footer from '../Footer';
// import Searchbar from './Searchbar';
// import actions from '../../services/index'




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
        tags: mealsArray[0].strTags
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
          <Card.Header>
          <Card.Title className="text-center main-card-title" >{this.state.title}</Card.Title>
          </Card.Header>
          <Card.Subtitle className="mb-2 text-muted main-card-subtitle text-center">Dish Type: {this.state.category}  | Area: {this.state.area}   |   Tags: {this.state.tags}</Card.Subtitle>
          <Card.Header>
              <Card.Img className= "main-card-image" variant="top" src={this.state.thumbnail} />
          </Card.Header>
              <Card.Body>
                <Card.Header>
                <Card.Text>
                <ListGroup>
                <ListGroupItem>
                </ListGroupItem>
                <ListGroupItem className="main-card-instructions">
                {this.state.instructions}
                </ListGroupItem>
                </ListGroup>
                </Card.Text>
              </Card.Header>
              </Card.Body>
              <Card.Header>
              <ListGroup className="list-group-flush text-center">
                <ListGroupItem className="main-card-subtitle prep-time">Prep Time - 10 Minutes |
                Cook Time - 20 Minutes |
                Ready In - 30 Mintues</ListGroupItem>
              </ListGroup>
              </Card.Header>
              <Card.Body>
                <Card>
                <Card.Header>
                  <ButtonGroup className="btn-group" aria-label="Basic example">
                    <Button variant="secondary" name="save-btn" size="lg"><i className="far fa-heart"></i></Button>
                    <Button variant="secondary" name="like-btn" size="lg"><i className="far fa-thumbs-up"></i></Button>
                    <Button variant="secondary" name="dislike-btn" size="lg"><i className="far fa-thumbs-down"></i></Button>
                    <Button variant="secondary" name="youtube-btn" size="lg"><a  href={this.state.youtube} className="main-card-source"><i class="fab fa-youtube-square"></i></a></Button>
                    <Button variant="secondary" name="source-btn" size="lg"><a  href={this.state.source} className="main-card-source"><i  class="fas fa-external-link-alt"></i></a></Button>
                    <Button variant="secondary" name="edit-recipe" size="lg">Edit Recipe</Button>
                  </ButtonGroup>
                  </Card.Header>
                
                </Card>
              </Card.Body>
            </Card>
            
        </Container>
        
      </div>
    );
  }
}

export default Random;
 