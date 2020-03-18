import actions from '../../services/index';
import React, { Fragment, Component } from 'react';
import { Container, Card, } from 'react-bootstrap';
import { Link } from 'react-router-dom'



var Coverflow = require('react-coverflow');


class AllRecipes extends Component {
    //still looking into more ideas
    //need state sent to be sent
   state = {
      allrecipes:[],
      title: String
   }

    async componentDidMount() {
        let recipes = await actions.allRecipes()
        this.setState({
            allrecipes: recipes.data,
            title: recipes.data[0].title
        })
        console.log(recipes)
    }

  



    render(...props) {
        
        return (
            <Container className="home-recipe">
            <Card>
                <Card.Title>
                <Card.Header className="recipe-header"><h1 className="all-recipes">All Recipes</h1></Card.Header>
                </Card.Title>
                <div>
                <Coverflow
                    width={960}
                    height={480}
                    displayQuantityOfSide={2}
                    navigation={false}
                    enableHeading={false}
                >
                    
                    {this.state.allrecipes.map(eachRecipe => {
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
                            src={eachRecipe.image}
                            alt={eachRecipe.title}
                            style={{ display: 'block', width: '100%' }}
                            // href={`/allrecipes/${eachRecipe._id}`}
                        />
                        
                        </div>
                        </Fragment>)
                        })}
                        
                    
                    
                </Coverflow>
                
                </div>
            </Card>
            </Container>
        );
    }
}

export default AllRecipes;