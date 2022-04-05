import {Text, TextInput} from 'react-native';
import React, {useState} from 'react';

export default ED = props => {
  const [name, setName] = useState('');
  const [x, setX] = useState(undefined);
  return (
    <>
      <Text>X times per week</Text>
      <Text>
        Use this card to schedule a habit x number of times in either a calendar
        or rolling week (7 days)
      </Text>
      <TextInput value={name} onChangeText={setName} />
      <TextInput value={x} onChangeText={setX} />
    </>
  );
};
