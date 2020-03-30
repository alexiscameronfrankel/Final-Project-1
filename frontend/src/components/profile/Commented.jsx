import React, { Fragment, Component } from 'react';
import { Container, Card, ListGroup, Button, ButtonGroup } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import actions from '../../services';



var Coverflow = require('react-coverflow');
class Commented extends Component {

  state={
    ready:false,
    
  }
    async componentDidMount(){
      let commentArray=[]
      console.log('inside did mount')
      let commentsReturned= await actions.findProfileComments(this.props.user._id)
      // .then(commentsReturned=>{
        console.log('inside find comments for profile',commentsReturned)
        commentsReturned.data.forEach(eachComment=>{
          console.log(eachComment)  
            actions.findRecipeID(eachComment.recipeID).then(eachRecipe=>{
              eachComment.recipeImage = eachRecipe.data.imageUrl
              eachComment.recipeTitle = eachRecipe.data.title
              commentArray.push(eachComment)
              this.setState({ allComments: commentArray, ready:true})
            })
            .catch(err=> console.log(err))
        })
    
    }
     
    render(){ 
      let x=this.state.allComments
      console.log(this.state.ready,x)
    return (
        <div>
           
            <Container className="home-recipe">
          
          
          <Card id="main-card" 
          style={{ width: '100%' }}>
          
          <Card.Title className="text-center">
            <Card.Header>
            <h1 className="prof-title">Account Activity | {this.props.user.email}</h1>
                
            </Card.Header> 
          </Card.Title>
          <Card.Header>
          <Card.Img className="prof-cover" variant="top" src="http://www.ironchefamerica.tv/us/images/lets-get-cooking.jpg "/>
          </Card.Header>
        </Card>
        <div className="settings">
        <Card className="sm-card" id="main-card" style={{ width: '18rem' }}>
            <Card.Header>Settings</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item className="settings-links"><Link to="/profile"><Button className="settings-button" ><i class="fas fa-user-circle"></i> Profile</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/myrecipes"><Button className="settings-button" ><i class="fas fa-list"></i> MyRecipes</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/myactivity"><Button className="settings-button" ><i class="fas fa-chart-line"></i> Activity</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/log-out"><Button className="settings-button" ><i class="fas fa-sign-out-alt"></i> Logout</Button></Link></ListGroup.Item>
            </ListGroup>
        </Card>
        <Card className="sm-card" id="main-card" style={{ width: '100%' }}>
            <Card.Header>Recent Account Activity
            <ButtonGroup>
                <Link to="/myactivity"> <Button variant="secondary" className="settings-button">Viewed</Button></Link>
                <Link to="/liked"> <Button variant="secondary" className="settings-button">Liked</Button></Link>
                <Link to="/commented">  <Button variant="secondary" className="settings-button">Commented</Button></Link>
                    <Link to="/uploaded"> <Button variant="secondary" className="settings-button">Uploaded</Button> </Link>

                </ButtonGroup>
            </Card.Header>
            <Card>
            <Card.Header className="recent-views">Recently Commented Recipes</Card.Header>
            {this.state.ready ?
    
    
                <Coverflow
                    width={960}
                    height={480}
                    displayQuantityOfSide={2}
                    navigation={false}
                    enableHeading={false}
                >
                    
                    {x.map(eachComment => {
                    console.log(eachComment)
                    return (<Fragment>
                        <div key={eachComment._id}
                    // {/* // onClick={() => fn()}
                    // // onKeyDown={() => fn()} */}
                    role="menuitem"
                    tabIndex="2"
                    >   
                        
                        <Card.Title 
                        className="text-center">
                        <Link className="recipe-card" to={`/allrecipes/${eachComment.recipeID}`}>
                        {eachComment.recipeTitle}<br/>
                        Rating: {eachComment.rating}
                        </Link>
                        </Card.Title>
                        <Card.Img
                            src={eachComment.recipeImage}
                            alt={eachComment.recipeTitle}
                            style={{ display: 'block', width: '100%' }}
                            // href={`/allrecipes/${eachRecipe._id}`}
                        />
                        {/* <Card.Text>{eachComment.description}<br/>{eachComment.rating}</Card.Text> */}
                        
                        </div>
                        
                        </Fragment>)
                        })}
               </Coverflow>
                
              :("Loading")}
           
            </Card>

            
            
           
            
        </Card>
        </div>
        
        
        </Container>
        </div>
    );
}
}

export default Commented;