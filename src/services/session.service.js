import axios from 'axios';
import * as _ from 'lodash';
import { Browser } from '@capacitor/browser';

const API_URL = process.env.REACT_APP_API_URL;
const MELI_APP_ID = process.env.REACT_APP_MELI_APP_ID;
const MELI_REDIRECT_URL = process.env.REACT_APP_MELI_REDIRECT_URL;
const MELI_LOGIN_URL = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${MELI_APP_ID}&redirect_uri=${MELI_REDIRECT_URL}`;

const HEADERS = (headers = {}) => _.assign({
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}, headers);

class SessionService {

  requestAccessCode() {
    Browser.addListener('browserPageLoaded', (e) => {
      console.log('Page loaded ' + e);
      const m = JSON.stringify(e);
    });
    Browser.open({url: MELI_LOGIN_URL});
  }

  requestAccessToken(code) {
    const p = axios
      .post( `${API_URL}/session/mobile/accessToken`,
        {code: code},
        { headers: HEADERS() }
      )
      .then(response => response.data);
    return this.#receiveAccessToken(p).catch(e => Promise.reject(e.response.data));
  }

  refreshAccessToken() {
    const accessToken = this.getToken();
    if (accessToken) {
      const p = axios
        .post(`${API_URL}/session/mobile/refreshToken`,
          {refresh_token: this.#getRefreshToken()},
          {headers: HEADERS()}
        )
        .then(response => response.data);
      return this.#receiveAccessToken(p).catch(e => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('refresh_token');
        window.localStorage.removeItem('user');
        return Promise.reject(e.response.data);
      });
    } else return Promise.resolve(false);
  }

  getToken = () => {
    const token = window.localStorage.getItem("token");
    return token;
  };

  getUserId = () => {
    const userId = window.localStorage.getItem("user");
    return userId;
  }

  getProfile() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Chau!');
        reject();
      }, 3000);
    });
  }

  #receiveAccessToken = (p) => {
    return p.then(response => {
      console.log(`Token info: ${JSON.stringify(response)}`);
      return response;
    }).then((response) => {
      this.#setUser(response);
      return this.#setToken(response);

    })
  }

  #setToken = response => {
    window.localStorage.setItem("token", response.access_token);
    window.localStorage.setItem('refresh_token', response.refresh_token);
    return response.access_token;
  };

  #setUser = response => {
    window.localStorage.setItem('user', response.user_id);
  }

  #getRefreshToken = () => window.localStorage.getItem('refresh_token');

}

const service = new SessionService();
export default service;
