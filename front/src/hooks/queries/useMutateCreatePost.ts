import {createPost} from '@/api';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants';
import {Marker, UseMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    // 등록 버튼 눌러서 성공시에 마커가 바로 표시될 수 있도록!!
    // 이 방법들은(1, 2) 서버에서 요청이 성공했을 때 어떤 데이터를 response로 내려줄 때 사용하면 좋음
    // 상황에 맞게 골라서
    onSuccess: newPost => {
      // 지도에서 마커 새로 등록했을 때 피드 탭가면 바로 반영 안되는 문제 -> 피드를 불러오는 쿼리를 무효화
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST],
      });
      // 1.쿼리 무효화
      // queryClient.invalidateQueries({
      //   queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      // });

      // 2. 캐시 직접 업데이트 (네트워크 요청을 줄이는 장점 존재)
      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        existingMarkers => {
          const newMarker = {
            id: newPost.id,
            latitude: newPost.latitude,
            longitude: newPost.longitude,
            color: newPost.color,
            score: newPost.score,
          };

          // 처음 등록했을 땐 이전 마커가 존재하지 않기 때문에
          return existingMarkers
            ? [...existingMarkers, newMarker]
            : [newMarker];
        },
      );
    },
    ...mutationOptions,
  });
}

export default useMutateCreatePost;
