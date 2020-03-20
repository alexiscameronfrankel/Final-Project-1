//Can attempt to extract info from object received and if saved send info to create recipe

import React, { Component } from 'react';
import actions from '../../services/index'
import { Container, Card, ListGroup, ListGroupItem,Button, ButtonGroup, Form } from 'react-bootstrap';

// import Searchbar from './Searchbar';
import Axios from 'axios';

class Random extends Component {
  state={
    info: {},
    profileID: {},
    ready: false,
    recipeComments: []
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
  
      let mIngredients=[]
      for (let i=1;i<21;i++){
        if (x["strIngredient"+i]){
          mIngredients.push(x["strIngredient"+i])
        }
      }
      
      
      let mMeasurements=[]
      for (let i=1;i<mIngredients.length+1;i++){
        
          mMeasurements.push(x["strMeasure"+i])
        
      }
  
      
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
      created: new Date(),
      comments: []
      }
      
     
      actions.newRecipe(newMeal).then(createRecipe=> {
        console.log('finished creating newMeal',createRecipe)
        document.querySelector("#heart").style["color"]='white'
        if (createRecipe.data.length>0){
          this.setState({
            info: createRecipe.data[0]
          })
          actions.findProfileRecipes().then(myRecipes=>{
            console.log('about to loop through array',myRecipes.data)
            myRecipes.data.map(eachRecipe=>{
              if (eachRecipe._id===createRecipe.data[0]._id){
                document.querySelector("#heart").style["color"]='red'
              }
            })
          }).catch(err=> console.log(err))
          actions.getRecipeComments(createRecipe.data[0]._id).then(recipeComments=>{
            this.setState({recipeComments:recipeComments.data, ready:true})
            console.log('recipecomments',recipeComments.data)
            })
            .catch(err=>console.log(err))
          }else{ 
            console.log('setting new meal to state')    
            this.setState({
              info: newMeal
            })
          }
          actions.addActivityRecipes({title: newMeal.title})
        })
        .catch(error=> console.log(error))
      })  
      
     
     actions.getProfile(this.props.user._id).then(profileFound=>{
       console.log('profileFound',profileFound.data[0]._id)
       this.setState({
         profileID:profileFound.data[0]._id,
         profileUser:profileFound.data[0].username,
         profileAvatar:profileFound.data[0].imageUrl})
     })
     .catch(err => console.log(err))
    }
    


  handleSave=(e)=>{
    if(document.querySelector("#heart").style["color"]==='red'){
        console.log("handleadelete")
        document.querySelector("#heart").style["color"]='white'
        actions.deleteProfileRecipes({title: this.state.info.title})
    }else if(document.querySelector("#heart").style["color"]==='white'){
      document.querySelector("#heart").style["color"]='red'
      console.log('handleAdd new recipe to profile',{title: this.state.info.title})
      actions.addProfileRecipes({title: this.state.info.title})
    }
   
  }

  handleCommentBox=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  
  }
  
  handleRate=(e)=>{
      console.log(e.target.checked)
      if (e.target.checked){
        this.setState({
          [e.target.name]:e.target.value
        })
      }
  }
  
  handleSubmitComment=(e)=>{
    console.log('inside random handle commet')
     e.preventDefault()
     actions.findRecipeName({title:this.state.title}).then(recipeFound=>{
      console.log('recipeFound for comment',recipeFound)
      let newCommentObj={
        recipeID: recipeFound.data._id,
        profileID:this.state.profileID,
        username: this.state.profileUser,
        rating: this.state.rating,
        description: this.state.commentbox,
        avatar: this.state.profileAvatar
      }
    
     actions.newComment(newCommentObj).then(addNewComment=>{
       console.log(addNewComment)
     })
     .catch(error=> console.log(error))
    })
    .catch(error=> console.log(error))
    this.props.history.push(`/commented`)
  
  }

 
  render() {
    
    return (
      <div>
        <Container className="home-recipe">
       
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
                {/* <ListGroupItem>
                </ListGroupItem> */}
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
                 {/* {console.log(this.state.info.ingredients)} */}
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
                    <Button onClick={this.handleSave} variant="secondary" name="save-btn" size="lg"><i id="heart" className="fas fa-heart fa-2x"></i></Button>
                    <Button variant="secondary" name="youtube-btn" size="lg"><a  href={this.state.info.video} className="main-card-source"><i className="fab fa-youtube-square fa-2x"></i></a></Button>
                    <Button variant="secondary" name="source-btn" size="lg"><a  href={this.state.info.source} className="main-card-source"><i  className="fas fa-external-link-alt fa-2x"></i></a></Button>
                    <Button variant="secondary" name="edit-recipe" size="lg">Edit Recipe</Button>
                  </ButtonGroup>
                </Card.Header>
                <Card.Header>
                <Form.Label>Leave a comment below</Form.Label>
                <Form.Group className="comment-form" id="comment-form" controlId="exampleForm.ControlTextarea1">
                
                <Form.Control as="textarea" rows="3" name="commentbox" onChange={this.handleCommentBox}/>
                <Button variant="secondary" name="save-btn" size="lg" onClick={this.handleSubmitComment}><i className="far fa-comments fa-2x"></i></Button>
                </Form.Group>
                <br/>
                <div id="status"></div>
                <Form.Group id="rating">
                    <fieldset className="rating">
                        <legend>Rate:</legend>
                        <input type="radio" id="star5" name="rating" value="5" onChange={this.handleRate}/><label for="star5" title="Rocks!">5 stars</label>
                        <input type="radio" id="star4" name="rating" value="4" onChange={this.handleRate}/><label for="star4" title="Pretty good">4 stars</label>
                        <input type="radio" id="star3" name="rating" value="3" onChange={this.handleRate}/><label for="star3" title="Meh">3 stars</label>
                        <input type="radio" id="star2" name="rating" value="2" onChange={this.handleRate}/><label for="star2" title="Kinda bad">2 stars</label>
                        <input type="radio" id="star1" name="rating" value="1" onChange={this.handleRate}/><label for="star1" title="Sucks big time">1 star</label>
                        {/* <input type="radio" onClick={(e) => {this.handleEntailmentRequest(e)}} id="star5" name="rating" value="5" /><label for="star5" title="Rocks!">5 stars</label>
                        <input type="radio" onClick={(e) => {this.handleEntailmentRequest(e)}} id="star4" name="rating" value="4" /><label for="star4" title="Pretty good">4 stars</label>
                        <input type="radio" onClick={(e) => {this.handleEntailmentRequest(e)}} id="star3" name="rating" value="3" /><label for="star3" title="Meh">3 stars</label>
                        <input type="button"  id="star2" name="rating" value="2" /><label for="star2" title="Kinda bad">2 stars</label>
                        <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="Sucks big time">1 star</label> */}
                </fieldset>
                    
                </Form.Group>
                  </Card.Header>
                  <Card.Header>
                      <Form.Label>Previous Comments</Form.Label>
                      <ListGroup>
                      {this.state.ready ?
                        (this.state.recipeComments.map(eachComment=>{
                          return <ListGroupItem>
                              <p><strong><q>{eachComment.description}<br/><br/> Rating:{eachComment.rating}</q></strong></p>
                              <div className="previous-comments"><img src={eachComment.avatar} alt="Avatar" class="avatar"></img>
                              <h4 className="pc-user">{eachComment.username}</h4>
                              </div>
                          </ListGroupItem>
                        }))
                      : 
                      ("Loading")
                      }
                          {/* <ListGroupItem>
                              
                              <p><strong><q>This recipe my whole family loved. If I were to change one thing I would add more butter</q></strong></p>
                              <div className="previous-comments"><img src="https://www.w3schools.com/w3images/avatar2.png" alt="Avatar" class="avatar"></img>
                              <h4 className="pc-user">-Michael Cooper</h4>
                              </div>
                          </ListGroupItem> */}
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
 