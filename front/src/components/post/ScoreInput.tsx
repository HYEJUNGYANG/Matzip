import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
import {colors} from '@/constants';

interface ScoreInputProps {
  score: number;
  onChangeScore: (value: number) => void;
}

function ScoreInput({score, onChangeScore}: ScoreInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>평점</Text>
        <Text style={styles.labelText}>{score}점</Text>
      </View>
      <Slider
        value={score}
        onValueChange={onChangeScore}
        step={1}
        minimumValue={1}
        maximumValue={5}
        minimumTrackTintColor={colors.PINK_700} // 채워지지 않았을 때 색상
        maximumTrackTintColor={colors.GRAY_300} // 채워질 때 색상
        thumbTintColor={colors.GRAY_100} // 조절하는 버튼의 색상
      />
    </View>
  );
}

export default ScoreInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    color: colors.GRAY_700,
  },
});
