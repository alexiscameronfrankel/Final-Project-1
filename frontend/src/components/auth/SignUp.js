import React, { Component, Fragment } from 'react';
import actions from '../../services/index';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBAnimation } from 'mdbreact';
import { MDBBtn } from "mdbreact";

class SignUp extends Component {
    state = {

    } 
    handleChange = e => {
        console.log(this.state)
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
            actions.signUp(this.state).then(user=> {
                this.props.setUser({...user.data})  
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
                                <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                                success="right" />
                                <MDBInput label="Type your password" icon="lock" group type="password" validate />
                            </div>
                        <div className="text-center">
                        <MDBBtn gradient="peach">Sign Up</MDBBtn>
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