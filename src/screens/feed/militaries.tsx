import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';

import { Image, ScrollView, Text, View } from '@/ui';

import { Title } from '../style/title';
import { showMessage } from 'react-native-flash-message';
import { useQuery } from '@tanstack/react-query';
import { fetchMilitaries, Military } from '@/api/posts/use-militaries';
import { getImageUrl } from '@/utils';

export const Militaries = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['militaries'],
    queryFn: fetchMilitaries,
  });
  const { navigate } = useNavigation();

  const renderItem = React.useCallback(
    ({ item }: { item: Military }) => (
      <>
        <View className="flex-1 flex-row w-full">
          <View className="w-4/6 justify-center content-center">
            <Text variant="md" numberOfLines={1} className="font-bold wm">
              {item.name}
            </Text>
            <Text variant="xs" numberOfLines={1}>
              range: {item.range}
            </Text>
            {/* <Text variant="xs" numberOfLines={1}>
          Total time: {item.ranges.reduce((acc, { time }) => acc + time, 0)}
          s
        </Text> */}
          </View>
          <View className="w-2/6 gap-y-1 items-center justify-center content-center flex-row flex-wrap">
            {/* {item.ranges.map(({ range }) => (
          <Image
            key={range}
            className="h-6 w-16 object-contain"
            source={{
              uri: getImageUrl(range),
            }}
          />
        ))} */}
          </View>
        </View>
      </>
    ),
    [navigate]
  );

  if (isError || !data) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="flex-1 px-4 pt-1">
        {Object.keys(data).map((key) => {
          const mil = data[key as keyof typeof data];
          return (
            <View key={key}>
              <Title text={key.charAt(0).toUpperCase() + key.slice(1)} />
              {mil.map((m) => (
                <View
                  className="m-2 block overflow-hidden rounded-xl g-neutral-200 p-6 shadow-xl bg-neutral-200 dark:bg-charcoal-900"
                  key={m.id}
                >
                  <View className="flex-1 flex-row w-full gap-6">
                    <View className="w-2/6 gap-y-1 items-center justify-center content-center flex-row flex-wrap">
                      <Image
                        className="w-full h-full object-contain"
                        source={{
                          uri: m.photo,
                        }}
                      />
                    </View>
                    <View className="w-4/6 justify-center content-center">
                      <Text
                        variant="xl"
                        numberOfLines={1}
                        className="font-bold wm"
                      >
                        {m.name}
                      </Text>
                      <Text variant="sm">{m.desc}</Text>
                      <Image
                        className="h-5 w-14 object-contain rounded-sm"
                        source={{
                          uri: getImageUrl(m.range),
                        }}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};
