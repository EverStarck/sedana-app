import uuid from 'uuid-random';

import { getItem, setItem } from '@/core/storage';

import { getToken } from '../auth/utils';

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
