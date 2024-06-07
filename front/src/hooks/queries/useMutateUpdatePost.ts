import {updatePost} from '@/api';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';

function useMutateUpdatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updatePost,
    // 성공시 서버에서 responseSinglePost 타입으로 수정된 포스트 정보가 그대로 오게됨
    onSuccess: newPost => {
      // 수정을 했다면, 피드 목록을 무효화 해줘야 title, description 등 수정된 정보가 업데이트 되어 보임
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST],
      });
      // 마커정보도 무효화
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      // 피드 상세 페이지도 - 무효화 하지 않아도 수정된 포스트 정보로 캐시 정보 업데이트 하면됨
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, newPost.id],
        newPost,
      );
      // 피드 리스트 페이지
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      // 캘린더 페이지
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POST],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateUpdatePost;
