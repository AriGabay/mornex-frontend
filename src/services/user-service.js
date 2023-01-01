import { jwtRefresh } from './auth-service';
import {
  getRequest,
  patchRequest,
  postRequest,
  removeRequest,
} from './http-service';

export const userList = async () => {
  return await getRequest('users').catch(async (error) => {
    if (error?.response?.status === 401) {
      await jwtRefresh();
      return await userList().catch((error) =>
        console.error('Error : ', error)
      );
    }
  });
};

export const updateUserRequest = async (userId, dataUpate) => {
  return await patchRequest(`users/${userId}`, dataUpate).catch(
    async (error) => {
      if (error?.response?.status === 401) {
        await jwtRefresh();
        return await updateUserRequest(userId, dataUpate).catch((error) =>
          console.error('Error : ', error)
        );
      }
    }
  );
};

export const removeUserRequest = async (userId) => {
  return await removeRequest(`users/`, userId).catch(async (error) => {
    if (error?.response?.status === 401) {
      await jwtRefresh();
      return await removeUserRequest(userId).catch((error) =>
        console.error('Error : ', error)
      );
    }
  });
};
export const createUserRequest = async (userDate) => {
  return await postRequest(`users`, userDate).catch(async (error) => {
    if (error?.response?.status === 401) {
      await jwtRefresh();
      return await createUserRequest(userDate).catch((error) =>
        console.error('Error : ', error)
      );
    }
  });
};
export const decodedJwt = () => {
  const dataStr = localStorage.getItem('decoded_token');
  const jwtDecode = JSON.parse(dataStr);
  return jwtDecode;
};
export const resetPassword = async (data) => {
  const { newPassword, verifyPassword } = data;

  const { id } = decodedJwt();
  if (newPassword === verifyPassword) {
    return await updateUserRequest(id, { password: newPassword });
  }
};
