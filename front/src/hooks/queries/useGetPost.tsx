import {ResponseSinglePost, getPost} from '@/api';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types';
import {useQuery} from '@tanstack/react-query';

function useGetPost(
  id: number | null,
  queryOptions?: UseQueryCustomOptions<ResponseSinglePost>,
) {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: Boolean(id), // id값이 있을 때만 쿼리 실행
    ...queryOptions,
  });
}

export default useGetPost;
