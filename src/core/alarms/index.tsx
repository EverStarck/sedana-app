import { create } from 'zustand';

import {
  getAlarms,
  setAlarm,
  getAlarmsDB,
  AlarmType,
  bulkSetAlarm,
  InputAlarmType,
} from './utils';

interface AlarmsState {
  alarm: AlarmType | null;
  alarms: AlarmType[];
  createAlarm: (data: InputAlarmType) => void;
  setAlarm: (alarm: AlarmType) => void;
  syncAlarms: () => Promise<{
    error: boolean;
    message: string;
  }>;
  hydrate: () => void;
}

const useAlarmStore = create<AlarmsState>((set) => ({
  alarm: null,
  alarms: getAlarms(),
  setAlarm: (alarm: AlarmType) => set({ alarm }),
  createAlarm: (alarm) => {
    setAlarm(alarm);
    set({ alarms: getAlarms() });
  },
  syncAlarms: async () => {
    const { data, error, message } = await getAlarmsDB();

    if (error) {
      return {
        error,
        message,
      };
    }

    if (data) {
      bulkSetAlarm(data);
      set({ alarms: getAlarms() });
    }

    return {
      error,
      message,
    };
  },
  hydrate: () => {
    const alarms = getAlarms();
    set({ alarms });
  },
}));

export default useAlarmStore;

export const hydrateAlarms = () => useAlarmStore.getState().hydrate();
