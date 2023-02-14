import React, {useState, useEffect, useContext} from "react";
import { CurrentUserContext } from '../contexts/CurrentUserCurrent';
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup (props) {
    const [name, setName] = useState('Жак-Ив Кусто');
    const [description, setDescription] = useState('Исследователь океана');
    const currentUser = useContext(CurrentUserContext);

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
          name,
          about: description,
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, props.isOpened]);

    return(
        <PopupWithForm name="edit" onClose={props.onClose} title="Редактировать профиль" isOpened={props.isOpened} buttonText="Сохранить" handleSubmit={handleSubmit} children={
          <>
            <input type="text" name="editName" id="edit-name" className="popup__input popup__input_type_name" required minLength="2" maxLength="40" value={name || ''} onChange={handleNameChange} />
            <span className="popup__input-error edit-name-error"></span>
            <input type="text" name="editDescription" id="edit-description" className="popup__input popup__input_type_description" required minLength="2" maxLength="200" value={description || ''} onChange={handleDescriptionChange} />
            <span className="popup__input-error edit-description-error"></span>
          </>
        } />
    )
}
