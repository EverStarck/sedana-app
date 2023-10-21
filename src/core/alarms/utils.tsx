import uuid from 'uuid-random';

import { getItem, setItem } from '@/core/storage';

import { getToken } from '../auth/utils';
import { supabase } from '@/lib/supabase';

export type InputAlarmType = {
  name: string;
  ranges: RangeType[];
};

export type RangeType = {
  range: string;
  time: number;
};

export type AlarmType = InputAlarmType & {
  id: string;
};

export const getAlarms = () => {
  const token = getToken();

  return getItem<AlarmType[]>(JSON.stringify(token)) || [];
};

export const setAlarm = (value: InputAlarmType) => {
  const token = getToken();
  const alarms = getAlarms() || [];
  value.id = uuid();

  if (alarms) {
    alarms.push(value as AlarmType);
    setItem<AlarmType[]>(JSON.stringify(token), alarms);
  } else {
    setItem<AlarmType[]>(JSON.stringify(token), [value as AlarmType]);
  }
};

export const bulkSetAlarm = (newAlarms: AlarmType[]) => {
  const token = getToken();
  const alarms = getAlarms() || [];

  if (alarms) {
    const filteredAlarms = newAlarms.filter(
      (newAlarm) => !alarms.find((alarm) => alarm.id === newAlarm.id)
    );

    setItem<AlarmType[]>(JSON.stringify(token), [...alarms, ...filteredAlarms]);
  } else {
    setItem<AlarmType[]>(JSON.stringify(token), newAlarms);
  }
};

export const getAlarmsDB = async () => {
  let { data: alarms, error } = await supabase.from('alarms').select('*');

  if (error)
    return {
      error: true,
      data: null,
      message: 'Something went wrong. Please try again later.',
    };

  return {
    error: false,
    data: alarms as AlarmType[],
    message: 'Alarms synced successfully.',
  };
};
