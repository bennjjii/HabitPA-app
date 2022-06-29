import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStore} from '../services/zustandContext';
import Card from './CardClass';
import CustomCheckbox from './CustomCheckBox';
import countCardsAfterDate from '../utilities/countCardsAfterDate';

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
        let completed = countCardsAfterDate(
          history,
          props.card,
          new Date(new Date().setHours(0, 0, 0, 0)),
        );
        setDataToRender(
          <CustomCheckbox label={'not complete...'} completed={completed} />,
        );
        break;
    }
  }, []);

  return (
    <View>
      <Text>{Card.cardDefinitions[props.card.code]?.name + '\n'}</Text>
      <Text>Progress this week...</Text>
      {dataToRender}
    </View>
  );
};

export default ProgressBox;

const styles = StyleSheet.create({});
