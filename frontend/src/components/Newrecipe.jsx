import React, { Component, Fragment } from 'react';

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
        ingredients: [""],
        measurements: [""],
        instructions: [""],
        image: "", 
        video: "",
        tags: [],
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

//I THINK YOU CAN DELETE ALL THIS COMMENTED STUFF.....GO THROUGH IT

    // addIngredientColumn = (e) => {
    //     <Form.Group controlId="Measurments">
    //     <Form.Label>Measurments</Form.Label>
    //     <Form.Control name="measurement1" type="text" placeholder="Add your measurments" onChange={this.handlePersonTyping}/>
    //     </Form.Group>
    // }

    // addIngredient = (e) => {
    //     this.setState({
            
    //         dishtype: e.target.value
        
    //     }) 
    // }

    // putCuisineInState = (e) => {
    //     console.log('putCuisineInState is being called')
    //     console.log(this.state.title)
    //     this.setState({
            
    //         cuisine: e.target.value
        
    //     }) 
    // }
  
  


///HANDLE TYPING FUNCTIONALITY 

    handleIngredientsTyping = (e) => {
        console.log(e.target.name, e.target.value);
        let ingredientsCopy = [...this.state.ingredients]
        ingredientsCopy[e.target.name] = e.target.value
        this.setState({
            ingredients: ingredientsCopy,
        })
     }

     handleMeasurementTyping = (e) => {
        console.log(e.target.name, e.target.value);
        let measurementsCopy = [...this.state.measurements]
        measurementsCopy[e.target.name] = e.target.value
        this.setState({
            measurements: measurementsCopy,
        })
     }

     handleInstructionTyping = (e) => {
        console.log(e.target.name, e.target.value);
        let instructionsCopy = [...this.state.instructions]
        instructionsCopy[e.target.name] = e.target.value
        this.setState({
            instructions: instructionsCopy,
        })
     }

///ADDING ROW FUNCTIONALITY 

     addIngredientRow = () => {
         console.log("inside add this ingredient")
         let ingredientsCopy = [...this.state.ingredients]
         ingredientsCopy.push("")
         console.log(ingredientsCopy)
         this.setState({
             ingredients: ingredientsCopy
         })
     }

     addMeasurementRow = () => {
        console.log("inside add this measurement")
        let measurementsCopy = [...this.state.measurements]
        measurementsCopy.push("")
        this.setState({
            measurements: measurementsCopy
        })
    }

    addInstructionsRow = () => {
        console.log("inside add this instructions")
        let instructionsCopy = [...this.state.instructions]
        instructionsCopy.push("")
        console.log(instructionsCopy)
        this.setState({
            instructions: instructionsCopy
        })
    }

