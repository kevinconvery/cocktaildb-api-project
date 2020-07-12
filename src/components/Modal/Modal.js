import React from 'react'
import './Modal.css'

const Modal = props => {
  const { data, closeModal } = props
  const { title, thumbnail, instructions, ingredients, servingGlass } = data

  return (
    <div className="modal-container">
      <div className="modal-data">
      <span className="cocktail-title">{title}</span>
      <img src={thumbnail} className="modal-display-image" alt={title} />
      <span className="cocktail-subtitle">Instructions</span>
      <p>{instructions}</p>
      <span className="cocktail-subtitle">Ingredients</span>
      <ul className="ingredients-list">
        {ingredients.map((item) => (
          <li key={item.name}>{item.name} -- {item.measure}</li>        
        ))}
      </ul>
      Serving Glass: {servingGlass}
      <button onClick={closeModal} className="hide-modal-button">Close</button>
      </div>
    </div>
  )

}

export default Modal
