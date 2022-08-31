import axios from "axios";
import sessionService from "./session.service";
import * as _ from "lodash";

const API_URL = process.env.REACT_APP_API_URL + '/dealers';

const HEADERS = (headers = {}) => _.assign({
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}, headers);

class OrdersService {
  getActiveOrders() {
    return axios.get( `${API_URL}/orders/available`,
      { headers: HEADERS({Authorization: sessionService.getToken()})}
    ).then(response => response.data)
      .catch(e => Promise.reject(e.response.data));
  }

  getMyActiveOrders() {
    return axios.get( `${API_URL}/orders/my`,
      { headers: HEADERS({Authorization: sessionService.getToken()})}
    ).then(response => response.data);
  }

  getOrder(id) {
    return axios.get( `${API_URL}/orders/${id}`,
      { headers: HEADERS({Authorization: sessionService.getToken()})}
    ).then(response => response.data);
  }

  accept(id) {
    return axios.post( `${API_URL}/orders/${id}/dealer`,
      {},
      { headers: HEADERS({Authorization: sessionService.getToken()})}
    ).then(response => response.data);
  }
}

const service = new OrdersService();
export default service;
