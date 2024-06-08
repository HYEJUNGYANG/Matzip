import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useRef} from 'react';
import useForm from '@/hooks/useForm';
import {validateSignup} from '@/utils';
import useAuth from '@/hooks/queries/useAuth';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';
import Toast from 'react-native-toast-message';
import {errorMessages} from '@/constants';

function SignupScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const {signupMutation, loginMutation} = useAuth();
  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });

  const handleSubmit = () => {
    // passwordConfirm은 제외시키기 위해서
    const {email, password} = signup.values;
    signupMutation.mutate(
      {email, password},
      {
        // 회원가입 성공했을 때 바로 로그인 할 수 있도록
        onSuccess: () => loginMutation.mutate({email, password}),
        onError: error =>
          Toast.show({
            type: 'error',
            // 서버에서 보내주는 메세지가 없을 경우를 대비해서 (오른쪽)
            text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
            position: 'bottom',
            visibilityTime: 2000,
          }),
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode="email"
          returnKeyType="next" // return키가 아닌 다른 키 옵션을 주고 싶을때
          blurOnSubmit={false} // next와 같은 키를 눌러도 키가 닫히지 않음 (false)
          onSubmitEditing={() => passwordRef.current?.focus()} // next키를 눌렀을 때 다음 input으로 이동
          {...signup.getTextInputProps('email')}
        />
        <InputField
          key="password"
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode" // ios에서 강력한 암호 뜨게 하는걸 방지
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          key="passwordConfirm"
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          textContentType="oneTimeCode"
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});
