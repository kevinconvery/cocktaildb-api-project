import React, { useState } from 'react';
import Modal from './components/Modal/Modal'
import ResultsDisplay from './components/ResultsDisplay/ResultsDisplay'
import SearchForm from './components/SearchForm/SearchForm'
import './App.css';

function App() {
  const [searchField, setSearchField] = useState("")
  const [searchResults, setSearchResults] = useState("")
  const [modalData, setModalData] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [alcoholType, setAlcoholType] = useState("")

  const fetchData = async search => {
    const endpoint = search && `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
    const response = search && await fetch(endpoint)
    const data = response && await response.json()
    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject('Error')
    })  
  }

  const buildSearchData = async data => {
    const drinks = data.map((drink) => {
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
    return new Promise((resolve, reject) => {
      drinks ? resolve(drinks) : reject('Error')
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSearchResults('')
    const data = await fetchData(searchField)
    const myDrinks = data.drinks && await buildSearchData(data.drinks)
    setSearchResults(myDrinks)
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
        Search Up A Cocktail! {alcoholType && `Current alcohol of choice is ${alcoholType}!`}
      </header>
      <div className="container">
        <SearchForm 
          submitForm={handleSubmit}
          setSearchField={setSearchField}
          searchField={searchField}
          setAlcoholType={setAlcoholType}
        />
        <ResultsDisplay 
          select={selectDrink}
          results={searchResults}
        />
      </div>
      {(modalData && modalVisible) && (
        <Modal 
          data={modalData[0]}
          closeModal={() => setModalVisible(false)}
        />
      )}
      <div className="main-footer">
        <span>Kevin Convery - 2020 with special help from</span> <a href="https://www.thecocktaildb.com/api.php">TheCocktailDB</a>
      </div>
    </div>
  )
}

export default App;
