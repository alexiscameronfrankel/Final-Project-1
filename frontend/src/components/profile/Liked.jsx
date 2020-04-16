import React, { Fragment, Component } from 'react';
import { Container, Card, ListGroup, Button, ButtonGroup } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import actions from '../../services/index';

var Coverflow = require('react-coverflow');

class Liked extends Component {
    
    // if(!props.user.email){ 
    //     props.history.push('/log-in') 
    // }   
    state={
      ready:false,
      ready2: false
    }

    async componentDidMount (){
        actions.findProfileRecipes(this.props.user._id)
            .then(myRecipes => {
                console.log('myRecipesReceived', myRecipes)
                this.setState({
                    savedRecipes: myRecipes.data,
                    ready2: true
                })})
            .catch(({ response }) => {
             ;
                console.log('error loading',response) 
                this.props.history.push("/log-in")
                   
            })
    }
    
    render (){
      let x=this.state.savedRecipes
     console.log('liked recent acitivites',x)
      console.log(this.props.user.email)
    return (
        <div>
            {/* Profile
            Welcome {props.user.email} !!!  */}
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
            <Card.Header className="recent-views">Recently Liked Recipes</Card.Header>
            {this.state.ready2 ?
    
    <div>
                <Coverflow
                    width={960}
                    height={480}
                    displayQuantityOfSide={2}
                    navigation={false}
                    enableHeading={false}
                >
                    
                    {x.map((eachRecipe,i) => {
                    console.log(eachRecipe)
                    return (<Fragment>
                        <div key={eachRecipe._id}
                    // {/* // onClick={() => fn()}
                    // // onKeyDown={() => fn()} */}
                    role="menuitem"
                    tabIndex="2"
                    >   
                        
                        <Card.Title 
                        className="text-center">
                        <Link className="recipe-card" to={`/allrecipes/${eachRecipe._id}`}>
                        {eachRecipe.title}
                        </Link>
                        </Card.Title>
                        <Card.Img
                            src={eachRecipe.imageUrl}
                            alt={eachRecipe.title}
                            style={{ display: 'block', width: '100%' }}
                            // href={`/allrecipes/${eachRecipe._id}`}
                        />
                        
                        </div>
                        
                        </Fragment>)
                        })}
                        
                    
                    
                </Coverflow>
                
                </div>
                :("Loading")}
           
            </Card>

            
            
           
            
        </Card>
        </div>
        
        
        </Container>
        </div>
    );
}
}

export default Liked;