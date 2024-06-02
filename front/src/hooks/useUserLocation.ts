import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import useAppState from './useAppState';

function useUserLocation() {
  const [userLocation, SetUserLocation] = useState<LatLng>({
    // 초기에 위치값이 없을 경우
    latitude: 35.1347409,
    longitude: 129.0930551,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const {isComback} = useAppState();

  console.log('isComback', isComback);

  // 1. 나의 위치를 구하고
  // 2. 지도를 그곳으로 이동
  useEffect(() => {
    // 현재 위치를 구할 수 있는 함수
    // 두 번째 인자로 에러 상태 표시가능
    // 세 번째에서는 옵션 지정 가능
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        SetUserLocation({latitude, longitude});
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, [isComback]);

  return {userLocation, isUserLocationError};
}

export default useUserLocation;
