import * as React from 'react';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';
import {
  Button,
  ControlledInput,
  Input,
  ScrollView,
  Select,
  showErrorMessage,
  View,
} from '@/ui';
import { Title } from './title';
import type { Option } from '@/ui';
import useAlarmStore from '@/core/alarms';
import uuid from 'uuid-random';

const schema = z.object({
  name: z.string().min(10),
  range: z.string().min(1),
  time: z.number().min(1),
});

type FormType = z.infer<typeof schema>;

const options: Option[] = [
  { value: 'Silver', label: 'Silver' },
  { value: 'Nova', label: 'Nova' },
  { value: 'Master Guardian', label: 'Master Guardian' },
  { value: 'Legendary Eagle', label: 'Legendary Eagle' },
  { value: 'Supreme First Class', label: 'Supreme First Class' },
  { value: 'Global Elite', label: 'Global Elite' },
];

const cleanData = (data: { range: string | null; time: number | null }[]) => {
  // remove duplicates by name
  const uniqueData = data.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.range === item.range)
  );

  return uniqueData.filter((item) => item.range && item.time);
};

export const AddAlarm = () => {
  const createAlarm = useAlarmStore((state) => state.createAlarm);
  const { control, handleSubmit } = useForm<FormType>();

  const [rangeList, setRangeList] = React.useState<
    Array<{ range: string | null; time: number | null }>
  >([{ range: null, time: null }]);

  const addNewRange = () => {
    setRangeList([...rangeList, { range: null, time: null }]);
  };

  const onSubmit = (data: FormType) => {
    console.log('🚀 ~ file: add-alarm.tsx:52 ~ onSubmit ~ data:', data);
    console.log(
      '🚀 ~ file: add-alarm.tsx:59 ~ onSubmit ~ rangeList:',
      rangeList
    );
    if (data.name?.length < 4) {
      showErrorMessage('Alarm Name must be at least 4 characters');
      return;
    }

    const cleanedRanges = cleanData(rangeList);
    console.log(
      '🚀 ~ file: add-alarm.tsx:59 ~ onSubmit ~ cleanedRanges:',
      cleanedRanges
    );

    if (!cleanedRanges.length) {
      showErrorMessage(
        'You must add at least one range and time must be greater than 0'
      );
      return;
    }

    createAlarm({
      name: data.name,
      ranges: cleanedRanges as any,
    });

    showMessage({
      message: 'Alarm added successfully',
      type: 'success',
    });
  };

  return (
    <ScrollView>
      <View className="flex-1 p-4 ">
        <ControlledInput name="name" label="Alarm Name" control={control} />

        <Title text="Ranges" />
        {rangeList.map((rangeItem, index) => {
          return (
            <View id={uuid()}>
              <Title text={`${index + 1}`} />
              <Select
                label="Select"
                options={options}
                placeholder="Select"
                value={rangeItem.range || undefined}
                onSelect={(option) => {
                  const newRangeList = [...rangeList];
                  newRangeList[index].range = option as string;
                  setRangeList(newRangeList);
                }}
              />
              <Input
                label="Time to eat (seconds)"
                placeholder="60"
                keyboardType="numeric"
                value={
                  isNaN(Number(rangeItem.time))
                    ? ''
                    : rangeItem.time?.toString()
                }
                onChangeText={(text) => {
                  const newRangeList = [...rangeList];
                  newRangeList[index].time = Number(text);
                  setRangeList(newRangeList);
                }}
              />

              {/* <ControlledSelect
              name={`range${index}`}
              label="Select"
              control={control}
              options={options}
            />
            <ControlledInput
              name={`time${index}`}
              label="Time to eat (seconds)"
              control={control}
              keyboardType="numeric"
            /> */}
            </View>
          );
        })}

        {rangeList.length < options.length && (
          <Button
            label="Add new range"
            variant="outline"
            onPress={addNewRange}
          />
        )}

        <Title text="Save Alarm" />
        <Button
          label="Create Alarm"
          variant="secondary"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  );
};
