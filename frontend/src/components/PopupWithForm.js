import React from 'react';

export default function PopupWithForm (props) {

  function closeByOverlay (evt) {
    if (evt.target.classList.contains('popup')) {
      props.onClose();
    }
  }

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpened ? "popup_opened" : ""}`} onClick={closeByOverlay}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <p className="popup__title">{props.title}</p>
        <form className="popup__form" name={props.name} onSubmit={props.handleSubmit}>
          {props.children}
          <button className="popup__save-button">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}
