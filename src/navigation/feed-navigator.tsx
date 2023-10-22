import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { Feed, Post } from '@/screens';
import { Militaries } from '@/screens/feed/militaries';

export type FeedStackParamList = {
  Feed: undefined;
  Post: { id: number };
  Militaries: undefined;
};

const Stack = createNativeStackNavigator<FeedStackParamList>();

export const FeedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Feed" component={Feed} />
      </Stack.Group>
      <Stack.Screen
        name="Post"
        component={Post}
        options={{
          title: 'Press Release',
        }}
      />
      <Stack.Screen
        name="Militaries"
        component={Militaries}
        options={{
          title: 'Militaries',
        }}
      />
    </Stack.Navigator>
  );
};
