import React, { useEffect, useContext } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserCurrent";

export default function Card (props) {
    const currentUser = useContext(CurrentUserContext);
    const isLiked = props.card.likes.some(like => like._id === currentUser._id);

    function DelButton () {
        if (props.card.owner._id === currentUser._id) {
            return(
                <button className="card__del-button" onClick={handleDeleteClick}></button>
            )
        }
    }

    function handleClick () {
        props.onCardClick(props.card);
    }

    function handleLikeClick () {
        props.onCardLike(props.card);
    }

    function handleDeleteClick () {
        props.onCardDelete(props.card);
    }

    return (
        <li className="card">
            <img src={props.card.link} alt={props.card.name} className="card__image" onClick={handleClick}/>
            <h2 className="card__title">{props.card.name}</h2>
            <button className={`card__like-button ${isLiked && 'card__like-button_active'}`} type="button" onClick={handleLikeClick}></button>
            <p className="card__likes-number">{props.card.likes.length}</p>
            <DelButton />
        </li>
    )
  }
