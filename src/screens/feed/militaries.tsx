import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';

import { EmptyList, Image, ScrollView, Text, View } from '@/ui';

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

  if (isLoading) {
    return <EmptyList isLoading={isLoading} />;
  }

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
