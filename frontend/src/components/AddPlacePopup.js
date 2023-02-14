import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup (props) {
    const [nameValue, setNameValue] = useState('');
    const [linkValue, setLinkValue] = useState('');

    function handleChange (evt) {
      evt.target.name === 'addName'
        ? setNameValue(evt.target.value)
        : setLinkValue(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace(nameValue, linkValue);
    }

    useEffect(() => {
        setNameValue('');
        setLinkValue('');
    }, [props.isOpened])

    return(
      <PopupWithForm name="add" onClose={props.onClose} title="Новое место" isOpened={props.isOpened} buttonText="Создать" handleSubmit={handleSubmit} children={
        <>
          <input type="text" name="addName" id="add-name" className="popup__input popup__input_type_name" placeholder="Название" required minLength="2" maxLength="30" onChange={handleChange} value={nameValue} />
          <span className="popup__input-error add-name-error"></span>
          <input type="url" name="addDescription" id="add-description" className="popup__input popup__input_type_description" placeholder="Ссылка на картинку" required onChange={handleChange} value={linkValue}/>
          <span className="popup__input-error add-description-error"></span>
        </>
      } />
    )
}
