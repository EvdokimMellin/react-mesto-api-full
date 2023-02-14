import React from 'react';

export default function ImagePopup (props) {
  function closeByOverlay (evt) {
    if (evt.target.classList.contains('popup')) {
      props.onClose();
    }
  }

  return (
    <div className={`popup popup_type_image ${props.card.link ? "popup_opened" : ""}`} onClick={closeByOverlay}>
      <div className="popup__image-container">
        <button className="popup__close-button" onClick={props.onClose}></button>
        <img className="popup__image" alt={props.card.name} src={props.card.link}/>
        <p className="popup__image-title">{props.card.name}</p>
      </div>
    </div>
  )
}