// DELETING ROW FUNCTIONALITY 

    deleteInstruction = () => {
        console.log("inside delete instruction")
        let instructionsCopy = [...this.state.instructions]
        instructionsCopy.pop()
        console.log(instructionsCopy)
        this.setState({
            instructions: instructionsCopy
        })
    }

    //not really sure why the method below works

    deleteIngredient = (e,index) => {
        e.preventDefault()
        console.log("inside delete ingredient")
        let ingredientsCopy = [...this.state.ingredients]
        ingredientsCopy.splice(index, 1);
        console.log(ingredientsCopy)
        this.setState({
            ingredients: ingredientsCopy
        })
    }

    deleteMeasurement = (e,index) => {
        e.preventDefault()
        console.log("inside delete measurement")
        let measurementsCopy = [...this.state.measurements]
        measurementsCopy.splice(index, 1);
        console.log(measurementsCopy)
        this.setState({
            measurements: measurementsCopy
        })
    }


    
    render() {
        return (
            <div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="Title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" type="text" placeholder="Enter title" onChange={this.handlePersonTyping} />
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicCheckbox">
                        <Form.Label>Category</Form.Label>
                        <Form.Check type="checkbox" label="Vegetarian" value="Vegetarian" name="category" onChange={this.putCategoryInState}/>
                        <Form.Check type="checkbox" label="Vegan" value="Vegan" name="category" onChange={this.putCategoryInState}/>
                        </Form.Group>

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
                    </Form.Row>

                    <Form.Group controlId="Ingredients">
                        <Form.Label>Ingredients</Form.Label>
                        {/* <Form.Control name="ingredient1"  type="text" placeholder="Add your ingredients" onChange={this.handlePersonTyping}/> */}
                        {this.state.ingredients.map((eachIngredient, index) => {
                            return(
                            <Fragment>
                            <Form.Control name={index} type="text" placeholder="Add your ingredients"  value={eachIngredient} onChange={this.handleIngredientsTyping}/>
                            <Button variant="secondary" size="sm" onClick={(e) => this.deleteIngredient(e,index)}>
                           DELETE INGREDIENT
                            </Button>
                            </Fragment>)
                        })}
                        <Button variant="secondary" size="sm" onClick={this.addIngredientRow}>
                            ADD INEGREDIENT
                        </Button>
                    </Form.Group>


                    <Form.Group controlId="Measurements">
                        <Form.Label>Measurements</Form.Label>
                        {this.state.measurements.map((eachMeasurement, index) => 
                             {
                            return(
                            <Fragment>
                            <Form.Control name={index} type="text" placeholder="Add your measurements" value={eachMeasurement} onChange={this.handleMeasurementTyping}/>
                            <Button variant="secondary" size="sm" onClick={(e) => this.deleteMeasurement(e,index)}>
                           DELETE MEASUREMENT
                            </Button>
                            </Fragment>)
                            
                        })}
                        <Button variant="secondary" size="sm" onClick={this.addMeasurementRow}>
                           ADD MEASUREMENT
                        </Button>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Instructions">
                        <Form.Label>Instructions</Form.Label>
                        {this.state.instructions.map((eachInstruction, index) => {
                            return(
                            <Fragment>
                            <Form.Control name={index} type="text" placeholder="Add your instructions" onChange={this.handleInstructionTyping}
                            />
                             <Button variant="secondary" size="sm" onClick={this.deleteInstruction}>
                           DELETE INSTRUCTION
                    </Button>
                            </Fragment>)
                        })}
                    <Button variant="secondary" size="sm" onClick={this.addInstructionsRow}>
                           ADD INSTRUCTION
                    </Button>
                    {/* <Button variant="secondary" size="sm" onClick={this.deleteInstruction}>
                           DELETE INSTRUCTION
                    </Button> */}
                    </Form.Group>

                    <Form.Group controlId="Video">
                        <Form.Label>Video</Form.Label>
                        <Form.Control name="video" type="text" placeholder="Add your video URL" onChange={this.handlePersonTyping}/>
                    </Form.Group>

                    <Form.Row>

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

                    <Form.Row>
                        <Form.Group as={Col} controlId="Instructions">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control name="ProfileID" type="text" placeholder="Add your display name " onChange={this.handlePersonTyping}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="Instructions">
                        <Form.Label>Image</Form.Label>
                        <Form.Control name="image" type="text" placeholder="Add your image URL" onChange={this.handlePersonTyping}/>
                        </Form.Group>
                    </Form.Row>

                    {/* <Form.Group id="categoryGridCheckbox">
                    <Form.Label>Category</Form.Label>
                        <Form.Check type="checkbox" label="Vegetarian" value="Vegetarian" name="category" onChange={this.putCategoryInState}/>
                        <Form.Check type="checkbox" label="Vegan" value="Vegan" onChange={this.putCategoryInState}/>
                        <Form.Check type="checkbox" label="Pork" value="Pork" onChange={this.putCategoryInState}/>
                        <Form.Check type="checkbox" label="Chicken" value="Chicken" onChange={this.putCategoryInState}/>
                        <Form.Check type="checkbox" label="Beef" value="Beef" onChange={this.putCategoryInState}/>
                        <Form.Check type="checkbox" label="Seafood" value="Seafood" onChange={this.putCategoryInState}/>
                        <Form.Check type="checkbox" label="Other" value="Other" onChange={this.putCategoryInState}/>
                    </Form.Group> */}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                
            </div>
        );
    }
}

export default Newrecipe;