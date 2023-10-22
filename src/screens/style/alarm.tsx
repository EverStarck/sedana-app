import * as React from 'react';

import { FocusAwareStatusBar, ScrollView, Text, View } from '@/ui';
import useAlarmStore from '@/core/alarms';

import { AlarmCard } from './alarm-card';

export const AlarmC = () => {
  const [alarm] = useAlarmStore((state) => [state.alarm]);

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <View className="flex-1 px-4 pt-10">
          <Text variant="h2">{alarm?.name}</Text>
          {alarm?.ranges.map((range) => (
            <AlarmCard key={range.range} range={range} />
          ))}
        </View>
      </ScrollView>
    </>
  );
};
