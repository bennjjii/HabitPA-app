import {View, TextInput} from 'react-native';
import React, {useForm} from 'react';

export default function ED() {
  const [timeOfDay, setTimeOfDay] = useForm(undefined);
  return (
    <>
      <TextInput value={timeOfDay} onChangeText={setTimeOfDay} />
    </>
  );
}
