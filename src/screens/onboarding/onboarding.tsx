import React from 'react';

import { useIsFirstTime } from '@/core/hooks';
import { Button, FocusAwareStatusBar, SafeAreaView, Text, View } from '@/ui';

import { Cover } from './cover';
import { Dimensions } from 'react-native';
export const Onboarding = () => {
  const [_, setIsFirstTime] = useIsFirstTime();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View
      className="flex h-full items-center justify-center bg-primary-500"
      style={{
        backgroundColor: '#9d2449',
      }}
    >
      <FocusAwareStatusBar />
      <View className="w-full flex-1 bg-transparent justify-center items-center">
        <Cover
          width={windowWidth * 0.8}
          height={windowHeight * 0.3}
          viewBox={`0 0 300 236`}
        />
      </View>
      <View className="justify-end">
        <Text className="pt-3 text-center text-5xl font-bold">
          Sedena Modena
        </Text>
        <Text className="mb-2 text-center text-sm text-gray-200">
          Utility App for the Mexican National Defense
        </Text>

        <Text className="my-1 pt-6 text-left text-lg">
          🕒 Set alarms for meal times with customizable time ranges
        </Text>
        <Text className="my-1 text-left text-lg">
          🌐 Sync alarms with the zone
        </Text>
        <Text className="my-1 text-left text-lg">
          📰 Access real-time news updates relevant to the military and defense
        </Text>
        <Text className="my-1 text-left text-lg">
          🔍 View an organized military personnel list
        </Text>
      </View>
      <SafeAreaView className="mt-6">
        <Button
          label="Let's Get Started "
          onPress={() => {
            setIsFirstTime(false);
          }}
        />
      </SafeAreaView>
    </View>
  );
};
