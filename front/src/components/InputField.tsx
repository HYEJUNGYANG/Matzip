import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React, {ForwardedRef, forwardRef, useRef} from 'react';
import {colors} from '../constants';
import {mergeRefs} from '../utils';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

// 디바이스의 높이 가져옴
const deviceHeight = Dimensions.get('screen').height;

const InputField = forwardRef(
  (
    {disabled = false, error, touched, ...props}: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const inputRef = useRef<TextInput | null>(null);

    // input부분이 아닌 error msg(View컴포넌트) 부분을 클릭해도 input에 포커스를 해주기 위함 (Pressable 컴포넌트로 먼저 감싸주고나서!)
    const handlePressInput = () => {
      inputRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError,
          ]}>
          <TextInput
            ref={ref ? mergeRefs(inputRef, ref) : inputRef}
            // false일 때는 편집 가능
            editable={!disabled}
            placeholderTextColor={colors.GRAY_500}
            style={[styles.input, disabled && styles.disabled]}
            {...props}
            autoCapitalize="none" // 자동 대문자 방지
            spellCheck={false}
            autoCorrect={false}
          />
          {/* error 메세지가 있을 때만 해당 컴포넌트 표시하기 위해 string 타입을 Boolean으로 변경 */}
          {touched && Boolean(error) && (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
      </Pressable>
    );
  },
);

export default InputField;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: deviceHeight > 700 ? 15 : 10,
  },
  input: {
    fontSize: 16,
    color: colors.BLACK,
    padding: 0,
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});
