//Can attempt to extract info from object received and if saved send info to create recipe

import React, { Component } from 'react';
import { Container, Card, ListGroup, ListGroupItem,Button, ButtonGroup,  } from 'react-bootstrap';
import actions from '../../services/index'





class RecipeDetails extends Component {
  state={
    info: {},
    image: {},
    title: String,
    Category: [],
  }

  // handleSave=()=>{
  //     let newRecipe = actions.newRecipe(this.state )
  //       this.setState({info: newRecipe})
  //       console.log('finished creating newMeal',newRecipe )
  // }

  async componentDidMount(){
      console.log(this.props)
    let meal = actions.findRecipeID(this.props.match.params.recipeID)
    .then(recipeFound =>
        this.setState( {
            info: recipeFound.data,
            image: recipeFound.data.image,
            title: recipeFound.data.title,
            category: recipeFound.data.category,
        }))
    .catch(err => console.log(err))
    
 }
  
  
  render(...props) {
    console.log(this.state.info)
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
          <Card.Subtitle className="mb-2 text-muted main-card-subtitle text-center">Category: {this.state.category} | Dish Type: {this.state.info.dishtype}  | Area: {this.state.info.area}   |   Tags: {this.state.info.tags}</Card.Subtitle>
          <Card.Header>
              <Card.Img className= "main-card-image" variant="top" src={this.state.image}/>
          </Card.Header>
              <Card.Body>
                <Card.Header>
                <Card.Text>
                <ListGroup>
                <ListGroupItem>
                </ListGroupItem>
                <ListGroupItem className="main-card-instructions">
                {this.state.info.instructions}
                </ListGroupItem>
                </ListGroup>
                </Card.Text>
              </Card.Header>
              </Card.Body>
              <Card.Header>
              <ListGroup className="list-group-flush text-center">
                <ListGroupItem className="main-card-subtitle prep-time">{this.state.info.measurements}</ListGroupItem>
              </ListGroup>
              </Card.Header>
              <Card.Body>
                <Card>
                <Card.Header>
                  <ButtonGroup className="btn-group" aria-label="Basic example">
                    <Button variant="secondary" name="save-btn" size="lg"><i className="far fa-heart"></i></Button>
                    <Button variant="secondary" name="like-btn" size="lg"><i className="far fa-thumbs-up"></i></Button>
                    <Button variant="secondary" name="dislike-btn" size="lg"><i className="far fa-thumbs-down"></i></Button>
                    <Button variant="secondary" name="youtube-btn" size="lg"><a  href={this.state.info.video} className="main-card-source"><i class="fab fa-youtube-square"></i></a></Button>
                    <Button variant="secondary" name="source-btn" size="lg"><a  href={this.state.info.source} className="main-card-source"><i  class="fas fa-external-link-alt"></i></a></Button>
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

export default RecipeDetails;
 