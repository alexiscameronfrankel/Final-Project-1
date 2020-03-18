//Can attempt to extract info from object received and if saved send info to create recipe

import React, { Component } from 'react';
import actions from '../../services/index'
import { Container, Card, ListGroup, ListGroupItem,Button, ButtonGroup, Form } from 'react-bootstrap';
import Footer from '../Footer';
// import Searchbar from './Searchbar';
import Axios from 'axios';

class Random extends Component {
  state={
    info: {}
  }
  async componentDidMount() {
    Axios.get('https://www.themealdb.com/api/json/v1/1/random.php').then(res=>{
      // console.log('frenchy working api',res)
      let x= res.data.meals[0]
      console.log('x',x)
      
      let mDish='Other'
      if (x.strCategory=== 'Breakfast'){ mDish='Breakfast'};
      if (x.strCategory=== 'Dessert') { mDish='Dessert'};
      if (x.strCategory=== 'Pork') { mDish='Dish'};
      if (x.strCategory=== 'Chicken') { mDish='Dish'};
      if (x.strCategory=== 'Beef') { mDish='Dish'};
      if (x.strCategory=== 'Seafood') { mDish='Dish'};
  
      let mCategory='Other'
      if (x.strCategory=== 'Vegetarian') { mCategory='Vegetarian'};
      if (x.strCategory=== 'Vegan') { mCategory='Vegan'};
      if (x.strCategory=== 'Pork') { mCategory='Pork'};
      if (x.strCategory=== 'Chicken') { mCategory='Chicken'};
      if (x.strCategory=== 'Beef') { mCategory='Beef'};
      if (x.strCategory=== 'Seafood') { mCategory='Seafood'};
  
      // let mIngredients = [
      //   x.strIngredient1,
      //   x.strIngredient2,
      //   x.strIngredient3,
      //   x.strIngredient4,
      //   x.strIngredient5,
      //   x.strIngredient6,
      //   x.strIngredient7,
      //   x.strIngredient8,
      //   x.strIngredient9,
      //   x.strIngredient10,
      //   x.strIngredient11,
      //   x.strIngredient12,
      //   x.strIngredient13,
      //   x.strIngredient14,
      //   x.strIngredient15,
      //   x.strIngredient16,
      //   x.strIngredient17,
      //   x.strIngredient18,
      //   x.strIngredient19,
      //   x.strIngredient20
      // ]
      let mIngredients=[]
      for (let i=1;i<21;i++){
        if (x["strIngredient"+i]){
          mIngredients.push(x["strIngredient"+i])
        }
      }
      console.log(mIngredients)
      // let mMeasurements=[
      //   x.strMeasure1,
      //   x.strMeasure2,
      //   x.strMeasure3,
      //   x.strMeasure4,
      //   x.strMeasure5,
      //   x.strMeasure6,
      //   x.strMeasure7,
      //   x.strMeasure8,
      //   x.strMeasure9,
      //   x.strMeasure10,
      //   x.strMeasure11,
      //   x.strMeasure12,
      //   x.strMeasure13,
      //   x.strMeasure14,
      //   x.strMeasure15,
      //   x.strMeasure16,
      //   x.strMeasure17,
      //   x.strMeasure18,
      //   x.strMeasure19,
      //   x.strMeasure20
      // ]
      let mMeasurements=[]
      for (let i=1;i<21;i++){
        if (x["strMeasure"+i]){
          mMeasurements.push(x["strMeasure"+i])
        }
      }
      console.log(mMeasurements)
      
      let mealTags
      if (x.strTags===null){
        mealTags=[]
      }else if (x.strTags.includes(",")){
        mealTags=x.strTags.split(",")
      }else{
        mealTags=x.strTags
      }


      let newMeal={
      title: x.strMeal,
      category: mCategory,
      dishtype: mDish,
      area: "",
      cuisine: x.strArea,
      instructions: x.strInstructions,
      imageUrl: x.strMealThumb,
      tags: mealTags,
      video: x.strYoutube,
      ingredients: mIngredients,
      measurements: mMeasurements,
      source: x.strSource,
      profileID: "",
      created: "",
      comments: []
      }
      
     
      let createRecipe = actions.newRecipe(newMeal)
      this.setState({info: newMeal})
      console.log('finished creating newMeal',createRecipe )
      
    })

  }



