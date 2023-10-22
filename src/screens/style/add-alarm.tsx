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
  const [numInputs, setNumInputs] = React.useState(1);
  const refInputs = React.useRef<string[]>([]);

  const addNewRange = () => {
    setRangeList([...rangeList, { range: null, time: null }]);
    refInputs.current.push('');
    setNumInputs(numInputs + 1);
  };

  const setInputValue = (index: number, value: string) => {
    const re = /^[0-9\b]+$/;
    if (value !== '' && !re.test(value)) {
      return;
    }

    refInputs.current[index] = value;

    const newRangeList = [...rangeList];
    newRangeList[index].time = Number(value);
    setRangeList(newRangeList);
  };

  const onSubmit = (data: FormType) => {
    if (data.name?.length < 4) {
      showErrorMessage('Alarm Name must be at least 4 characters');
      return;
    }

    const cleanedRanges = cleanData(rangeList);

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

  const inputs = [];
  for (let i = 0; i < numInputs; i++) {
    inputs.push(
      <View key={i}>
        <Title text={`${i + 1}`} />
        <Select
          label="Select"
          options={options}
          placeholder="Select"
          value={rangeList[i]?.range || undefined}
          onSelect={(option) => {
            const newRangeList = [...rangeList];
            newRangeList[i].range = option as string;
            setRangeList(newRangeList);
          }}
        />
        <Input
          label="Time to eat (seconds)"
          placeholder="60"
          keyboardType="numeric"
          value={refInputs.current[i] === undefined ? '' : refInputs.current[i]}
          onChangeText={(text) => setInputValue(i, text)}
        />
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="flex-1 p-4 ">
        <ControlledInput name="name" label="Alarm Name" control={control} />

        <Title text="Ranges" />
        {inputs}

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
