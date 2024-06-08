import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationState {
  moveLocation: LatLng | null;
  selectLocation: LatLng | null;
  setMoveLocation: (location: LatLng) => void;
  setSelectLocation: (location: LatLng) => void;
}

const useLocationStore = create<LocationState>(set => ({
  moveLocation: null, // 이동할 위치
  selectLocation: null,
  // 위치 변경할 함수
  setMoveLocation: (moveLocation: LatLng) => {
    // 기존에 상태 값이 하나 였을 경우
    // set({moveLocation});
    set(state => ({...state, moveLocation}));
  },
  setSelectLocation: (selectLocation: LatLng) => {
    set(state => ({...state, selectLocation}));
  },
}));

export default useLocationStore;
