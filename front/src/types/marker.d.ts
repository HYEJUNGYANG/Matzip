import {LatLng, MapMarkerProps} from 'react-native-maps';

// MapMarkerProps는 coordinate가 optional 타입이 아니기 때문에 변경해주기 위함
declare module 'react-native-maps' {
  export interface MyMapMarkerProps extends MapMarkerProps {
    coordinate?: LatLng;
  }
}
