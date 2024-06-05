import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationState {
  moveLocation: LatLng | null;
  setMoveLocation: (location: LatLng) => void;
}

const useLocationStore = create<LocationState>(set => ({
  moveLocation: null, // 이동할 위치
  // 위치 변경할 함수
  setMoveLocation: (moveLocation: LatLng) => {
    set({moveLocation});
  },
}));

export default useLocationStore;
