import axios from "axios";
import sessionService from "./session.service";
import * as _ from "lodash";

const API_URL = process.env.REACT_APP_API_URL + '/dealers';

const HEADERS = (headers = {}) => _.assign({
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}, headers);

class ProfileService {
  #profile = undefined;

  sendProfile(profile) {
    return axios.post( `${API_URL}/profile`,
      profile,
      { headers: HEADERS({Authorization: sessionService.getToken()})}
    ).then(response => response.data);
  }

  getProfile() {
    if (this.#profile) return Promise.resolve(this.#profile);
    else return axios.get( `${API_URL}/profile/me`,
      { headers: HEADERS({Authorization: sessionService.getToken()})}
    ).then(response => response.data)
      .then(profile => {
        this.#profile = profile;
        return this.#profile;
      });
  }
}

const service = new ProfileService();
export default service;
