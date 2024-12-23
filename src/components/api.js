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
