import React from "react";
import { Link } from 'react-router-dom';

export default function AuthForm (props) {
  return (
    <main className='auth'>
      <h1 className='auth__title'>{props.title}</h1>
      <form className='auth__form' onSubmit={props.handleSubmit}>
        <input className='auth__input auth__input_type_email' placeholder='Email' name="email" type="email" autoComplete='off' onChange={props.handleChange} value={props.email}></input>
        <input className='auth__input auth__input_type_password' placeholder='Пароль' name="password" type="password" autoComplete='off' onChange={props.handleChange} value={props.password}></input>
        <button className='auth__button'>{props.buttonText}</button>
      </form>
      {props.title === 'Регистрация' && <Link to="/sign-in" className='auth__login-link'>Уже зарегистрированы? Войти</Link>}
    </main>
  );
}
