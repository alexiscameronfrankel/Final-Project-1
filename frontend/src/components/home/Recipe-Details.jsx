//Can attempt to extract info from object received and if saved send info to create recipe

import React, { Component } from 'react';
import { Container, Form, Card, ListGroup, ListGroupItem,Button, ButtonGroup,  } from 'react-bootstrap';
import actions from '../../services/index'





class RecipeDetails extends Component {
  state={
      recipeFound: "secondary",
      profileID: '',
  }

  // handleSave=()=>{
  //     let newRecipe = actions.newRecipe(this.state )
  //       this.setState({info: newRecipe})
  //       console.log('finished creating newMeal',newRecipe )
  // }

  async componentDidMount(){
      console.log(this.props )
    actions.findRecipeID(this.props.match.params.recipeID)
    .then(recipeFound =>
        {console.log(recipeFound.data)
        this.setState( {
            ...recipeFound.data
          
        })})
    .catch(err => console.log(err))
    console.log("test")
    

    actions.getProfile(this.props.user._id)
    .then(profileFound =>
        {console.log(profileFound.data)
            this.setState({
               profileID:profileFound.data._id 
            })
        profileFound.data.recipes.find(
            likedRecipe => {
                if (likedRecipe === this.state._id){
                    console.log("recipefound")
                this.setState({
                    recipeFound: true
                })
           } } //iterate through the profile recipes found id and find recipeFound id
        )})
    .catch(err => console.log(err))

    actions.addActivityRecipes({title: this.state.title}).then(updateMyActivity=>{
        console.log('activity random saved',updateMyActivity)
      })
      .catch(error=> console.log(error))
    // actions.findProfileRecipes(this.props.match.params.recipeID)
    // .then(recipeFound =>
    //     {console.log(recipeFound.data)
    //     this.setState( {
    //         ...recipeFound.data
    //     })})
    


    
 }

 handleSave=()=>{
  console.log('handlesave recipe to profile by title',{title: this.state.title})
   actions.addProfileRecipes({title: this.state.title}).then(updateMyRecipes=>{
     console.log(updateMyRecipes)
   })
   .catch(error=> console.log(error))
}
  
  
  render() {
    console.log(this.props)
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
          <Card.Subtitle className="mb-2 text-muted main-card-subtitle text-center">Category: {this.state.category} | Dish Type: {this.state.dishtype}  | Area: {this.state.area}   |   Tags: {this.state.tags}</Card.Subtitle>
          <Card.Header>
              <Card.Img className= "main-card-image" variant="top" src={this.state.imageUrl}/>
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
              <Card.Body className="measurements-list">
              <Card.Header>
              <ListGroup>
               {/* <ListGroupItem className="main-card-subtitle prep-time">  */}
                 {console.log(this.state.ingredients)}
                {this.state.ingredients && this.state.ingredients.map((item,i) => {
                return <ListGroupItem className="list-item text-center" key={i}>Ingredient:  {item}<hr></hr></ListGroupItem>})}
                </ListGroup>
              </Card.Header>
              <Card.Header>
              <ListGroup>
                {this.state.measurements && this.state.measurements.map((item,i) => {return <ListGroupItem className="list-item" key={i}>Amount Needed: {item}<hr></hr></ListGroupItem>})}
                {/* </ListGroupItem> */}
                
              </ListGroup>
                
              </Card.Header>
              </Card.Body>
              <Card.Body>
                <Card>
                <Card.Header>
                <ButtonGroup className="btn-group" aria-label="Basic example">
                    <Button classname="main-card-source" onClick={this.handleSave} variant={this.state.recipeFound} name="save-btn" size="lg"><i className="far fa-heart fa-2x"></i></Button>
                    {/* <Button variant="secondary" name="like-btn" size="lg"><i className="far fa-thumbs-up fa-2x"></i></Button> */}
                    {/* <Button variant="secondary" name="dislike-btn" size="lg"><i className="far fa-thumbs-down"></i></Button>  */}
                    <Button variant="secondary" name="youtube-btn" size="lg"><a  href={this.state.video} className="main-card-source"><i class="fab fa-youtube-square fa-2x"></i></a></Button>
                    <Button variant="secondary" name="source-btn" size="lg"><a  href={this.state.source} className="main-card-source"><i  class="fas fa-external-link-alt fa-2x"></i></a></Button>
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

export default RecipeDetails;
 