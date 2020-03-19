import React, { Fragment, Component } from 'react';
import { Container, Card, ListGroup, Button, ButtonGroup,} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import actions from '../../services/index';
import InfiniteCarousel from 'react-leaf-carousel';

var Coverflow = require('react-coverflow');

class Activity extends Component {
  
  state={
    ready:false,
    recentActivity: [],
    ready2: false
  }
    async componentDidMount(){
        actions.getProfile(this.props.user._id).then(profileFound=>{
          this.setState({
              ...profileFound.data[0],
              ready: true
          })
             
              actions.findActivityRecipes({UserID:this.props.user._id}).then(activityFound=>{
                console.log('recent activities found',activityFound.data)
                let array1= [...activityFound.data]; //copy of recent recipes visits
                console.log('array1',array1)
                // let array2= Array.from(new Set(array1)) //new Array made with unique values
                // console.log('array2',array2) 
                let x=array1.length-6 
                let array3=array1.splice(x,6) //get last 6 recipes from array1
                console.log('array3',array3)
                // let activityUpdate = []
                // array2.forEach(eachRecipe=>{    //for each recipe in array2 push recipeID into activityUpdate array
                //   activityUpdate.push(eachRecipe._id)
                // })
                // console.log('activitytoupdate',activityUpdate)
                // actions.updateProfile({activity: activityUpdate})//update profile with activityUpdate

                this.setState({
                    // recentActivity: [...activityFound.data],
                    recentActivity: array3, //set this state to array3 that has 6 recipes total
                    ready2: true
                })
              })
            
        })
        .catch(error => console.log("yousuck!"))
    }
    render(){ 
     let x=this.state.recentActivity
     console.log(this.state.ready2,x)
    
    return (

        <div>
            
          <Container className="home-recipe">
          <Card id="main-card" 
          style={{ width: '100%' }}>
          
          <Card.Title className="text-center">
            <Card.Header>
                <h1 className="prof-title">{this.state.ready ? <span>Account Activity | {this.props.user.email}</span>:("Loading")}</h1>
                
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
            <Card.Header className="recent-views">Recently Viewed Recipes</Card.Header>
    {this.state.ready2 ?

  <InfiniteCarousel>
    <div>
          <Card className="past-recipe-card" style={{ width: '100%' }}>            
            <Card.Img variant="top" src={x[5].imageUrl} />
                <Card.Body>
                    <Card.Title>{x[5].title}</Card.Title>
                    <Card.Text>
                    {x[5].tags}
                    </Card.Text>
                    <Button variant="secondary" className="settings-button">View Recipe</Button>
                </Card.Body>
            </Card>
    </div>
    <div>
    <Card className="past-recipe-card" style={{ width: '100%' }}>
            <Card.Img variant="top" src={x[4].imageUrl} />
                <Card.Body>
                    <Card.Title>{x[4].title}</Card.Title>
                    <Card.Text>
                    {x[4].tags}
                    </Card.Text>
                    <Button variant="secondary" className="settings-button">View Recipe</Button>
                </Card.Body>
            </Card>
    </div>
    <div>
    <Card className="past-recipe-card" style={{ width: '100%' }}>
            <Card.Img variant="top" src={x[3].imageUrl} />
                <Card.Body>
                    <Card.Title> {x[3].title}</Card.Title>
                    <Card.Text>
                    {x[3].tags}
                    </Card.Text>
                    <Button variant="secondary" className="settings-button">View Recipe</Button>
                </Card.Body>
            </Card>
    </div>
    <div>
    <Card className="past-recipe-card" style={{ width: '100%' }}>
            <Card.Img variant="top" src={x[2].imageUrl} />
                <Card.Body>
                    <Card.Title>{x[2].title}</Card.Title>
                    <Card.Text>
                    {x[2].tags}
                    </Card.Text>
                    <Button variant="secondary" className="settings-button">View Recipe</Button>
                </Card.Body>
            </Card>
    </div>
    <div>
    <Card className="past-recipe-card" style={{ width: '100%' }}>
            <Card.Img variant="top" src={x[1].imageUrl} />
                <Card.Body>
                    <Card.Title> {x[1].title}</Card.Title>
                    <Card.Text>
                    {x[1].tags}
                    </Card.Text>
                    <Button variant="secondary" className="settings-button">View Recipe</Button>
                </Card.Body>
            </Card>
    </div>
    <div>
    <Card className="past-recipe-card" style={{ width: '100%' }}>
            <Card.Img variant="top" src={x[0].imageUrl} />
                <Card.Body>
                    <Card.Title> {x[0].title}</Card.Title>
                    <Card.Text>
                    {x[0].tags}
                    </Card.Text>
                    <Button variant="secondary" className="settings-button">View Recipe</Button>
                </Card.Body>
            </Card>
    </div>
  </InfiniteCarousel>
 
    :("Loading")}
           
        </Card>
      </Card>
      </div>
     </Container>
    </div>
    )}

}

export default Activity;