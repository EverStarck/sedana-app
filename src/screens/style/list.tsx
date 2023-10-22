import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Button,
  EmptyList,
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
} from '@/ui';
import useAlarmStore from '@/core/alarms';
import { AlarmType } from '@/core/alarms/utils';
import { Pressable, Image } from '@/ui';
import { getImageUrl } from '@/utils';

export const Style = () => {
  const [alarms, setAlarm] = useAlarmStore((state) => [
    state.alarms,
    state.setAlarm,
  ]);
  const { navigate } = useNavigation();

  const renderItem = React.useCallback(
    ({ item }: { item: AlarmType }) => (
      <Pressable
        id={item.id}
        className="m-2 block overflow-hidden rounded-xl g-neutral-200 p-4 shadow-xl bg-neutral-200 dark:bg-charcoal-900"
        onPress={() => {
          setAlarm(item);
          navigate('AlarmC');
        }}
      >
        <View className="flex-1 flex-row w-full">
          <View className="w-4/6 justify-center content-center">
            <Text variant="md" numberOfLines={1} className="font-bold wm">
              {item.name}
            </Text>
            <Text variant="xs" numberOfLines={1}>
              Total of ranges: {item.ranges.length}
            </Text>
            <Text variant="xs" numberOfLines={1}>
              Total time: {item.ranges.reduce((acc, { time }) => acc + time, 0)}
              s
            </Text>
          </View>
          <View className="w-2/6 gap-y-1 items-center justify-center content-center flex-row flex-wrap">
            {item.ranges.map(({ range }) => (
              <Image
                key={range}
                className="h-6 w-16 object-contain"
                source={{
                  uri: getImageUrl(range),
                }}
              />
            ))}
          </View>
        </View>
      </Pressable>
    ),
    [navigate]
  );

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <View className="flex-1 px-4 pt-4">
          <View className="flex-1 ">
            <FocusAwareStatusBar />
            <FlashList
              data={alarms}
              renderItem={renderItem}
              keyExtractor={(_, index) => `item-${index}`}
              ListEmptyComponent={<EmptyList isLoading={false} />}
              estimatedItemSize={300}
            />
            <Button
              label="Create Alarm"
              variant="secondary"
              onPress={() => navigate('AddAlarm')}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
