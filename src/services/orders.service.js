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
    ).then(response => response.data);
  }
}

const service = new OrdersService();
export default service;
