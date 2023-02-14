import React from 'react';
import logo from '../images/logo.svg';
import { Link, useHistory } from 'react-router-dom';

function Header (props) {
  const history = useHistory()

  function signOut(){
    localStorage.removeItem('token');
    props.setLoginState(false);
    history.push('/sign-in');
  }

  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo"/>
      <div className="header__account-container">
        {props.page === 'main'
        ? (<>
            <p className="header__email">{props.email}</p>
            <button className="header__button" onClick={signOut}>Выйти</button>
          </>)
        : <Link to={props.buttonLink} className="header__button">{props.buttonText}</Link>}
      </div>
    </header>
  )
}

export default Header;
