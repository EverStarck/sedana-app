import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';

import type { Post } from '@/api';
import { usePosts } from '@/api';
import { Button, EmptyList, FocusAwareStatusBar, Text, View } from '@/ui';

import { Card } from './card';
import { Title } from '../style/title';
import useAlarmStore from '@/core/alarms';
import { showMessage } from 'react-native-flash-message';

export const Feed = () => {
  const [isSyncing, setIsSyncing] = React.useState(false);
  const { data, isLoading, isError } = usePosts();
  const syncAlarms = useAlarmStore((state) => state.syncAlarms);
  const { navigate } = useNavigation();

  const syncHandler = async () => {
    setIsSyncing(true);
    await syncAlarms();
    setIsSyncing(false);

    showMessage({
      message: 'Alarms Synced',
      type: 'success',
    });
  };

  const renderItem = React.useCallback(
    ({ item }: { item: Post }) => (
      <Card {...item} onPress={() => navigate('Post', { id: item.id })} />
    ),
    [navigate]
  );

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <Title text="Synchronize Alarms" />
      <Button
        label="Sync"
        variant="secondary"
        onPress={syncHandler}
        loading={isSyncing}
      />
      <Title text="Military Catalog" />
      <Button
        label="View Militaries"
        variant="secondary"
        onPress={() => navigate('AddAlarm')}
      />

      <Title text="Comunicados" />
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        estimatedItemSize={300}
      />
    </View>
  );
};
