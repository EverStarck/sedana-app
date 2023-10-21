import React from 'react';

import type { Post } from '@/api';
import { Image, Pressable, Text, View } from '@/ui';

type Props = Post & { onPress?: () => void };

export const Card = ({ title, body, onPress = () => {} }: Props) => {
  return (
    <Pressable
      className="m-2 block overflow-hidden rounded-xl  bg-neutral-200 p-2 shadow-xl dark:bg-charcoal-900"
      onPress={onPress}
    >
      <View>
        <Text variant="md" numberOfLines={1} className="font-bold">
          {title}
        </Text>
        <Text variant="xs" numberOfLines={3}>
          {body}
        </Text>
      </View>
    </Pressable>
  );
};
