//Can attempt to extract info from object received and if saved send info to create recipe

import React, { Component } from 'react';
import actions from '../../services/index'
import { Container, Card, ListGroup, ListGroupItem,
Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import Footer from '../Footer';
// import Searchbar from './Searchbar';
import Axios from 'axios'



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
  
      let mIngredients = [
        x.strIngredient1,
        x.strIngredient2,
        x.strIngredient3,
        x.strIngredient4,
        x.strIngredient5,
        x.strIngredient6,
        x.strIngredient7,
        x.strIngredient8,
        x.strIngredient9,
        x.strIngredient10,
        x.strIngredient11,
        x.strIngredient12,
        x.strIngredient13,
        x.strIngredient14,
        x.strIngredient15,
        x.strIngredient16,
        x.strIngredient17,
        x.strIngredient18,
        x.strIngredient19,
        x.strIngredient20
      ]
      let mMeasurements=[
        x.strMeasure1,
        x.strMeasure2,
        x.strMeasure3,
        x.strMeasure4,
        x.strMeasure5,
        x.strMeasure6,
        x.strMeasure7,
        x.strMeasure8,
        x.strMeasure9,
        x.strMeasure10,
        x.strMeasure11,
        x.strMeasure12,
        x.strMeasure13,
        x.strMeasure14,
        x.strMeasure15,
        x.strMeasure16,
        x.strMeasure17,
        x.strMeasure18,
        x.strMeasure19,
        x.strMeasure20
      ]
      
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
      image: x.strMealThumb,
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

  // handleSave=()=>{
  //     let newRecipe = actions.newRecipe(this.state )
  //       this.setState({info: newRecipe})
  //       console.log('finished creating newMeal',newRecipe )
  // }
  
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
          
          <Card.Title className="text-center"><h1>{this.state.info.title}</h1> </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">by: UserName</Card.Subtitle>
              <Card.Img variant="top" src="https://images.media-allrecipes.com/userphotos/720x405/7715085.jpg" />
              <Card.Body>
                
                <Card.Text>
                <ListGroup>
                <ListGroupItem>
                {/* Combine cooked rice, 1 1/2 cups milk, and salt in a saucepan over medium heat;cook and stir until thick and creamy, 15 to 20 minutes. */}
                {this.state.info.instructions}
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
 