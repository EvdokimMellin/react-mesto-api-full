import React from 'react';
import successImage from '../images/success.svg';
import failImage from '../images/fail.svg';

export default function InfoTooltip (props) {
  function closeByOverlay (evt) {
    if (evt.target.classList.contains('popup')) {
      props.onClose();
    }
  }

  return (
    <div className={`popup popup_type_image ${props.res && 'popup_opened'}`} onClick={closeByOverlay}>
      <div className="popup__info-container">
        <button className="popup__close-button" onClick={props.onClose}></button>
        {props.res === 'ok'
          ? <img alt="Успех" src={successImage} className="popup__info-image" />
          : props.res === 'fail' && <img alt="Ошибка" src={failImage} className="popup__info-image" />
        }
        <p className="popup__info-text">{props.res === 'ok'
          ? 'Вы успешно зарегистрировались!'
          : props.res === 'fail' && 'Что-то пошло не так! Попробуйте ещё раз.'
        }</p>
      </div>
    </div>
  )
}
