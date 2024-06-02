import {
  Pressable,
  StyleSheet,
  Text,
  PressableProps,
  Dimensions,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../constants';

interface CustomButtonProps extends PressableProps {
  label: string;
  // ? -> optional (variant값은 필수가 아님)
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'medium';
  inValid?: boolean; // 버튼 비활성화 여부! true -> 비활성화(사용불가) / false -> 활성화(사용가능)
}

// 'screen', 'window'를 get 했을 때, ios는 차이가 없지만 android에는 차이점이 존재!!
// 1. screen -> 상태 표시줄 포함
// 2. window -> 상태 표시줄 미포함
const deviceHeight = Dimensions.get('screen').height;

// variant = 'filled' 처럼 값을 넣어주면 기본값이 filled!
function CustomButton({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
  ...props
}: CustomButtonProps) {
  // Pressable 컴포넌트 -> Button 컴포넌트와 유사하지만 버튼을 눌렀을 때를 감지하여 스타일을 쉽게 줄 수 있음
  return (
    // style을 여러개 하고싶으면 배열로 만들기
    <Pressable
      disabled={inValid}
      // Pressable 컴포넌트는 style에서 pressed라는 상태를 제공해줌
      style={({pressed}) => [
        styles.container,
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        inValid && styles.inValid,
      ]}
      {...props}>
      <View style={styles[size]}>
        <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
      </View>
    </Pressable>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inValid: {
    opacity: 0.5,
  },
  filled: {
    backgroundColor: colors.PINK_700,
  },
  outlined: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
  },
  filledPressed: {
    backgroundColor: colors.PINK_500,
  },
  outlinedPressed: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
    opacity: 0.5,
  },
  large: {
    width: '100%',
    paddingVertical: deviceHeight > 700 ? 15 : 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  medium: {
    width: '50%',
    paddingVertical: deviceHeight > 700 ? 12 : 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    fontWeight: '700', // fontWeight은 string으로
  },
  filledText: {
    color: colors.WHITE,
  },
  outlinedText: {
    color: colors.PINK_700,
  },
});
