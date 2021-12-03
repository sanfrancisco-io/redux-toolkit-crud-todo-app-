import Axios from 'axios';
import { API_URL } from './constants';

export const $api = Axios.create({
  baseURL: API_URL,
});

