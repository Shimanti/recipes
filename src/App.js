// This is a React front-end app to retrieve
// Shimanti's Indian Cookbook Vol1 from an API
// The API was created from a 1996 PDF that was put
// online in 2021

import './App.css';
import {useEffect, useState} from "react"
import Recipe from './Recipe'

// change URL if the API location changes
const URL = `https://shrouded-beach-12811.herokuapp.com/api/recipes`

// app searches and retrieves recipes from the API
const App = ()=> {

  // initial states set to empty
  // query of '' is the same as returning every recipe
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState('')

  // re-renders output when a new query is submitted through the search bar
  useEffect(() => {
    getRecipes()
  }, [query])

  // gets recipes from API, filtered by search criteria (set to All recipes at start)
  const getRecipes = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    const lookup = data.filter(o=>o.Title.toLowerCase().includes(query.toLowerCase()))
    setRecipes(lookup)
    console.log(lookup)
  }

  // on change of input, sets the search to new input
  const updateSearch = e => {
    setSearch(e.target.value)
  }

  // on submit, sets query to new search, then resets the search
  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch("")
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}/>
        <button className="search-button" type="submit">
            Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.Title}
            title={recipe.Title}
            serves={recipe.Serves}
            ingredients={recipe.Ingredients}
            directions={recipe.Directions}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
