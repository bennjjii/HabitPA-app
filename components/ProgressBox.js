import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStore} from '../services/zustandContext';
import Card from './CardClass';
import CustomCheckbox from './CustomCheckBox';

const ProgressBox = props => {
  const {history} = useStore();

  const [dataToRender, setDataToRender] = useState(null);
  let _history = [];
  useEffect(() => {
    _history = history.filter(instance => {
      return (instance.uuid = props.card.uuid);
    });

    switch (props.card.code) {
      case 'ED':
        console.log('cased');
        setDataToRender(
          <CustomCheckbox label={'not complete...'} completed={true} />,
        );
        break;
    }
  }, []);

  return (
    <View>
      <Text>{Card.cardDefinitions[props.card.code].name + '\n'}</Text>
      <Text>Progress this week...</Text>
      {dataToRender}
    </View>
  );
};

export default ProgressBox;

const styles = StyleSheet.create({});
