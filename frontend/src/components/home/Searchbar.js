import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

import actions from '../../services/index';

class SearchBar extends Component {
    state = {
      query: '',
      results: [],
      filteredResults: [],
      test: [],
      history: []
    }
    
    
    getSearchInfo = () => {
        actions.allRecipes()
        .then(response => {
          this.setState({
              results: response.data,
              filteredResults: []
          })
          console.log(this.state.results)
        })
        .catch(err => console.log(err))   
      }
      

    handleInputChange = (e) => {
        e.preventDefault()
        // console.log(e.target.value, this.state.results)
        let copyResults = [...this.state.results]
        // console.log(copyResults)
        let filterResults = copyResults.filter(eachRecipe => {
            return eachRecipe.category.toString().toLowerCase() && eachRecipe.ingredients.toString().toLowerCase() && eachRecipe.title.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())
        })

        console.log(filterResults)
     if(filterResults[0]){
        this.setState({
         filteredResults: filterResults[0].category
        })
    }
    }

    componentDidMount= async () =>{
        await this.getSearchInfo()
    }
  

    
   
    render() {
        // console.log(this.props)
      return (
        <div>
         {/* <form action={`/allrecipes/${this.state.filteredResults}`}> */}
        <form onSubmit={this.redirectingTo}>
          <input
            placeholder="Search for a Recipe..."
            ref={input => this.search = input}
            onChange={this.handleInputChange} 
            
          />
          {/* <button onClick={this.redirectingTo} type="submit"> <i className="ti-search"></i></button> */}
          </form>
          {/* <Link to={`/allrecipes/${this.state.filteredResults}`}>Submit</Link> */}
          
          
          
          {/* <Suggestions {...this.state} results={this.state.filteredResults} /> */}
          
          </div>
        
      )
    }
   }
   


export default SearchBar;