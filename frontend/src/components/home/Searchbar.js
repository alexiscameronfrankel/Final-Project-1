import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {Link, useHistory, Redirect } from 'react-router-dom'


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
            return eachRecipe.cuisine.toString().toLowerCase() && eachRecipe.ingredients.toString().toLowerCase() && eachRecipe.title.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())
        })
        if(filterResults.length != 0)
        this.setState({
         filteredResults: filterResults[0]
        })
    
    console.log(filterResults)
    }

  

    componentDidMount= async () =>{
        await this.getSearchInfo()
    }
  
    redirectingTo=(e)=>{
      e.preventDefault();
      
      let path = `/allrecipes/${this.state.filteredResults._id}`
      if(this.state.filteredResults.length == 0){
        path = "/"
      }
      else {
        path = `/allrecipes/${this.state.filteredResults._id}`
      }
      console.log("about to enther function")
      if (window.location.origin == 'http://localhost:3000'){
        window.location.href = `http://localhost:3000${path}`}
      if (window.location.origin == 'https://boxofrecipes.herokuapp.com'){
        window.location.href = `https://boxofrecipes.herokuapp.com${path}`
      }
      
      this.props.history.push(`/allrecipes/${this.state.filteredResults._id}`)
    }
    
   
    render(props) {
       
      return (
        <div>
         {/* <form action={`/allrecipes/${this.state.filteredResults}`}> */}
        <form onSubmit={e => this.redirectingTo(e) }>
          <input
            placeholder="Search for a Recipe..."
            ref={input => this.search = input}
            onChange={this.handleInputChange} 
            
          />
          {/* <button onClick={this.redirectingTo} type="submit"> <i className="ti-search"></i></button> */}
          </form>
          <Link {...props} to={`/allrecipes/${this.state.filteredResults._id}`}>Submit</Link>
          
          
          
          {/* <Suggestions {...this.state} results={this.state.filteredResults} /> */}
          
          </div>
        
      )
    }
   }
   


export default withRouter(SearchBar)