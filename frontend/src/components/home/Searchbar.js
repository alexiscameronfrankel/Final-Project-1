import React, { Component } from 'react';
import axios from 'axios'

class SearchBar extends Component {
    state = {
      query: '',
      results: [],
      filteredResults: [],
      test: []
    }
    
    
    getSearchInfo = () => {
        axios.get('https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=' )  // + api_key.key  add this to url when ready
        .then(response => {
          console.log(response.data.data)
          this.setState({
              results: response.data.data,
              filteredResults: response.data.data
          })
        })
        .catch(err => console.log(err))   
      }
      

    handleInputChange = (e) => {
        // e.preventDefault()
        // console.log(e.target.value, this.state.results)
        let copyResults = [...this.state.results]
        // console.log(copyResults)
        let filterResults = copyResults.filter(eachRecipe => {
            return eachRecipe.name.toLowerCase().includes(e.target.value.toLowerCase())
        })

        console.log(filterResults)
     if(filterResults[0]){
        this.setState({
         filteredResults: filterResults[0].name
        })
    }
    }

    componentDidMount= async () =>{
        await this.getSearchInfo()
    }

    redirectingTo = (e) => {
        e.preventDefault()
        // console.log("hi")
        this.props.history.push(`/recipe-details/${this.state.filteredResults}`)
    }
   
    render() {
        // console.log(this.props)
      return (
        <>
        <form action={`recipe-details/${this.state.filteredResults}`}>
        {/* <form onSubmit={this.redirectingTo}> */}
          <input
            placeholder="Search for a Recipe..."
            ref={input => this.search = input}
            onChange={this.handleInputChange} 
            
          />
          {/* <button onClick={this.redirectingTo} type="submit"> <i className="ti-search"></i></button> */}
          </form>
          {/* <Link to={`/recipe-details/${this.state.filteredResults}`}>Submit</Link> */}
          
          
          
          {/* <Suggestions {...this.state} results={this.state.filteredResults} /> */}
 
        </>
      )
    }
   }
   


export default SearchBar;