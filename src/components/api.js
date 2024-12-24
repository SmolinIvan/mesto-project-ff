import { authToken } from "../../tokens";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: authToken,
    'Content-Type': 'application/json'
  }
}

export function getInitialCards () {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        return res.json();
      })
} 

export function getCurrentUser()  {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      return res.json();
    })
} 

export function getCardLikes(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers
  })
    .then(res => {
      return res.json();
    })
} 

export function putLikesCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => {
      return res.json();
    })
} 

export function removeLikesCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      return res.json();
    })
} 