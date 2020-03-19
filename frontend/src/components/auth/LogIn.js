import React, { Component, Fragment } from 'react';
import actions from '../../services/index';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,MDBAnimation } from 'mdbreact';
import { Link } from "react-router-dom";


class LogIn extends Component {

    state = {

    } 
    handleChange = e => {
        console.log(e.target.name,e.target.value, '?????')
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
         actions.logIn(this.state).then(user => {
            this.props.setUser({...user.data}) 
            window.location.href = "http://localhost:3000/myRecipes" 
        }).catch(({ response }) => {
         
                console.log('error loading',response)
            
        })
    
}
    render() {
        return (

            

            
            <Fragment>
            <div className="login_bg">
            <MDBAnimation type="bounce">
                <MDBContainer>
                    <MDBRow>
                    <MDBCol md="12">
                        <form className="auth-styles" onSubmit={this.handleSubmit}>
                        
                        <p className="h2 text-center mb-4">Login</p>
                        
                        <div className="grey-text">
                        <form>
                            <MDBInput name="email" label="Type your email" icon="envelope" group type="email" validate error="wrong"
                            success="right" onChange={this.handleChange} />
                            <MDBInput name="password" label="Type your password" icon="lock" group type="password" validate onChange={this.handleChange}/>
                        </form>
                        </div>
                    <div className="text-center">
                    
                    <MDBBtn gradient="peach" type="submit">Login</MDBBtn>
                  
                  
                    </div>
                    <div className="text-center">
                    or go to<Link to="/sign-up"> SIGN UP</Link>
                    </div>
                    </form>
                </MDBCol>
                </MDBRow>
            </MDBContainer>
            </MDBAnimation>
                {/* here's the old login form.... <h2>LogIn</h2>
                <form onSubmit={this.handleSubmit}>
                    <input name="email" type="email" onChange={this.handleChange} />
                    <input name="password" type="password" onChange={this.handleChange} />
                    <input type="submit" value="Log In"/>
                </form> */}
                </div>
            </Fragment>
          
           
            
           
    
            
        );
    }
}

export default LogIn;