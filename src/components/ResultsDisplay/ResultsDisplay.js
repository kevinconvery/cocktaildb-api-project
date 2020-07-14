import React from 'react'
import './ResultsDisplay.css'

const ResultsDisplay = props => {
  const { select, results } = props
  return (
    <div className="search-results">
      <ul>
        {results && results.map(result => (
          <li 
            key={result.title}
          >
            <button
              className="search-result"
              onClick={select}
              name={result.title}
            >
              <img src={result.thumbnail} className="drink-image-thumbnail"  alt={result.title} />
              <div class="search-result-label">
                {result.title}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ResultsDisplay
