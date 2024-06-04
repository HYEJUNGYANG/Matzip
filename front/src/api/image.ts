import axiosInstance from './axios';

const uploadImages = async (body: FormData): Promise<string[]> => {
  const {data} = await axiosInstance.post('/images', body, {
    headers: {
      // 이렇게 명시하지 않으면 이미지 업로드시 에러발생
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export {uploadImages};
