import React from 'react'
import './SearchForm.css'

const SearchForm = props => {
  const { submitForm, searchField, setSearchField, setAlcoholType } = props
  return (
    <form onSubmit={submitForm} className="cocktail-search-form">
      <div class="form-option">
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
      <div class="form-option">
        <label htmlFor="alcohol-type" className="search-field-label">
          Filter by alcohol type:
        </label>
        <select name="alcohol-type" onChange={(e => setAlcoholType(e.target.value))}>
          <option value="">Do not filter</option>
          <option value="gin">Gin</option>
          <option value="rum">Rum</option>
          <option value="whisky">Whisky</option>
          <option value="vodka">Vodka</option>
          <option value="tequila">Tequila</option>
          <option value="beer">Beer</option>
          <option value="wine">Wine</option>
        </select>
      </div>
    </form>
  )
}

export default SearchForm