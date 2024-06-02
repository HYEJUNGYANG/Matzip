import axios from 'axios';
import {Platform} from 'react-native';

const axiosInstance = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3030'
      : 'http://localhost:3030', // 안드로이드는 localhost로 하면 동작 안될 수도 있음! 10.0.2.2로 변경하기
  withCredentials: true,
});

export default axiosInstance;
