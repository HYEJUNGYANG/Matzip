import {ResponseCalendarPost, getCalendarPosts} from '@/api';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types';
import {keepPreviousData, useQuery} from '@tanstack/react-query';

function useGetCalendarPosts(
  year: number,
  month: number,
  queryOptions?: UseQueryCustomOptions<ResponseCalendarPost>,
) {
  return useQuery({
    queryFn: () => getCalendarPosts(year, month),
    queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POST, year, month],
    // 캘린더에서 다음 or 이전 달로 이동할 때(캐시되지 않은 날짜를 가져올 때) 화면에서 목록이 잠깐 사라지는 깜빡임 현상 발생
    // 데이터를 가져오는 동안 이전 데이터 유지할 수 있는 기능!
    // 페이지네이션 기능 이용할 때 유용!
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
}

// v4
// keepPreviousData: true

export default useGetCalendarPosts;
