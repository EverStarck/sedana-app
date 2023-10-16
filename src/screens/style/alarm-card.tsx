import * as React from 'react';

import { Text, View, Image } from '@/ui';
import { AlarmType, RangeType, setAlarm } from '@/core/alarms/utils';
import { getImageUrl } from '@/utils';
import { Audio } from 'expo-av';

export const AlarmCard = ({ range }: { range: RangeType }) => {
  console.log('🚀 ~ file: alarm-card.tsx:26 ~ AlarmCard ~ range:', range);
  const [time, setTime] = React.useState(range.time);
  const timerRef = React.useRef(time);

  React.useEffect(() => {
    const timerId = setInterval(async () => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);

        // play sound
        const { sound } = await Audio.Sound.createAsync(
          require('../../../assets/bellsound.mp3')
        );

        await sound.playAsync();
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <View
      className={`m-2 block overflow-hidden rounded-xl g-neutral-200 p-4 shadow-xl ${
        time <= 0 ? 'bg-red-600' : 'bg-green-600'
      }`}
    >
      <View className="flex-1 flex-row w-full">
        <View className="w-4/6 justify-center content-center gap-2">
          <Text variant="xl" numberOfLines={1} className="font-bold wm">
            {range.range}
          </Text>
          <Image
            className="h-16 w-40 object-contain"
            source={{
              uri: getImageUrl(range.range),
            }}
          />
        </View>
        <View className="w-2/6 gap-y-1 items-center justify-center content-center flex-row flex-wrap">
          <Text variant="h1" numberOfLines={1} className="font-bold wm">
            {time}s
          </Text>
        </View>
      </View>
    </View>
  );
};
