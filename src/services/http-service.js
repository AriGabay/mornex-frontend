import axios from 'axios';
import { checkUserLogin } from './auth-service';
const BASE_URL = 'https://149.28.196.35/api/';

const globalHeaders = () => ({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  Authorization: `Bearer ${checkUserLogin()}`,
});

export const postRequest = async (endpoint = '', data) => {
  try {
    const options = {
      method: 'POST',
      url: BASE_URL + endpoint,
      headers: globalHeaders(),
      data: data,
    };

    const response = await axios.request(options).catch((error) => {
      throw error;
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRequest = async (endpoint = '') => {
  try {
    const result = await axios
      .get(BASE_URL + endpoint, {
        headers: globalHeaders(),
      })
      .catch((error) => {
        throw error;
      });
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const patchRequest = async (endpoint = '', data) => {
  try {
    const options = {
      method: 'PATCH',
      url: BASE_URL + endpoint,
      headers: globalHeaders(),
      data: data,
    };

    const response = await axios.request(options).catch((error) => {
      throw error;
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeRequest = async (endpoint = '', id) => {
  try {
    const options = {
      method: 'DELETE',
      url: BASE_URL + endpoint + id,
      headers: globalHeaders(),
    };

    const response = await axios.request(options).catch((error) => {
      throw error;
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