  handleSave=()=>{
      console.log('handlesave recipe to profile',{title: this.state.info.title})
       actions.addProfileRecipes({title: this.state.info.title}).then(updateMyRecipes=>{
         console.log(updateMyRecipes)
       })
       .catch(error=> console.log(error))
  }
  
  render() {
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
          <Card.Title className="text-center main-card-title" >{this.state.info.title}</Card.Title>
          </Card.Header>
          <Card.Subtitle className="mb-2 text-muted main-card-subtitle text-center">Category: {this.state.info.category} | Dish Type: {this.state.info.dishtype}  | Cuisine: {this.state.info.cuisine}</Card.Subtitle>
          <Card.Header>
              <Card.Img className= "main-card-image" variant="top" src={this.state.info.imageUrl} />
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
              <Card.Body className="measurements-list">
              <Card.Header><span style={{color:'white'}}>Ingredients:</span>
              <ListGroup>
               {/* <ListGroupItem className="main-card-subtitle prep-time">  */}
                 {console.log(this.state.info.ingredients)}
                {this.state.info.ingredients && this.state.info.ingredients.map((item,i) => {return <ListGroupItem className="list-item" key={i}>{i+1})  <span> {item} </span><hr></hr></ListGroupItem>})}
                </ListGroup>
              </Card.Header>
              <Card.Header><span style={{color:'white'}}>Measurements:</span>
              <ListGroup>
                {this.state.info.measurements && this.state.info.measurements.map((item,i) => {return <ListGroupItem className="list-item" key={i}> <span> {item} </span><hr></hr></ListGroupItem>})}
                {/* </ListGroupItem> */}
                
              </ListGroup>
              </Card.Header>
              </Card.Body>
              <Card.Body>
                <Card>
                <Card.Header>
                  <ButtonGroup className="btn-group" aria-label="Basic example">
                    <Button onClick={this.handleSave} variant="secondary" name="save-btn" size="lg"><i className="far fa-heart"></i></Button>
                    {/* <Button variant="secondary" name="like-btn" size="lg"><i className="far fa-thumbs-up"></i></Button> */}
                    {/* <Button variant="secondary" name="dislike-btn" size="lg"><i className="far fa-thumbs-down"></i></Button> */}
                    <Button variant="secondary" name="youtube-btn" size="lg"><a  href={this.state.info.video} className="main-card-source"><i class="fab fa-youtube-square"></i></a></Button>
                    <Button variant="secondary" name="source-btn" size="lg"><a  href={this.state.info.source} className="main-card-source"><i  class="fas fa-external-link-alt"></i></a></Button>
                    <Button variant="secondary" name="edit-recipe" size="lg">Edit Recipe</Button>
                  </ButtonGroup>
                </Card.Header>
                <Card.Header>
                <Form.Label>Leave a comment below</Form.Label>
                <Form.Group className="comment-form" id="comment-form" controlId="exampleForm.ControlTextarea1">
                
                <Form.Control as="textarea" rows="3" />
                <Button variant="secondary" name="save-btn" size="lg"><i className="far fa-comments fa-2x"></i></Button>
                </Form.Group>
                  </Card.Header>
                  <Card.Header>
                      <Form.Label>Previous Comments</Form.Label>
                      <ListGroup>
                          <ListGroupItem>
                              
                              <p><strong><q>This recipe my whole family loved. If I were to change one thing I would add more butter</q></strong></p>
                              <div className="previous-comments"><img src="https://www.w3schools.com/w3images/avatar2.png" alt="Avatar" class="avatar"></img>
                              <h4 className="pc-user">-Michael Cooper</h4>
                              </div>
                          </ListGroupItem>
                      </ListGroup>
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
 