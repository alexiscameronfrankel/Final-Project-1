import React, { Component, Fragment } from 'react';
import actions from '../../services/index';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBAnimation } from 'mdbreact';
import { MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";

class SignUp extends Component {
    state = {

    } 
    handleChange = e => {
        console.log(this.state, e.target.name)
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
            actions.signUp(this.state).then(user=> {
                this.props.setUser({...user.data})
                console.log(user.data)
                let initialProfile={
                    UserID: user.data._id,
                    username: this.state.username,
                    firstName: this.state.firstName, 
                    lastName: this.state.lastName,
                    image: '',
                    dietPreference: 'None',
                    allergies: [],
                    recipes: [],
                    activity: []
                } 
                actions.newProfile(initialProfile).then(profile=>{
                    console.log('profile success',profile)
                    // console.log(this.state.firstName, "saved")
                    window.location.href = "http://localhost:3000/profile"
                }).catch(({err}) => console.log(err))
            }).catch(({ response }) => console.error(response));
    }
    render() {
        return (
            <div className="signup_bg">
                <Fragment>
                <MDBAnimation type="bounce">
                    <MDBContainer>
                        <MDBRow>
                        <MDBCol md="12">
                            <form className="auth-styles">
                            
                            <p className="h2 text-center mb-4">Sign Up</p>
                            
                            <div className="grey-text">
                                <MDBInput name="email" label="Type your email" icon="envelope" group type="email" validate error="wrong"
                                success="right" onChange={this.handleChange}/>
                                <MDBInput name="firstName" label="Type your first name" icon="user"  validate onChange={this.handleChange}/>
                                <MDBInput name="lastName" label="Type your last name" icon="user"  validate onChange={this.handleChange}/>
                                <MDBInput name="username" label="Type your username" icon="user-circle"  validate onChange={this.handleChange}/>
                                <MDBInput name="password" label="Type your password" icon="lock" group type="password" validate onChange={this.handleChange}/>
                            </div>
                        <div className="text-center">
                        <MDBBtn gradient="peach" onClick={this.handleSubmit}>Sign Up</MDBBtn>
                        </div>
                        
                      
                    <div className="text-center">
                    or go to  <Link to="/log-in"> LOGIN </Link>
                    </div>


                        </form>
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
                </MDBAnimation>
                    {/*....old sign up form.... <form onSubmit={this.handleSubmit}>
                        <input name="email" type="email" onChange={this.handleChange} />
                        <input name="password" type="password" onChange={this.handleChange} />
                        <input type="submit" value="Sign Up"/>
                    </form> */}
                </Fragment>
            </div>
        );
    }
}

export default SignUp;