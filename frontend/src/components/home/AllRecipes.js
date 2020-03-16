import actions from '../../services/index';
import React, { Component } from 'react';
import { Container, Card, ListGroup, Button, } from 'react-bootstrap';
var ReactDOM = require('react-dom');


var Coverflow = require('react-coverflow');


class AllRecipes extends Component {
    //still looking into more ideas
    //need state sent to be sent
   state = {
      allrecipes:[]
   }

    async componentDidMount() {
        let recipes = await actions.allRecipes()
        this.setState({allrecipes: recipes.data})
        console.log(recipes)
    }

  



    render() {
        
        return (
            <Container className="home-recipe">
            <Card id="main-card" 
          style={{ width: '100%' }}>
            <Card.Title className="text-center">
            <Card.Header>
                <h1 className="prof-title">All Recipes</h1>
            </Card.Header> 
          </Card.Title>
                <ul>
                    {this.state.allrecipes.map(eachRecipe => {
                        return <li>{eachRecipe.title}</li>
                    })}
                </ul>
                <Coverflow
                    width={960}
                    height={480}
                    displayQuantityOfSide={2}
                    navigation={false}
                    enableHeading={false}
                >
                    <div
                    // onClick={() => fn()}
                    // onKeyDown={() => fn()}
                    role="menuitem"
                    tabIndex="0"
                    >
                    <img
                        src="https://www.themealdb.com/images/media/meals/sqrtwu1511721265.jpg"
                        alt='title or description'
                        style={{ display: 'block', width: '100%' }}
                    />
                    </div>
                    <img src='https://www.themealdb.com/images/media/meals/1550441882.jpg' alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
                    <img src='https://www.themealdb.com/images/media/meals/1549542994.jpg' alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
                    <img src='https://www.themealdb.com/images/media/meals/1550441882.jpg' alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
                    <img src='https://www.themealdb.com/images/media/meals/1549542994.jpg' alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
                </Coverflow>
                
                
            </Card>
            </Container>
        );
    }
}

export default AllRecipes;