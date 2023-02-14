const baseUrl = 'https://auth.nomoreparties.co';

function checkResponse (res) {
  if (res.ok){
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function register (email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
    .then((res) => (checkResponse(res)))
}

export function login (email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
    .then((res) => (checkResponse(res)))
}

export function tokenCheck () {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then((res) => (checkResponse(res)));
}
