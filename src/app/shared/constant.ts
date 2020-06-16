import { IAccount } from "../interfaces/web-client/account-wc.interface";

// export const API_DOMAIN = 'http://13.76.164.246:8080/';
export const API_DOMAIN = 'http://localhost:8080/';
export const API_IMAGE = 'https://api.cloudinary.com/v1_1/${smileup}/upload';

const ACCOUNT_TOKEN = 'ACCOUNT_TOKEN';
const STORE_TOKEN = 'STORE_TOKEN';
export let HTTP_HEADER = {
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem(ACCOUNT_TOKEN),
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
};
export let HTTP_HEADER_STORE = {
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem(STORE_TOKEN),
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
};
export let HTTP_HEADER_STORE_UPFILE = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
};

export let HTTP_HEADER_LOGIN = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
};
export let HTTP_HEADER_CLOUD_DINARY = {
  'X-Requested-With': 'XMLHttpRequest',
};
