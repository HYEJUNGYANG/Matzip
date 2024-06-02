import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import {authNavigations} from '@/constants';
import SignupScreen from '@/screens/auth/SignupScreen';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.LOGIN]: undefined;
  [authNavigations.SIGNUP]: undefined;
};

// stack 만드는 방법
// 1. 먼저 createStackNavigator를 이용해서 Stack 생성
const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    // screenOptions를 가장 상위 컴포넌트에 넣어주면 하위 컴포넌트 전체 적용
    // 개별 컴포넌트에 따로 원하는 옵션을 줄 수도 있음
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray', // 상단바 하단 border 색 결정
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black', // header 텍스트 색상
      }}>
      {/* name -> 스크린의 이름, component -> 보여질 컴포넌트 지정 */}
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={AuthHomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false, // 해당 컴포넌트 화면에서 header를 보여줄지 말지 결정! false면 header 부분 자체가 없기 때문에 컨텐츠 상단 높이가 위로 올라옴
        }}
      />
      <Stack.Screen
        name={authNavigations.LOGIN}
        component={LoginScreen}
        // headerTitle: 타이틀 이름 변경 (default 값은 Screen name값)
        options={{headerTitle: '로그인'}}
      />
      <Stack.Screen
        name={authNavigations.SIGNUP}
        component={SignupScreen}
        options={{headerTitle: '회원가입'}}
      />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;

const styles = StyleSheet.create({});
