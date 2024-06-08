import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import AuthStackNavigator from './src/navigations/stack/AuthStackNavigator';
import RootNavigator from './src/navigations/root/RootNavigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import {colors} from '@/constants';

// toast 메세지 커스텀
const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: colors.BLUE_500}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: colors.RED_500}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
};

/**
 * RN 기본 설명
 * View 컴포넌트 -> web에서의 div와 유사 (기본적으로 많이 쓰임)
 * div 태그는 <div>text</div>와 같이 태그 안에 바로 텍스트를 작성해도 괜찮지만
 * View 컴포넌트는 정말 View 그 자체이기 때문에 따로 Text 컴포넌트 사용 필요
 */

function App() {
  return (
    // 제일 상위에 QueryClientProvider로 감싸고 queryClient를 클라이언트로 보내줌
    // react query는 데이터 패칭을 위한 useQuery와 데이터 업데이트를 위한 useMutation을 제공
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

// css와 유사하게 스타일링 가능
// RN에서는 기본적으로 카멜케이스 사용
const styles = StyleSheet.create({});

export default App;
