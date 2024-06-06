import {deletePost} from '@/api';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';

function useMutateDeletePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deletePost,
    // 삭제된 포스트의 아이디 정보를 받아올 수 있음
    onSuccess: deleteId => {
      // 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST],
      });
      // 지도에서도 사라져야 함
      // 마커를 가져오는 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      // deleteId를 이용해서 쿼리 무효화 대신 캐시를 직접 업데이트 해도 됨
      //   queryClient.setQueryData<Marker[]>(
      //     [queryKeys.MARKER, queryKeys.GET_MARKERS],
      //     existingMarkers => {
      //       return existingMarkers?.filter(marker => marker.id !== deleteId);
      //     },
      //   );
    },
    ...mutationOptions,
  });
}

export default useMutateDeletePost;
