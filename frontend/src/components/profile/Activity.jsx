import React, { Fragment, Component } from 'react';
import { Container, Card, ListGroup, Button, ButtonGroup,} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import actions from '../../services/index';

var Coverflow = require ('react-coverflow');

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
            if (profileFound.data[0].activity.length >0){
              actions.findActivityRecipes({UserID:this.props.user._id}).then(activityFound=>{
                console.log('acitivites returned',activityFound.data)
                this.setState({
                    recentActivity: [...activityFound.data],
                    ready2: true
                })
              })
            }
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
                <h1 className="prof-title">{this.state.ready2 ? <span>Account Activity | {this.props.user.email}</span>:("Loading")}</h1>
                
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
    
    <div>
                <Coverflow
                    width={960}
                    height={480}
                    displayQuantityOfSide={2}
                    navigation={false}
                    enableHeading={false}
                >
                    
                    {x.map(eachRecipe => {
                    {/* console.log(eachRecipe) */}
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

export default Activity;