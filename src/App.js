import React, { useState } from 'react';
import Modal from './components/Modal/Modal'
import ResultsDisplay from './components/ResultsDisplay/ResultsDisplay'
import SearchForm from './components/SearchForm/SearchForm'
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState("")
  const [searchResults, setSearchResults] = useState("")
  const [modalData, setModalData] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [alcoholType, setAlcoholType] = useState("")

  const fetchData = async (search, alcoholType="") => {
    let endpoint = `https://www.thecocktaildb.com/api/json/v1/1/`
    let suffix = alcoholType ? `filter.php?i=${alcoholType}` : `search.php?s=${search}`
    endpoint += suffix
    let response, data
    response = await fetch(endpoint)
    data = response && await response.json()
    console.log(`data set: ${data.drinks}`)
    // if we're filtering by alcohol type, we'll have to do another search
    if (alcoholType) {
      const dataSet = await filterDataByAlcoholType(data)
      return dataSet
    } else {
      return new Promise((resolve, reject) => {
        data ? resolve(data) : reject('Error')
      })      
    }
  }

  const filterDataByAlcoholType = data => {
    const promises = data.drinks.map(async (item) => {
      const { idDrink } = item
      const endpointById = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
      const responseById = await fetch(endpointById)
      const fullDataById = responseById && await responseById.json()
      // getting back the full data here
      return fullDataById.drinks[0]
    })
    return Promise.all(promises)
  }

  const buildDrinkData = async data => {
    // console.log(`value of data when building drinks: ${data}`)
    const drinks = data.drinks.map((drink) => {
      const { idDrink, strDrink, strInstructions, strGlass, strDrinkThumb } = drink
      const drinkIngredients = []
      let ingredientKey
      let measureKey
      for (let i = 1; i <= 15; i++) {
        ingredientKey = `strIngredient${i}`
        measureKey = `strMeasure${i}`
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
          id: idDrink,
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
    // reset our search results
    setSearchResults('')
    const data = await fetchData(searchField, alcoholType)
    const myDrinks = data.drinks ? await buildDrinkData(data) : await buildDrinkData({ drinks: data })
    setSearchResults(myDrinks)
    setSearchField('')
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
