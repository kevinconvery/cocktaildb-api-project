import React from 'react'
import './SearchForm.css'

const SearchForm = props => {
  const { submitForm, searchField, setSearchField, setAlcoholType } = props
  return (
    <form onSubmit={submitForm} className="cocktail-search-form">
      <div className="form-option">
        <label htmlFor="search-field" className="search-field-label">
          Search for
        </label>
        <input 
          type="text" 
          className="search-field"
          value={searchField}
          onChange={(e => setSearchField(e.target.value))} 
        />
      </div>
      <div className="form-option">
        <label htmlFor="alcohol-type" className="search-field-label">
          Filter by alcohol type:
        </label>
        <select name="alcohol-type" onChange={(e => setAlcoholType(e.target.value))}>
          <option value="">Do not filter</option>
          <option value="Gin">Gin</option>
          <option value="Rum">Rum</option>
          <option value="Whiskey">Whiskey</option>
          <option value="Vodka">Vodka</option>
          <option value="Tequila">Tequila</option>
          <option value="Beer">Beer</option>
          <option value="Wine">Wine</option>
        </select>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default SearchForm