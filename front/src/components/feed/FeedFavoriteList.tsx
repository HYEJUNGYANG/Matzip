import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FeedItem from './FeedItem';
import useGetInfiniteFavoritePosts from '@/hooks/queries/useGetInfiniteFavoritePost';

interface FeedListProps {}

function FeedFavoriteList({}: FeedListProps) {
  // fetchNextPage -> 다음 페이지 가져오기, hasNextPage -> 다음 페이지 존재 여부, isFetchingNextPage -> 다음 페이지를 가져오고 있는 상태
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteFavoritePosts();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // FlatList -> 데이터의 길이가 가변적이면서 서버에서 가져오는 데이터를 많이 표시할 때!
  // 스크롤뷰는 데이터 길이가 많지 않거나 고정적인 길이를 표시할때 사용하면 좋음
  return (
    // post.pages는 이중배열이기 때문에 flat을 이용해 한단계 배열로 만들어줌
    // renderItem => 표시할 아이템
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      ListEmptyComponent={
        <View>
          <Text style={{textAlign: 'center'}}>즐겨찾기한 장소가 없습니다.</Text>
        </View>
      }
      contentContainerStyle={styles.contentContainer}
      // onEndReachedThreshold(number) -> 스크롤이 마지막에 닿지 않아도 원하는 위치에서 핸들러 연결가능
      onEndReached={handleEndReached} // 스크롤이 마지막에 닿았을 때 핸들러 연결
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      scrollIndicatorInsets={{right: 1}} // ios에서 간혹 스크롤 위치 버그가 있을 수 있어서 스크롤 위치 고정
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedFavoriteList;
