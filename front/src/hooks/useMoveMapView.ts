import {numbers} from '@/constants';
import useLocationStore from '@/store/useLocationStore';
import {useEffect, useRef, useState} from 'react';
import MapView, {LatLng, Region} from 'react-native-maps';
import useModal from './useModal';

// Pick -> 원하는 것만 꺼내쓸 수 있음
type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

function useMoveMapView() {
  const mapRef = useRef<MapView | null>(null);
  const [regionDelta, setRegionDelta] = useState<Delta>(numbers.INITIAL_DELTA);
  const {moveLocation} = useLocationStore();

  const moveMapView = (coordinate: LatLng, delta?: Delta) => {
    // 넣어준 곳으로 이동
    mapRef.current?.animateToRegion({
      ...coordinate,
      // 확대 정도(델타)
      ...(delta ?? regionDelta),
    });
  };

  // delta 변경 함수
  const handleChangeDelta = (region: Region) => {
    const {latitudeDelta, longitudeDelta} = region;
    setRegionDelta({latitudeDelta, longitudeDelta});
  };

  useEffect(() => {
    moveLocation && moveMapView(moveLocation);
  }, [moveLocation]);

  return {mapRef, moveMapView, handleChangeDelta};
}

export default useMoveMapView;
