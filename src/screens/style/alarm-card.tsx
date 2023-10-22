import * as React from 'react';

import { Text, View, Image } from '@/ui';
import { RangeType } from '@/core/alarms/utils';
import { getImageUrl } from '@/utils';
import { Audio } from 'expo-av';

export const AlarmCard = ({ range }: { range: RangeType }) => {
  const [time, setTime] = React.useState(range.time);
  const [color, setColor] = React.useState('#5cb85c');
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
        setColor(
          Math.floor(
            ((range.time - timerRef.current) / range.time) * 255
          ).toString(16)
        );
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <View
      className="m-2 block overflow-hidden rounded-xl g-neutral-200 p-4 shadow-xl"
      style={{
        backgroundColor:
          time <= 0
            ? '#d9534f'
            : color === '#5cb85c'
            ? '#5cb85c'
            : `#${color}b85c`,
      }}
    >
      <View className="flex-1 flex-row w-full">
        <View className="w-4/6 justify-center content-center gap-2">
          <Text variant="h3" numberOfLines={2} className="font-bold wm">
            {range.range}
          </Text>
          <Image
            style={{ width: 120, height: 50 }}
            contentFit="contain"
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
