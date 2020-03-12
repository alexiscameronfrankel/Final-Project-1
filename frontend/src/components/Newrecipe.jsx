import React, { Component } from 'react';
import { Button, Navbar, NavDropdown, Form, FormControl, Container, Col } from 'react-bootstrap'

//below gets current milliseconds elapsed and then converts it to actual date...date is value in created property//

let milliseconds = Date(); 
let date = milliseconds.toString();  

////////////////

class Newrecipe extends Component {

    state = {
        title: "",
        category: [],
        dishtype:"",
        cuisine:"",
        area:"",
        ingredient1:"",
        measurement1: "",
        instructions: "",
        image: "", 
        video: "",
        tags: [],
        source:"",
        comments: [], 
        ProfileID: "",
        created: date
      }

    
          
      handlePersonTyping = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({
            
            
            
            [e.target.name]:e.target.value,
        
        
        }) 

    
        
     }

    //  Vegetarian', 'Vegan','Pork','Chicken','Beef','Seafood','Other


    render() {
        return (
            <div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="Title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" type="text" placeholder="Enter title" onChange={this.handlePersonTyping} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" value="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group id="formGridCheckbox">
                    <Form.Label>Category</Form.Label>
                        <Form.Check type="checkbox" label="Vegetarian" />
                        <Form.Check type="checkbox" label="Vegan" />
                        <Form.Check type="checkbox" label="Pork" />
                        <Form.Check type="checkbox" label="Chicken" />
                        <Form.Check type="checkbox" label="Beef" />
                        <Form.Check type="checkbox" label="Seafood" />
                        <Form.Check type="checkbox" label="Other" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                
            </div>
        );
    }
}

export default Newrecipe;