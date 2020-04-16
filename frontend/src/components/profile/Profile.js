//Need to make this page a class (done)
//add axios call for profile routes
//button onclick method to save profile changes
//onClick of myrecipes > axios route needed for myrecipes in profile model array

import React, { Component } from 'react';
import actions from '../../services/index'
import { Container, Card, ListGroup,
    Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
// import axios from 'axios';



class Profile extends Component {
    state={
        ready:false
    }
    async componentDidMount (){
        actions.getProfile(this.props.user._id)
            .then(profile =>{
                this.setState({
                    ...profile.data[0],
                    ready:true
                })
                console.log('myProfile received', profile.data[0])
            })
            .catch(({ response }) =>{
            console.log('error loading',response)
            this.props.history.push("/log-in")
            })
            actions.findProfileRecipes()
                .then(myRecipes => {
                    console.log('myRecipesReceived', myRecipes)
                    this.setState({...myRecipes.data})
                })
                .catch(({ response }) => {
                
                    console.log('error loading',response) 
                    this.props.history.push("/log-in")  
                })
        };

        

        render (){
            console.log('this is profile state', this.state)
        return (
        <div>
        <Container className="home-recipe">
         
          
          <Card id="main-card" 
          style={{ width: '100%' }}>
          
          <Card.Title className="text-center">
            <Card.Header>
                <h1 className="prof-title"> {this.state.ready ? this.state.username : this.props.user.email} | Dashboard </h1>
            </Card.Header> 
          </Card.Title>
          <Card.Header>
          <Card.Img className="prof-cover" variant="top" src="http://www.ironchefamerica.tv/us/images/lets-get-cooking.jpg" />
          </Card.Header>
        </Card>
        <div className="settings">
        <Card className="sm-card" id="main-card" style={{ width: '18rem' }}>
            <Card.Header>Settings</Card.Header>
            <Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item className="settings-links"><Link to="/account"><Button className="settings-button" ><i class="fas fa-user-cog"></i> Account</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/myrecipes"><Button className="settings-button" ><i class="fas fa-list"></i> MyRecipes</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/myactivity"><Button className="settings-button" ><i class="fas fa-chart-line"></i> Activity</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/log-out"><Button className="settings-button" ><i class="fas fa-sign-out-alt"></i> Logout</Button></Link></ListGroup.Item>
            </ListGroup>
            </Card.Header>
        </Card>
        <Card className="sm-card" id="main-card" style={{ width: '100%' }}>
            <Card.Header>Current Profile</Card.Header>
            <Card.Header>
            {this.state.ready ?
            <div className="prof-avatar">
            <Card.Header>
                <Card.Img className="my-avatar" src={this.state.imageUrl}></Card.Img>
                </Card.Header>
                <Card.Header className="my-avatar-header">
                <ListGroup>
                    <ListGroup.Item className="prof-list-item">Username: <span className="account-info"> {this.state.username} </span></ListGroup.Item>
                    <ListGroup.Item className="prof-list-item">First Name: <span className="account-info"> {this.state.firstName}</span></ListGroup.Item>
                    <ListGroup.Item className="prof-list-item">Last Name: <span className="account-info"> {this.state.lastName}</span></ListGroup.Item>
                </ListGroup>
                <ListGroup>
                    <ListGroup.Item className="prof-list-item">Dietary Preferences: <span className="account-info">{this.state.dietPreference}</span></ListGroup.Item>
                    <ListGroup.Item className="prof-list-item">Allergies: <span className="account-info">{this.state.allergies}</span></ListGroup.Item>
                </ListGroup>
                </Card.Header>
            </div>
                : 
                ("Loading")
            }
            </Card.Header>
            
            <Link className="account-btn" to="/account"><Button type="submit" size="lg" className="btn btn-primary account-button block" ><i className="fas fa-user-cog fa-2x"></i> Account </Button></Link>
            </Card>
            
        
        </div>
        
        
        </Container>
        </div>
        )
}
}

export default Profile;