import React, { useState } from 'react';
import Modal from './components/Modal/Modal'
import ResultsDisplay from './components/ResultsDisplay/ResultsDisplay'
import SearchForm from './components/SearchForm/SearchForm'
import { buildDrinkData, fetchDataByAPIEndpoint, fetchData } from './api-calls'
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState("")
  const [searchResults, setSearchResults] = useState("")
  const [modalData, setModalData] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [alcoholType, setAlcoholType] = useState("")

  const fetchRandomDrink = async e => {
    e.preventDefault()
    setSearchResults('')
    const data = await fetchDataByAPIEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    console.log(`random drink: ${data.drinks[0].strDrink}`)
    const myDrinks = data.drinks ? await buildDrinkData(data) : await buildDrinkData({ drinks: data })
    setSearchResults(myDrinks)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // reset our search results
    setSearchResults('')
    setSearchField('')
    const data = await fetchData(searchField, alcoholType)
    const myDrinks = data.drinks ? await buildDrinkData(data) : await buildDrinkData({ drinks: data })
    setSearchResults(myDrinks)
  }

  const selectDrink = e => {
    setModalData('')
    const specificDrink = searchResults.filter((drink) => {
      return drink.title === e.target.name
    })
    setModalData(specificDrink[0])
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
          getRandomDrink={fetchRandomDrink}
        />
        <ResultsDisplay 
          select={selectDrink}
          results={searchResults}
        />
      </div>
      {(modalData && modalVisible) && (
        <Modal 
          data={modalData}
          closeModal={() => setModalVisible(false)}
        />
      )}
      <div className="main-footer">
        <span>Kevin Convery - 2020 with special help from</span> <a href="https://www.thecocktaildb.com/api.php">TheCocktailDB</a>
      </div>
    </div>
  )
}

export default App
