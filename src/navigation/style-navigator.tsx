import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { AddAlarm, Style, Alarm } from '@/screens';

export type StyleStackParamList = {
  Style: undefined;
  Alarm: undefined;
  AddAlarm: undefined;
};

const Stack = createNativeStackNavigator<StyleStackParamList>();

export const StyleNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Style" component={Style} />
        <Stack.Screen name="Alarm" component={Alarm} />
      </Stack.Group>
      <Stack.Screen
        name="AddAlarm"
        component={AddAlarm}
        options={{
          title: 'Create New Alarm',
        }}
      />
    </Stack.Navigator>
  );
};
