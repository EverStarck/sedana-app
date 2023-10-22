import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { AddAlarm, Style, AlarmC } from '@/screens';

export type StyleStackParamList = {
  Style: undefined;
  AlarmC: { name: string };
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
      </Stack.Group>
      <Stack.Screen
        name="AlarmC"
        component={AlarmC}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="AddAlarm"
        component={AddAlarm}
        options={{
          title: 'Add Alarm',
        }}
      />
    </Stack.Navigator>
  );
};
