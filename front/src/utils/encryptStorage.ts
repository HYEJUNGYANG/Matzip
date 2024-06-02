// web에 있는 localStorage와 유사
// async, await 문법 사용해야함

import EncryptedStorage from 'react-native-encrypted-storage';

// 저장하는 함수
const setEncryptStorage = async <T>(key: string, data: T) => {
  await EncryptedStorage.setItem(key, JSON.stringify(data));
};

// 가져오는 함수
const getEncryptStorage = async (key: string) => {
  const storedData = await EncryptedStorage.getItem(key);

  // storedData를 체크해서 존재하는지 확인 후 다르게 적용
  return storedData ? JSON.parse(storedData) : null;
};

// encryptStorage를 지우는 함수
const removeEncryptStorage = async (key: string) => {
  // key에 해당하는 데이터 있는지 체크
  const data = await getEncryptStorage(key);
  if (data) {
    await EncryptedStorage.removeItem(key);
  }
};

export {setEncryptStorage, getEncryptStorage, removeEncryptStorage};
