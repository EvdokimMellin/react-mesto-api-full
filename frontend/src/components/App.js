import React, { useEffect, useState } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserCurrent';
import { register, login, tokenCheck } from '../auth.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';



function App() {
  const [isEditProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [response, setResponse] = useState('');
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([])
  const [loginState, setLoginState] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards(cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
}

  function handleCardDelete (card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id != card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([initialCards, userData]) => {
        setCards(initialCards.map(initialCard => {return {
          name: initialCard.name,
          link: initialCard.link,
          _id: initialCard._id,
          owner: initialCard.owner,
          likes: initialCard.likes
        }}));
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err))
  }, [])

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {
    setProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups () {
    setEditAvatarPopupOpen(false);
    setProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({name: '', link: ''})
    setResponse('');
  }

  function handleUpdateUser ({name, about}) {
    api.updateUserInfo(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {console.log(err);})
  }

  function handleUpdateAvatar (avatarInputValue) {
    api.updateAvatar(avatarInputValue)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {console.log(err)});
  }

  function handleAddPlace (name, link) {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {console.log(err)});
  }

  function handleRegister (email, password) {
    register(email, password)
      .then((res) => {
        console.log(res);
        setResponse('ok');
      })
      .catch((err) => {
        console.log(err);
        setResponse('fail')
      });
  }

  function handleLogin (email, password) {
    login(email, password)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        setLoginState(true);
        setUserEmail(email);
      })
      .catch((err) => {
        console.log(err);
        setResponse('fail');
      });
  }

  function Content () {
    return (<>
      <Header page="main" email={userEmail} setLoginState={setLoginState} />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick.bind(this)} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardDelete={handleCardDelete} onCardLike={handleCardLike}/>
      <Footer/>
    </>)
  }

  useEffect (() => {
    tokenCheck()
      .then((res) => {
        console.log(res);
        setLoginState(true);
        setUserEmail(res.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <AddPlacePopup isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
        <EditProfilePopup isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <PopupWithForm title="Вы уверены?" name="confirm" isOpened={false} onClose={closeAllPopups} buttonText="Да" children={<></>} />
        <EditAvatarPopup isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip res={response} onClose={closeAllPopups} />
        <Switch>
          <ProtectedRoute exact path="/" loginState={loginState} component={Content} />
          <Route path="/sign-up">
            <Header buttonText="Войти" buttonLink="/sign-in" />
            <Register onRegister={handleRegister} />
            {loginState && <Redirect to="/" />}
          </Route>
          <Route path="/sign-in">
            <Header buttonText="Зарегистрироваться" buttonLink="/sign-up"/>
            <Login onLogin={handleLogin} />
            {loginState && <Redirect to="/" />}
          </Route>
          <Route path="/">
            {loginState ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
