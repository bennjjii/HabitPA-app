import {Text, TextInput} from 'react-native';
import React, {useState} from 'react';

export default ED = props => {
  const [name, setName] = useState('');
  const [x, setX] = useState(undefined);
  return (
    <>
      <Text>X times per day</Text>
      <Text>
        Use this card to schedule a habit a number of times in every day.
      </Text>
      <TextInput value={name} onChangeText={setName} />
      <TextInput value={x} onChangeText={setX} />
    </>
  );
};
