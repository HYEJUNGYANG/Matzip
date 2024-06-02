import {QueryClient} from '@tanstack/react-query';

// default옵션 설정가능
// react query는 요청을 실패하면 기본적으로 3번 재요청을 하게되는데 이걸 막음
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
