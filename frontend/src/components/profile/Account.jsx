import React, { Component } from 'react';
import service from '../../services/service';
import { Container, Card, ListGroup, Button, Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import actions from '../../services/index';

class Account extends Component {
    state={
    UserID: this.props.user._id,
    username: "",
    firstName: "", 
    lastName: "",
    imageUrl: "",
    dietPreference: [],
    allergies: [],
    recipes: [],
    activity: []
    }
      async componentDidMount(){
         actions.getProfile(this.props.user._id).then(profileFound=>{
            console.log(profileFound.data[0]) 
            this.setState({...profileFound.data[0]})
            document.querySelectorAll('#checkbox').forEach(checkbox=>{
                if (profileFound.data[0].dietPreference.includes(checkbox.value)){
                    checkbox.checked=true
                }else{
                    checkbox.checked=false
                }
            })
         })
        }

        putCategoryInState = (e) => { 
            console.log(e.target.value, e.target.checked)
            let dietPreferenceArr = [...this.state.dietPreference];
            if(e.target.checked){
                dietPreferenceArr.push(e.target.value)
    
            }else {
               dietPreferenceArr =  dietPreferenceArr.filter(cat => {
                   return cat !== e.target.value
                   
               })
            }
            this.setState({
                
               dietPreference:dietPreferenceArr
            
            }) 
         }
    handleFileUpload = e => {
        console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/things/create' POST route
        uploadData.append("imageUrl", e.target.files[0]);
        
        service.handleUpload(uploadData)
        .then(response => {
            console.log('response is: ', response.secure_url,this.state);
            // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
            this.setState({ imageUrl: response.secure_url });
        })
        .catch(err => {
            console.log("Error while uploading the file: ", err);
        });
    }
    handleChange=(e)=>{
        console.log(e.target.name,e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        actions.updateProfile(this.state)
        .then(profileUpdated =>{ 

            console.log('profileupdated',profileUpdated)
        })
        .catch(error=> console.log('error occurred',error))
        this.props.history.push("/profile")
    }  
  
    render (){
        console.log(this.state)
        
    return (
        <div>
           
            <Container className="home-recipe">
        
          <Card id="main-card" 
          style={{ width: '100%' }}>
          
          <Card.Title className="text-center">
            <Card.Header>
                <h1 className="prof-title">Account Preferences | {this.state.username}</h1>
            </Card.Header> 
          </Card.Title>
          <Card.Header>
          <Card.Img className="prof-cover" variant="top" src="http://www.ironchefamerica.tv/us/images/lets-get-cooking.jpg "/>
          </Card.Header>
        </Card>
        <div className="settings">
        <Card className="sm-card" id="main-card" style={{ width: '18rem' }}>
            <Card.Header>Settings</Card.Header>
            <Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item className="settings-links"><Link to="/profile"><Button className="settings-button" ><i class="fas fa-user-circle"></i> Profile</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/myrecipes"><Button className="settings-button" ><i class="fas fa-list"></i> MyRecipes</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/myactivity"><Button className="settings-button" ><i class="fas fa-chart-line"></i> Activity</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/log-out"><Button className="settings-button" ><i class="fas fa-sign-out-alt"></i> Logout</Button></Link></ListGroup.Item>
            </ListGroup>
            </Card.Header>
        </Card>
        <Card className="sm-card" id="main-card" style={{ width: '100%' }}>
            <Card.Header>Account Preferences</Card.Header>
            <Card className="profile-prefs">
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label for="exampleInputEmail1">Change User Preferences </Form.Label>
                    <small id="userHelp" className="form-text text-muted">Username must be unique</small>
                    <Form.Control onChange={this.handleChange} name="username" type="username" className="form-control" id="exampleInputEmail1" aria-describedby="UserHelp" placeholder={this.state.username} />
                    <small id="fNameHelp" className="form-text text-muted">First Name (Optional)</small>
                    <Form.Control onChange={this.handleChange} name="firstName" type="firstname" className="form-control" id="exampleInputEmail1" aria-describedby="FirstNameHelp" placeholder={this.state.firstName} />
                    <small id="lNameHelp" className="form-text text-muted">Last Name (Optional)</small>
                    <Form.Control onChange={this.handleChange} name="lastName" type="lastname" className="form-control" id="exampleInputEmail1" aria-describedby="LastNameHelp" placeholder={this.state.lastName} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="hidden" name="MAX_FILE_SIZE" value="4194304" />
                    <Form.Control name="avatar" placeholder="Upload Avatar Image" type="file" 
                    onChange={this.handleFileUpload}/>
                    <small id="emailHelp" className="form-text text-muted">Avatar Upload. 4MB Maximum.</small>
                    {/* <Form.Control onChange={this.handleChange} name="imageUrl" placeholder="Input Avatar Image URL" type="link"/>
                    <small id="emailHelp" className="form-text text-muted">Example: "www.google.com/images/imagename.jpg"</small> */}

                </Form.Group>
           
                <Form.Group id="categoryGridCheckbox">
                <Form.Label>Please Select Any Dietary Restrictions Below</Form.Label>
                    <Form.Check id="checkbox" type="checkbox" label="Vegetarian" value="Vegetarian" name="category" onChange={this.putCategoryInState}/>
                    <Form.Check id="checkbox" type="checkbox" label="Vegan" value="Vegan" onChange={this.putCategoryInState}/>
                    <Form.Check id="checkbox" type="checkbox" label="Gluten Free" value="Gluten Free" onChange={this.putCategoryInState}/>
                    <Form.Check id="checkbox" type="checkbox" label="Diary Free" value="Diary Free" onChange={this.putCategoryInState}/>
                    <Form.Check id="checkbox" type="checkbox" label="Preganancy Friendly" value="Pregnancy Friendly" onChange={this.putCategoryInState}/>
                    <Form.Check id="checkbox" type="checkbox" label="None" value="None" onChange={this.putCategoryInState}/>
                    
                </Form.Group>
                
                

                <Button type="submit" size="lg" className="btn btn-primary account-button" block>Submit</Button>
                
                </Form>
            </Card>
           
            
        </Card>
        </div>
        
        
        </Container>
        </div>
        
    );
}
}
export default Account;