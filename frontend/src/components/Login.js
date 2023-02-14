import React, { useState } from 'react';
import AuthForm from './AuthForm';

function Login (props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange (evt) {
    evt.target.name === 'email' ? setEmail(evt.target.value) : setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onLogin(email, password)
  }

  return (
    <AuthForm title="Вход" handleSubmit={handleSubmit} handleChange={handleChange} buttonText="Войти" email={email} password={password} />
  )
}

export default Login;
