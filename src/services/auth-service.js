import { eventBus } from './event-bus';
import { getRequest, postRequest } from './http-service';
import jwt_decode from 'jwt-decode';

export const login = async (userDeatils) => {
  try {
    const loginRequest = await postRequest('auth/login', userDeatils).catch(
      (error) => {
        console.error('error :', error);
        if (error?.response?.status === 401) {
          eventBus.dispatch('error', {
            message: 'Username or password is worng',
          });
        }
      }
    );
    if (!loginRequest || !Object.keys(loginRequest).length) {
      throw Error('login request faild');
    }
    if (loginRequest['access_token']) {
      const tokenStringify = JSON.stringify(loginRequest['access_token']);
      const decoded = jwt_decode(tokenStringify);
      localStorage.setItem('access_token', loginRequest['access_token']);
      localStorage.setItem('decoded_token', JSON.stringify(decoded));
    }
    return loginRequest['access_token'];
  } catch (error) {
    console.error('error :', error);
  }
};

export function checkUserLogin() {
  const access_token = localStorage.getItem('access_token');
  if (!access_token) return '';
  return access_token;
}

export const jwtRefresh = async () => {
  try {
    const JWTRefesh = await getRequest('auth/refresh');
    localStorage.setItem('access_token', JWTRefesh['access_token']);
    return JWTRefesh['access_token'] ? JWTRefesh['access_token'] : '';
  } catch (error) {
    console.error('error:', error);
  }
};
