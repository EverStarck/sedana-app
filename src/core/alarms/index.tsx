import { create } from 'zustand';

import type { AlarmType, InputAlarmType } from './utils';
import { getAlarms, setAlarm } from './utils';

interface AlarmsState {
  alarm: AlarmType | null;
  alarms: AlarmType[];
  createAlarm: (data: InputAlarmType) => void;
  setAlarm: (alarm: AlarmType) => void;
}

const useAlarmStore = create<AlarmsState>((set) => ({
  alarm: null,
  alarms: getAlarms(),
  setAlarm: (alarm: AlarmType) => set({ alarm }),
  createAlarm: (alarm) => {
    setAlarm(alarm);
    set({ alarms: getAlarms() });
  },
}));

export default useAlarmStore;
