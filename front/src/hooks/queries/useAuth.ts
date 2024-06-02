import {UseQueryResult, useMutation, useQuery} from '@tanstack/react-query';
import {
  ResponseProfile,
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '@/api/auth';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import {removeEncryptStorage, setEncryptStorage} from '@/utils';
import {removeHeader, setHeader} from '@/utils';
import {useEffect} from 'react';
import queryClient from '@/api/queryClient';
import {numbers, queryKeys, storageKeys} from '@/constants';

// 로그인
// Omit을 사용해서 UseMutationOptions에서 기본으로 제공하는 mutationFn을 제외하고 직접 쓸 수 있도록함
function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    // 성공시 encryptStorage에 refresh 토큰 저장
    // accessToken은 헤더에 저장
    onSuccess: ({accessToken, refreshToken}) => {
      // key, value
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      // 대부분의 요청은 accessToken이 header에 있어야 함
      // 그때마다 header에 accessToken을 넣기보단
      // 기본적으로 header에 넣어놓을 수 있음
      // Authorization에다가 accessToken을 넣어줌
      // 이렇게 하면 앞으로 default로 헤더가 들어가게됨
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onError: e => console.log(e),

    // 성공, 실패 상관없이 기본적으로 실행
    onSettled: () => {
      // 로그인을 한 뒤에는 refreshHook을 한 번 호출해줘서 자동갱신이 처음 로그인 했을 때도 옵션에 따라 로직이 돌도록
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      // 로그인 한 뒤에는 다시 남아있는 프로필 데이터도 변경해야 할 수도 있음
      // 쿼리를 stale(오래된) 데이터로 만들기 위해서
      // invalidateQueries로 키를 줘서 useGetProfile 훅을 한 번 무효화
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  // 엑세스토큰을 한 번 받아와서 평생 쓰는 것이 X
  // 보안상 짧게 유효시간을 가져감
  // 따로 저장소에 저장도 X
  // stale(신선하지 않은) 데이터로 취급되는 시간 지정 가능
  // ---------------------------------------------------
  // refreshToken 요청이 성공했을 때 header의 accessToken과 encrypt에 있는 refreshToken을 닫아야(???) 한다?
  // v5부터는 useQuery()에서 onSuccess와 같은 옵션들이 제거됨 (v4까지는 있었음)
  // 그래서 그 함수들과 비슷한 역할을 할 수 있는 기능을 구현
  // useQuery 반환값(상태)을 이용해서 요청이 성공했을 때, 실패했을 때 처리해주면 됨
  const {isSuccess, data, isError} = useQuery({
    // query key를 전달! 첫 번째는 auth, 두 번째는 get~
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME, // 27분
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME, // 시간 주기에 따라 다시 refetch 가능
    refetchOnReconnect: true, // 앱을 종료하지 않고 다른 작업을 했다가 돌아왔을 때 자동 갱신
    refetchIntervalInBackground: true, // 다시 연결되거나 백그라운드에서 refetch될 수 있음
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    // 실패한다면 header와 encryptStorage를 지워줌
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError};
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<ResponseProfile>) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

// 이전 버전인 v4에서는 객체로 전달하지 않고 바로 사용 가능했었음!
// v5부터는 객체로 전달

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess, // true인 경우에 query가 실행될 수 있음 (즉, refreshTokenQuery가 성공적일 때만 getProfileQuery 가져올 수 있음)
  });
  const isLogin = getProfileQuery.isSuccess; // refreshTokenQuery가 성공적이라면 로그인 됐다고 볼 수 있음
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
  };
}

export default useAuth;
