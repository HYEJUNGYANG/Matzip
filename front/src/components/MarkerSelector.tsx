import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomMarker from './CustomMarker';
import {colors} from '@/constants';
import {MarkerColor} from '@/types';

interface MarkerSelectorProps {
  markerColor: MarkerColor;
  onPressMarker: (color: MarkerColor) => void;
  score?: number;
}

const categoryList: MarkerColor[] = [
  'RED',
  'YELLOW',
  'GREEN',
  'BLUE',
  'PURPLE',
];

function MarkerSelector({
  markerColor,
  onPressMarker,
  score = 5,
}: MarkerSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>마커 선택</Text>
      {/* horizontal -> 스크롤 방향을 수평으로 */}
      {/* showsHorizontalScrollIndicator: scrollBar 보여주는 옵션 (true-> 보여줌, false->안보여줌) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {categoryList.map((color, idx) => {
            return (
              <Pressable
                key={idx}
                style={[
                  styles.markerBox,
                  markerColor === color && styles.pressedMarker,
                ]}
                onPress={() => onPressMarker(color)}>
                <CustomMarker color={color} score={score} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

export default MarkerSelector;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: 15,
  },
  markerLabel: {
    marginBottom: 15,
    color: colors.GRAY_700,
  },
  markerInputScroll: {
    flexDirection: 'row',
    gap: 20,
  },
  markerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: colors.GRAY_100,
    borderRadius: 6,
  },
  pressedMarker: {
    borderWidth: 2,
    borderColor: colors.RED_500,
  },
});
