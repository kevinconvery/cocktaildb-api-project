import React from 'react'
import './SearchForm.css'

const SearchForm = props => {
  const { submitForm, searchField, setSearchField, setAlcoholType } = props
  const alcoholicIngredients = [ 'Gin', 'Rum', 'Whiskey', 'Vodka', 'Tequila', 'Beer', 'Wine' ]
  return (
    <form onSubmit={submitForm} className="cocktail-search-form">
      <div className="form-option">
        <label htmlFor="classic-search-field" className="search-field-label">
          Search for
        </label>
        <input 
          type="text" 
          className="classic-search-field input-field"
          value={searchField}
          onChange={(e => setSearchField(e.target.value))} 
        />
      </div>
      <div className="form-option">
        <label htmlFor="alcohol-type" className="search-field-label">
          Filter by alcohol type:
        </label>
        <select 
          name="alcohol-type" 
          onChange={(e => setAlcoholType(e.target.value))}
          className="alcohol-filter-select input-field"
        >
          <option value="">Do not filter</option>
          {alcoholicIngredients.map(optionValue => (
            <option value={optionValue}>{optionValue}</option>
          ))}
        </select>
        </div>
        <button 
          type="submit"
          className="search-form-submit-button"
        >
          Search Up A Drink
        </button>
    </form>
  )
}

export default SearchForm