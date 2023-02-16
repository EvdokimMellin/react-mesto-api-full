const baseUrl = 'https://api.evdokim-m-project.nomoredomains.work';

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
    }),
    credentials : 'include',
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
    }),
    credentials : 'include',
  })
    .then((res) => (checkResponse(res)))
}

export function tokenCheck () {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      // "cookie" : `jwt=${localStorage.getItem('token')}`,
    },
    credentials : 'include',
  })
    .then((res) => (checkResponse(res)));
}
