import React, { Component } from 'react';
import actions from '../../services/index';

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
            <div>
                Allrecipes
                <div>
                <ul>
                    {this.state.allrecipes.map(eachRecipe => {
                        return <li>{eachRecipe.title}</li>
                    })}
                </ul>
                </div>
            </div>
        );
    }
}

export default AllRecipes;