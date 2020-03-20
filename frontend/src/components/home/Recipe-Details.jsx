//Can attempt to extract info from object received and if saved send info to create recipe

import React, { Component } from 'react';
import { ToggleButton, ToggleButtonGroup, Container, Form, Card, ListGroup, ListGroupItem,Button, ButtonGroup,  } from 'react-bootstrap';
import actions from '../../services/index'





class RecipeDetails extends Component {
  state={
      className: ["secondary", "danger", "none"],
      profileID: {},
      ready:false,
      recipeComments: []
  }

  async componentDidMount(){
      console.log(this.props)
      actions.findRecipeID(this.props.match.params.recipeID)
      .then(recipeFound => {
          console.log(recipeFound.data.title)
          actions.addActivityRecipes({title: recipeFound.data.title})
          this.setState({
              ...recipeFound.data
          })
      })
          .catch(err => console.log(err))
          document.querySelector("#heart").style["color"]='white'
          actions.findProfileRecipes()
          .then(myRecipes=>{
              console.log('about to loop through array',myRecipes.data)
              myRecipes.data.map(eachRecipe=>{
              if (eachRecipe._id===this.state._id){
                document.querySelector("#heart").style["color"]='red'
              }
              })
            })
          .catch(err => console.log(err))
          
      actions.getRecipeComments(this.props.match.params.recipeID).then(recipeComments=>{
      this.setState({recipeComments:recipeComments.data, ready:true})
      console.log('recipecomments',recipeComments.data)
      })
      .catch(err=>console.log(err))
       
      
      actions.getProfile(this.props.user._id).then(profileFound=>{
        console.log('profileFound',profileFound.data[0]._id)
        this.setState({profileID:profileFound.data[0]._id,profileUser:profileFound.data[0].username,profileAvatar:profileFound.data[0].imageUrl})
      })
      .catch(err => console.log(err))
    }

 handleSave=(e)=>{
  if(document.querySelector("#heart").style["color"]==='red'){
      console.log("handleadelete")
      document.querySelector("#heart").style["color"]='white'
      actions.deleteProfileRecipes({title: this.state.title})
  }else if(document.querySelector("#heart").style["color"]==='white'){
    document.querySelector("#heart").style["color"]='red'
    console.log('handleAdd new recipe to profile',{title: this.state.title})
    actions.addProfileRecipes({title: this.state.title})
  }
}

//   console.log('handlesave recipe to profile by title',{title: this.state.title})
//    actions.addProfileRecipes({title: this.state.title}).then(updateMyRecipes=>{
//      console.log(updateMyRecipes)
//    })
//    .catch(error=> console.log(error))
// }
// handleEntailmentRequest(e) {
//   e.preventDefault();

//   console.log("handle request ");
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
   e.preventDefault()
    console.log('comment rating',this.state.rating)
    let newCommentObj={
      recipeID: this.props.match.params.recipeID,
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
   this.props.history.push(`/commented`)

}
  
  render() {
    console.log(this.state.rating)
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
              <Card.Header><span style={{color:'white'}}>Ingredients:</span>
              <ListGroup>
               {/* <ListGroupItem className="main-card-subtitle prep-time">  */}
                 {console.log(this.state.ingredients)}
                {this.state.ingredients && this.state.ingredients.map((item,i) => {
                return <ListGroupItem className="list-item text-center" key={i}>{i+1})  <span> {item} </span><hr></hr></ListGroupItem>})}
                </ListGroup>
              </Card.Header>
              <Card.Header><span style={{color:'white'}}>Measurements:</span>
              <ListGroup>
                {this.state.measurements && this.state.measurements.map((item,i) => {return <ListGroupItem className="list-item" key={i}><span> {item} </span><hr></hr></ListGroupItem>})}
                {/* </ListGroupItem> */}
                
              </ListGroup>
                
              </Card.Header>
              </Card.Body>
              <Card.Body>
                <Card>
                <Card.Header>
                <ButtonGroup className="btn-group" aria-label="Basic example">
                    <Button classname="main-card-source" onClick={this.handleSave} variant="secondary" name="save-btn" size="lg"><i id="heart" className="fas fa-heart fa-2x"></i></Button>
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

export default RecipeDetails;
 