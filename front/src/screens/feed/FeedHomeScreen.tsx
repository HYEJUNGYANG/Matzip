import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FeedList from '@/components/feed/FeedList';

function FeedHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
    </SafeAreaView>
  );
}

export default FeedHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
