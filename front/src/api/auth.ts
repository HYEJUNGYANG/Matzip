import axiosInstance from './axios';
import {Category, Profile} from '../types/domain';
import {getEncryptStorage} from '../utils';

type RequestUser = {
  email: string;
  password: string;
};

const postSignup = async ({email, password}: RequestUser): Promise<void> => {
  // axios대신 axios.ts에서 만든 axiosInstance를 사용하면 정의된 baseURL을 이용하기 때문에 url 앞부분 생략가능
  const {data} = await axiosInstance.post('/auth/signup', {
    email,
    password,
  });

  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

// login은 responseBody로 accessToken, RefreshToken이 옴
const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });

  return data;
};

// Profile, Category 타입을 합친 것
type ResponseProfile = Profile & Category;

const getProfile = async (): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.get('/auth/me');

  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  // 이 api를 호출할 때는 저장된 refreshToken을 불러와서 헤더로 넣어줌
  const refreshToken = await getEncryptStorage('refreshToken');
  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

export {postSignup, postLogin, getProfile, getAccessToken, logout};
export type {RequestUser, ResponseToken, ResponseProfile};
