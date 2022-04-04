import {Text, TextInput} from 'react-native';
import React, {useState} from 'react';

export default ED = props => {
  const [name, setName] = useState('');
  const [timeOfDay, setTimeOfDay] = useState(undefined);
  return (
    <>
      <Text>Every day</Text>
      <Text>
        Use this card to schedule a habit every day. Optionally, specify times
        of day for which it is appropriate.
      </Text>
      <TextInput value={name} onChangeText={setName} />
      <TextInput value={timeOfDay} onChangeText={setTimeOfDay} />
    </>
  );
};
