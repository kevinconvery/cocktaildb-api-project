export const buildDrinkData = async data => {
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

export const fetchDataByAPIEndpoint = async endpoint => {
  try {
    const response = await fetch(endpoint)
    const data = response && await response.json()
    return new Promise((resolve, reject) => {
      // check to see if data is present, if it is, send it along
      data && resolve(data)
    })
  } catch (error) {
    // catch error here rather than with the promise
    console.error(error)
  }
}

export const fetchData = async (search, alcoholType="") => {
  let endpoint = `https://www.thecocktaildb.com/api/json/v1/1/`
  let suffix = alcoholType ? `filter.php?i=${alcoholType}` : `search.php?s=${search}`
  endpoint += suffix
  const data = await fetchDataByAPIEndpoint(endpoint)
  console.log(`data set: ${data.drinks}`)
  // if we're filtering by alcohol type, we'll have to do another search, otherwise send
  // the data along in a Promise
  return (alcoholType 
    ? await filterDataByAlcoholType(data) 
    : new Promise((resolve, reject) => {
      data && resolve(data)
    }))
}

const filterDataByAlcoholType = data => {
  const promises = data.drinks.map(async (item) => {
    const data = await fetchDataByAPIEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item.idDrink}`)
    return data.drinks[0]
  })
  // resolve all api calls and send the data as one Promise
  return Promise.all(promises)
}
