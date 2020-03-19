//PAST ALEXIS TO FUTURE ALEXIS: Your schema wasn't POSTing to MongoDB because value types were off from the actual model
import React, { Component, Fragment } from 'react';
import service from '../services/service';
import { Button, Form, Col } from 'react-bootstrap';
import actions from '../services/index';
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";
// import ImageUpload from './ImageUpload.js'
// import VideoUpload from './VideoUpload.js'


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
        instructions: "",
        imageUrl: "", 
        video: "",
        tags: "",
        comments: [], 
        profileID: "",
        created: date,
        allrecipes:[],
      }


      async componentDidMount() {
        let recipes = await actions.allRecipes()
        console.log(recipes.data)
        this.setState({
            allrecipes: recipes.data,
            // title: recipes.data[0].title
        })
    }



    //On page load will get profile ID for new recipe
    async componentDidMount(){
        actions.getProfile(this.props.user._id).then(profileFound=>{
            console.log(profileFound.data[0])
            this.setState({
                ProfileID: profileFound.data[0]._id
            })
        })
    }

    handlePersonTyping = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({   
            [e.target.name]:e.target.value,
        })
    }


///HANDLE CHECKBOX FUNCTUNALITY
     putCategoryInState = (e) => { 
        console.log(e.target.value, e.target.checked)
        let categoryArr = [...this.state.category];
        if(e.target.checked){
            categoryArr.push(e.target.value)
            this.setState({
            
                        category:categoryArr
                    
                }) 
            }
        else {
           categoryArr =  categoryArr.filter(cat => {
               return cat !== e.target.value
               
           })
           this.setState({
            
            category:categoryArr
        
            }) 
        }
     }

///SETS STATE PROPERTY DISHTYPE
    putDishTypeInState = (e) => {
        console.log('putDishTypeInState is being called')
        console.log(e.target.value)
        this.setState({
            
            dishtype: e.target.value
        
        }) 
    }

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

     handleTagTyping = (e) => {
        console.log(e.target.name, e.target.value);
        let tagsCopy = [...this.state.tags]
        tagsCopy[e.target.name] = e.target.value
        console.log(this.state.tags)
        this.setState({
            tags: tagsCopy
        })
     }


///ADDING ROW FUNCTIONALITY 

     addIngredientRow = () => {
         console.log("inside add this ingredient")
         console.log("inside add this measurement")
         let ingredientsCopy = [...this.state.ingredients]
         let measurementsCopy = [...this.state.measurements]
         ingredientsCopy.push("")
         measurementsCopy.push("")
         console.log(ingredientsCopy)
         this.setState({
             ingredients: ingredientsCopy,
             measurements: measurementsCopy
         })
     }

///HANDLES DELETE INGREDIENT IN FORM
    deleteIngredient = (e,index) => {
        e.preventDefault()
        console.log("inside delete ingredient")
        let ingredientsCopy = [...this.state.ingredients]
        let measurementsCopy = [...this.state.measurements]
        ingredientsCopy.splice(index, 1);
        measurementsCopy.splice(index, 1);
        console.log(ingredientsCopy)
        console.log(measurementsCopy)
        this.setState({
            ingredients: ingredientsCopy,
            measurements: measurementsCopy
        })
    }

// HANDLE IMAGE UPLOAD 

handleChange = e => {  //THIS IS FOR VIDEO UPLOAD TOO
    const { name, value } = e.target;
    this.setState({ [name]: value });
}

handleImageUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    
    service.handleUpload(uploadData)
    .then(response => {
        console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
}


//HANDLE VIDEO UPLOAD 
handleVideoUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("video", e.target.files[0]);
    
    service.handleUploadVideo(uploadData)
    .then(response => {
        console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
        this.setState({ video: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
}

//SUBMIT FORM FUCNTIONALITY

handleSubmit = e => {
    e.preventDefault();
    
    service.saveNewThing(this.state)
    .then(res => {
        console.log('added: ', res);
        // here you would redirect to some other page 
        // this.props.history.push('/allrecipes/'+res._id);
    })
    .catch(err => {
        console.log("Error while adding the thing: ", err);
    });


}  


    
render() {
    console.log(this.state.allrecipes)
    return (
        <div>
            <Card className="new-recipe-form" border="warning" style={{ width: '50rem', margin: '80px auto'  }}>
            <Card.Header as="h5">Upload New Recipe</Card.Header>
            <Card.Body>
            <Form onSubmit={e => this.handleSubmit(e)}>
                <Form.Row>
                    <Form.Group as={Col} controlId="Title">
                    <Form.Label>Recipe Name</Form.Label>
                    <Form.Control name="title" type="text" placeholder="Enter title" onChange={this.handlePersonTyping} />
                    </Form.Group>

                </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="Ingredients">
                    <Form.Label>Ingredients</Form.Label>
                    {this.state.ingredients.map((eachIngredient, index) => {
                        return(
                        
                        <Form.Control name={index} type="text" placeholder="Add your ingredients"  value={eachIngredient} onChange={this.handleIngredientsTyping}/>
                        ) })}
                        </Form.Group> 

                        <Form.Group as={Col} controlId="Measurements">
                    <Form.Label>Measurements</Form.Label><br />
                    {this.state.measurements.map((eachMeasurement, index) => 
                         {
                        return(
                       
                        <Form.Control name={index} type="text" placeholder="Add measurements" value={eachMeasurement} onChange={this.handleMeasurementTyping}/>
                    
                       )
                        
                    })}
                    {/* <Button variant="secondary" size="sm" onClick={this.addMeasurementRow}>
                       ADD MEASUREMENT
                    </Button> */}
                </Form.Group>
                    {/* <div className="deleteButton"> */}
                        <Form.Group className="deleteButton-div" as={Col} controlId="DeleteButton">
                        <Form.Label> </Form.Label>
                        {this.state.ingredients.map((eachIngredient, index) => {
                            return(
                        <Button variant="secondary" size="sm"  className="deleteButton" value={eachIngredient} onClick={(e) => this.deleteIngredient(e,index)}>
                       DELETE INGREDIENT
                        </Button>
                        ) })}
                        </Form.Group> 
                    {/* </div> */}
        </Form.Row>

                <Form.Group>
                 <Button variant="secondary" size="sm" onClick={this.addIngredientRow}>
                            ADD INEGREDIENT
                </Button>
                    
                </Form.Group>

                <Form.Group controlId="Instructions">
                    <Form.Label>Instructions</Form.Label>
                    <Form.Control as="textarea" rows="3" name="instructions" type="text" placeholder="Type your instructions" onChange={this.handlePersonTyping}/>
                    {/* {this.state.instructions.map((eachInstruction, index) => {
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
                </Button> */}
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
                    <Form.Control name="cuisine" placeholder="ex: American, French, Jamaican" onChange={this.handlePersonTyping}/>
                    </Form.Group>
                </Form.Row>
                

                <Form.Row>
                    <Form.Group controlId="Video">
                        <Form.Label>Video</Form.Label>
                        <Form.Text>
                        <input 
                    type="file" 
                    onChange={(e) => this.handleVideoUpload(e)} /> 
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Image">
                    <Form.Label>Image</Form.Label>
                    <Form.Text>
                    <input 
                type="file" 
                onChange={(e) => this.handleImageUpload(e)} /> 
                     </Form.Text>
                    </Form.Group>
                </Form.Row>
        {/* BELOW WHERE TAGS INPUT IS */}
         <Form.Group controlId="Tags">
            <Form.Label>Tags</Form.Label>
            <Form.Control name="tags" type="text" placeholder="Seperate with commas" onChange={this.handlePersonTyping}/>
                    {/* {this.state.tags.map((eachTag, index) => 
                         {
                        return(
                        <Fragment>
                        <Form.Control name={index} type="text" placeholder="Add your tags" value={eachTag} onChange={this.handleTagTyping}/>
                        <Button variant="secondary" size="sm" onClick={(e) => this.deleteTag(e,index)}>
                       DELETE TAG
                        </Button>
                        </Fragment>)
                        
                    })}
                    <Button variant="secondary" size="sm" onClick={this.addTagRow}>
                       ADD TAG
                    </Button> */}
                    </Form.Group>
                    <Form.Group id="categoryGridCheckbox">
                <Form.Label>Category</Form.Label>
                    <Form.Check type="checkbox" label="Vegetarian" value="Vegetarian" name="category"  onChange={this.putCategoryInState}/>
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
            </Card.Body>
            </Card>
        </div>
    );
}
}

export default Newrecipe;