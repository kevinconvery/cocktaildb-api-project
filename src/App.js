import React, { useState } from 'react';
import Modal from './components/Modal/Modal'
import './App.css';

function App() {
  const [searchField, setSearchField] = useState("")
  const [searchResults, setSearchResults] = useState("")
  const [modalData, setModalData] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setSearchResults('')
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchField}`
    const response = searchField && await fetch(endpoint)
    const data = response && await response.json()
    const { drinks } = data
    if (drinks) {
      const myDrinks = drinks.map((drink) => {
        const { strDrink, strInstructions, strGlass, strDrinkThumb } = drink
        const drinkIngredients = []
        const ingredientPrefix = `strIngredient`
        const measurePrefix = `strMeasure`
        let ingredientKey
        let measureKey
        for (let i = 1; i <= 15; i++) {
          ingredientKey = `${ingredientPrefix}${i}`
          measureKey = `${measurePrefix}${i}`
          if (drink[ingredientKey]) {
            drinkIngredients.push({
              name: drink[ingredientKey],
              measure: drink[measureKey] ? drink[measureKey] : ''
            })
            continue
          } else {
            break
          }
        }
        return {
          title: strDrink,
          instructions: strInstructions,
          servingGlass: strGlass,
          ingredients: drinkIngredients,
          thumbnail: strDrinkThumb
        }
      })
      setSearchResults(myDrinks)
    }
    setSearchField('')
  }

  const selectDrink = e => {
    setModalData('')
    const specificDrink = searchResults.filter((drink) => {
      return drink.title === e.target.name
    })
    setModalData(specificDrink)
    setModalVisible(true)
  }

  return (
    <div className="App">
      <header className="main-header">
        Search Up A Cocktail!
      </header>
      <div className="container-header">
        This app uses <a href="https://www.thecocktaildb.com/api.php">TheCocktailDB</a> to search up data on cocktails. Purely for fun and enjoyment.
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} className="cocktail-search-form" >
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
        <div className="search-results">
          <ul>
            {searchResults && searchResults.map(result => (
              <li className="search-result" key={result.title}>
                <img src={result.thumbnail} className="drink-image-thumbnail"  alt={result.title} />
                <button 
                  className="search-result-button"
                  onClick={selectDrink}
                  name={result.title}
                >
                  {result.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {(modalData && modalVisible) && (
        <Modal 
          data={modalData[0]}
          closeModal={() => setModalVisible(false)}
        />
      )}
      <div className="main-footer">
        Kevin Convery - 2020
      </div>
    </div>
  )
}

export default App;
