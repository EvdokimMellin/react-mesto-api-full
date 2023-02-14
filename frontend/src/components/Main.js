import React, {useContext} from 'react';
import Card from './Card';
import addButton from '../images/add-button.svg';
import avatarPencil from '../images/avatar-pencil.svg';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserCurrent';

function Main (props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
       <section className="profile">
         <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"/>
         <div className="profile__avatar-hover" onClick={props.onEditAvatar}>
           <img src={avatarPencil} alt="Редактировать" className="profile__avatar-pencil"/>
         </div>
         <div className="profile__info">
           <div className="profile__name-container">
             <h1 className="profile__name">{currentUser.name}</h1>
             <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
           </div>
           <p className="profile__description">{currentUser.about}</p>
         </div>
         <button className="profile__add-button" type="button" onClick={props.onAddPlace}><img src={addButton} alt="Добавить" className="profile__add-image"/></button>
       </section>
       <section className="cards">
         <ul className="cards__list">
            {props.cards.map(cardElement => {
              return(<Card key={cardElement._id} card={cardElement} onCardClick={props.onCardClick} api={api} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} />);
            })}
         </ul>
       </section>
    </main>
  )
}

export default Main;
