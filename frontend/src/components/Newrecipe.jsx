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
        dishtype:"Breakfast",
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

    // handleChange = e => {
    //   console.log(this.state)
    //   this.setState({[e.target.name]: e.target.value})
    // }

    // handleSubmit = e => {
    //     e.preventDefault()
    //         actions.newRecipe(this.state)
    //         .then(recipe=> {
    //             console.log(recipe) 
    //         }).catch(({ response }) => console.error(response));
    // }
    handlePersonTyping = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({
            
            
            
            [e.target.name]:e.target.value,
        
        
        })
       
     }

    putCategoryInState = (e) => {
        console.log('putCategoryInState is being called')
        let categoryArr = this.state.category;
        categoryArr.push(e.target.value)
        console.log(categoryArr)
        this.setState({
            
            category:categoryArr
        
        }) 
    }

    putDishTypeInState = (e) => {
        console.log('putDishTypeInState is being called')
        console.log(e.target.value)
        this.setState({
            
            dishtype: e.target.value
        
        }) 
    }

    // putCuisineInState = (e) => {
    //     console.log('putCuisineInState is being called')
    //     console.log(this.state.title)
    //     this.setState({
            
    //         title: e.target.value
        
    //     }) 
    // }
  
  


    // 'Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'


    render() {
        return (
            <div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="Title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" type="text" placeholder="Enter title" onChange={this.handlePersonTyping} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="Area">
                        <Form.Label>Area</Form.Label>
                        <Form.Control name="cuisine" type="text" placeholder="Area???How is this different from cuisine" onChange={this.handlePersonTyping}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="Ingredients">
                        <Form.Label>Ingredients</Form.Label>
                        <Form.Control name="ingredient1"  type="text" placeholder="Add your ingredients" onChange={this.handlePersonTyping}/>
                    </Form.Group>

                    <Form.Group controlId="Measurments">
                        <Form.Label>Measurments</Form.Label>
                        <Form.Control name="measurement1" type="text" placeholder="Add your measurments" onChange={this.handlePersonTyping}/>
                    </Form.Group>

                    <Form.Group controlId="Video">
                        <Form.Label>Video</Form.Label>
                        <Form.Control name="video" type="text" placeholder="Add your video URL" onChange={this.handlePersonTyping}/>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="Instructions">
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control name="instructions" type="text" placeholder="Add your instructions" onChange={this.handlePersonTyping}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="Instructions">
                        <Form.Label>Image</Form.Label>
                        <Form.Control name="image" type="text" placeholder="Add your image URL" onChange={this.handlePersonTyping}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Dish Type</Form.Label>
                        <Form.Control as="select" onChange={this.putDishTypeInState}>
                            <option>Breakfast</option>
                            <option>Dish</option>
                            <option>Snack</option>
                            <option>Dessert</option>
                            <option>Other</option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCuisine">
                        <Form.Label>Cuisine</Form.Label>
                        <Form.Control placeholder="ex: American, French, Jamaican"/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group id="categoryGridCheckbox">
                    <Form.Label>Category</Form.Label>
                        <Form.Check type="checkbox" label="Vegetarian" value="Vegetarian" name="category" onChange={this.putCategoryInState}/>
                        <Form.Check type="checkbox" label="Vegan" value="Vegan" onChange={this.putCategoryInState}/>
                        <Form.Check type="checkbox" label="Pork" value="Pork" onChange={this.putCategoryInState}/>
                        <Form.Check type="checkbox" label="Chicken" value="Chicken" onChange={this.putCategoryInState}/>
                        <Form.Check type="checkbox" label="Beef" value="Beef" onChange={this.putCategoryInState}/>
                        <Form.Check type="checkbox" label="Seafood" value="Seafood" onChange={this.putCategoryInState}/>
                        <Form.Check type="checkbox" label="Other" value="Other" onChange={this.putCategoryInState}/>
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