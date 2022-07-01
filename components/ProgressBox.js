import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStore} from '../services/zustandContext';
import Card from './CardClass';
import CustomCheckbox from './CustomCheckBox';
import countCardsAfterDate from '../utilities/countCardsAfterDate';
import getAgeOfCardInDays from '../utilities/getAgeOfCardInDays';
import ProgressBarGraph from './ProgressBarGraph';

const ProgressBox = props => {
  const {history} = useStore();

  const [dataToRender, setDataToRender] = useState(null);
  let _history = [];
  let ageOfCardInDays;
  useEffect(() => {
    _history = history.filter(instance => {
      return (instance.uuid = props.card.uuid);
    });

    switch (props.card.code) {
      case 'ED':
        setDataToRender(
          Card.cardDefinitions.ED.progressRenderFunction(props, history),
        );
        break;
      case 'XpD':
        setDataToRender(
          Card.cardDefinitions.XpD.progressRenderFunction(props, history),
        );
        break;
      case 'EW':
        setDataToRender(
          Card.cardDefinitions.EW.progressRenderFunction(props, history),
        );
        break;
      case 'XpW':
        setDataToRender(
          Card.cardDefinitions.XpW.progressRenderFunction(props, history),
        );
        break;
      case 'RxW':
        setDataToRender(
          Card.cardDefinitions.RxW.progressRenderFunction(props, history),
        );
        break;
      case 'EM':
        setDataToRender(
          Card.cardDefinitions.EM.progressRenderFunction(props, history),
        );
        break;
      case 'XpM':
        setDataToRender(
          Card.cardDefinitions.XpM.progressRenderFunction(props, history),
        );
        break;
      case 'RxM':
        setDataToRender(
          Card.cardDefinitions.RxM.progressRenderFunction(props, history),
        );
        break;
      case 'XiY':
        setDataToRender(
          Card.cardDefinitions.XiY.progressRenderFunction(props, history),
        );
        break;
      case 'XiT':
        setDataToRender(
          Card.cardDefinitions.XiT.progressRenderFunction(props, history),
        );
        break;
      case 'SpT':
        setDataToRender(
          Card.cardDefinitions.XiT.progressRenderFunction(props, history),
        );
        break;
      case 'DL':
        break;
      case 'EY':
        break;
      case 'XpY':
        break;
      case 'RxY':
        break;
      case 'AsP':
        break;
    }
  }, []);

  return (
    <View>
      <Text>{Card.cardDefinitions[props.card.code]?.name + '\n'}</Text>
      <Text>Progress this week...</Text>

      {dataToRender}
      <Text>Habit coefficient: {0.5}</Text>
    </View>
  );
};

export default ProgressBox;

const styles = StyleSheet.create({});
