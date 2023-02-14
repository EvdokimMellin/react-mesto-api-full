import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register (props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function handleChange (evt) {
    evt.target.name === 'email' ? setEmail(evt.target.value) : setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onRegister(email, password)
    history.push('/sign-in')
  }

  return (
    <AuthForm title="Регистрация" handleSubmit={handleSubmit} handleChange={handleChange} buttonText="Зарегистрироваться" email={email} password={password} />
  )
}

export default Register;
