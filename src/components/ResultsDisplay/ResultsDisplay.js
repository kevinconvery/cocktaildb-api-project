import React from 'react'
import './ResultsDisplay.css'

const ResultsDisplay = props => {
  const { select, results } = props
  return (
    <div className="search-results">
      <ul>
        {results && results.map(result => (
          <li className="search-result" key={result.title}>
            <img src={result.thumbnail} className="drink-image-thumbnail"  alt={result.title} />
            <button 
              className="search-result-button"
              onClick={select}
              name={result.title}
            >
              {result.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ResultsDisplay
