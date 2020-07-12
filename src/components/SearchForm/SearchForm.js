import React from 'react'
import './SearchForm.css'

const SearchForm = props => {
  const { submitForm, searchField, setSearchField } = props
  return (
    <form onSubmit={submitForm} className="cocktail-search-form" >
    <label htmlFor="search-field" className="search-field-label">
      Search for
    </label>
    <input 
      type="text" 
      className="search-field"
      value={searchField}
      onChange={(e => setSearchField(e.target.value))} 
    />
    </form>
  )
}

export default SearchForm