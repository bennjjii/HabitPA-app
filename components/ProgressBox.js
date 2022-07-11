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

  const [contractText, setContractText] = useState('');
  const [dataToRender, setDataToRender] = useState(null);
  let _history = [];
  let ageOfCardInDays;
  useEffect(() => {
    _history = history.filter(instance => {
      return instance.uuid == props.card.uuid;
    });

    switch (props.card.code) {
      case 'ED':
        //this can all be done without the switch statement, keep it in for now tho as works
        setContractText(Card.cardDefinitions.ED.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.ED.progressRenderFunction(props, history),
        );
        break;
      case 'XpD':
        setContractText(Card.cardDefinitions.XpD.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.XpD.progressRenderFunction(props, history),
        );
        break;
      case 'EW':
        setContractText(Card.cardDefinitions.EW.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.EW.progressRenderFunction(props, history),
        );
        break;
      case 'XpW':
        setContractText(Card.cardDefinitions.XpW.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.XpW.progressRenderFunction(props, history),
        );
        break;
      case 'RxW':
        setContractText(Card.cardDefinitions.RxW.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.RxW.progressRenderFunction(props, history),
        );
        break;
      case 'EM':
        setContractText(Card.cardDefinitions.EM.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.EM.progressRenderFunction(props, history),
        );
        break;
      case 'XpM':
        setContractText(Card.cardDefinitions.XpM.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.XpM.progressRenderFunction(props, history),
        );
        break;
      case 'RxM':
        setContractText(Card.cardDefinitions.RxM.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.RxM.progressRenderFunction(props, history),
        );
        break;
      case 'XiY':
        setContractText(Card.cardDefinitions.XiY.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.XiY.progressRenderFunction(props, history),
        );
        break;
      case 'XiT':
        setContractText(Card.cardDefinitions.XiT.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.XiT.progressRenderFunction(props, history),
        );
        break;
      case 'SpT':
        setContractText(Card.cardDefinitions.SpT.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.SpT.progressRenderFunction(props, history),
        );
        break;
      case 'DL':
        setContractText(Card.cardDefinitions.DL.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.DL.progressRenderFunction(props, history),
        );
        break;
      case 'EY':
        setContractText(Card.cardDefinitions.EY.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.EY.progressRenderFunction(props, history),
        );
        break;
      case 'XpY':
        setContractText(Card.cardDefinitions.XpY.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.XpY.progressRenderFunction(props, history),
        );
        break;
      case 'RxY':
        setContractText(Card.cardDefinitions.RxY.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.RxY.progressRenderFunction(props, history),
        );
        break;
      case 'AsP':
        setContractText(Card.cardDefinitions.AsP.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.AsP.progressRenderFunction(props, history),
        );
        break;
    }
  }, []);

  return (
    <View>
      <Text>{contractText + '\n'}</Text>
      <Text>Progress this week...</Text>
      <View style={styles.progressDataStyle}>{dataToRender}</View>
      <Text>Habit coefficient: {0.5}</Text>
    </View>
  );
};

export default ProgressBox;

const styles = StyleSheet.create({
  progressDataStyle: {
    flexDirection: 'row',
  },
});
