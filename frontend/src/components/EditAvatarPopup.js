import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup (props) {
    const avatarInputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarInputRef.current.value);
    }

    useEffect(() => {
        avatarInputRef.current.value = '';
    }, [props.isOpened])

    return(
      <PopupWithForm name="avatar" onClose={props.onClose} title="Обновить аватар" isOpened={props.isOpened} buttonText="Сохранить" handleSubmit={handleSubmit} children={
        <>
          <input ref={avatarInputRef}  type="url" name="avatarLink" id="avatar-link" className="popup__input popup__input_type_link popup__avatar-link" placeholder="Ссылка на картинку" required/>
          <span className="popup__input-error avatar-link-error"></span>
        </>
      } />
    )
}
