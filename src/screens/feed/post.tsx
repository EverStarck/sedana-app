import { useRoute } from '@react-navigation/native';
import * as React from 'react';

import { fetchPost } from '@/api';
import type { RouteProp } from '@/navigation/types';
import { ActivityIndicator, FocusAwareStatusBar, Text, View } from '@/ui';
import { useQuery } from '@tanstack/react-query';

export const Post = () => {
  const { params } = useRoute<RouteProp<'Post'>>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts', params.id],
    queryFn: () => fetchPost(params.id),
  });

  if (isLoading) {
    return (
      <View className="flex-1  justify-center">
        <ActivityIndicator />
      </View>
    );
  }
  if (isError || !data) {
    return (
      <View className="flex-1  justify-center">
        <FocusAwareStatusBar />
        <Text variant="md" className="text-center">
          Error loading post
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 overflow-hidden bg-neutral-200 p-2 shadow-xl dark:bg-charcoal-900">
      <FocusAwareStatusBar />
      <Text variant="h2" className="mb-4 font-bold">
        {data.title}
      </Text>
      <Text variant="md">{data.body} </Text>
    </View>
  );
};
