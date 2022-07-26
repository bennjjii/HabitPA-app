import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStore} from '../services/zustandContext';
import Card from './CardClass';

const ProgressBox = props => {
  const {history} = useStore();

  const [contractText, setContractText] = useState('');
  const [dataToRender, setDataToRender] = useState(null);
  const [habitCoefficient, setHabitCoefficient] = useState(undefined);

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
        setHabitCoefficient(
          Card.cardDefinitions.ED.progressCoeffFunction(
            props.card,
            history,
            props.card.parameters,
          ),
        );
        break;
      case 'XpD':
        setContractText(Card.cardDefinitions.XpD.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.XpD.progressRenderFunction(props, history),
        );
        setHabitCoefficient(
          Card.cardDefinitions.XpD.progressCoeffFunction(
            props.card,
            history,
            props.card.parameters,
          ),
        );
        break;
      case 'EW':
        setContractText(Card.cardDefinitions.EW.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.EW.progressRenderFunction(props, history),
        );
        setHabitCoefficient(
          Card.cardDefinitions.EW.progressCoeffFunction(
            props.card,
            history,
            props.card.parameters,
          ),
        );
        break;
      case 'XpW':
        setContractText(Card.cardDefinitions.XpW.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.XpW.progressRenderFunction(props, history),
        );
        setHabitCoefficient(
          Card.cardDefinitions.XpW.progressCoeffFunction(
            props.card,
            history,
            props.card.parameters,
          ),
        );
        break;
      case 'RxW':
        setContractText(Card.cardDefinitions.RxW.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.RxW.progressRenderFunction(props, history),
        );
        setHabitCoefficient(
          Card.cardDefinitions.RxW.progressCoeffFunction(
            props.card,
            history,
            props.card.parameters,
          ),
        );
        break;
      case 'EM':
        setContractText(Card.cardDefinitions.EM.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.EM.progressRenderFunction(props, history),
        );
        setHabitCoefficient(
          Card.cardDefinitions.EM.progressCoeffFunction(
            props.card,
            history,
            props.card.parameters,
          ),
        );
        break;
      case 'XpM':
        setContractText(Card.cardDefinitions.XpM.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.XpM.progressRenderFunction(props, history),
        );
        setHabitCoefficient(
          Card.cardDefinitions.XpM.progressCoeffFunction(
            props.card,
            history,
            props.card.parameters,
          ),
        );
        break;
      case 'RxM':
        setContractText(Card.cardDefinitions.RxM.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.RxM.progressRenderFunction(props, history),
        );
        setHabitCoefficient(
          Card.cardDefinitions.RxM.progressCoeffFunction(
            props.card,
            history,
            props.card.parameters,
          ),
        );
        break;
      case 'XiY':
        setContractText(Card.cardDefinitions.XiY.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.XiY.progressRenderFunction(props, history),
        );
        setHabitCoefficient(
          Card.cardDefinitions.XiY.progressCoeffFunction(
            props.card,
            history,
            props.card.parameters,
          ),
        );
        break;
      case 'XiT':
        setContractText(Card.cardDefinitions.XiT.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.XiT.progressRenderFunction(props, history),
        );
        setHabitCoefficient(
          Card.cardDefinitions.XiT.progressCoeffFunction(
            props.card,
            history,
            props.card.parameters,
          ),
        );
        break;
      case 'SpT':
        setContractText(Card.cardDefinitions.SpT.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.SpT.progressRenderFunction(props, history),
        );
        setHabitCoefficient(
          Card.cardDefinitions.SpT.progressCoeffFunction(
            props.card,
            history,
            props.card.parameters,
          ),
        );
        break;
      case 'DL':
        setContractText(Card.cardDefinitions.DL.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.DL.progressRenderFunction(props, history),
        );
        setHabitCoefficient(
          Card.cardDefinitions.DL.progressCoeffFunction(
            props.card,
            history,
            props.card.parameters,
          ),
        );
        break;
      case 'EY':
        setContractText(Card.cardDefinitions.EY.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.EY.progressRenderFunction(props, history),
        );
        setHabitCoefficient(
          Card.cardDefinitions.EY.progressCoeffFunction(
            props.card,
            history,
            props.card.parameters,
          ),
        );
        break;
      case 'XpY':
        setContractText(Card.cardDefinitions.XpY.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.XpY.progressRenderFunction(props, history),
        );
        setHabitCoefficient(
          Card.cardDefinitions.XpY.progressCoeffFunction(
            props.card,
            history,
            props.card.parameters,
          ),
        );
        break;
      case 'RxY':
        setContractText(Card.cardDefinitions.RxY.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.RxY.progressRenderFunction(props, history),
        );
        setHabitCoefficient(
          Card.cardDefinitions.RxY.progressCoeffFunction(
            props.card,
            history,
            props.card.parameters,
          ),
        );
        break;
      case 'AsP':
        setContractText(Card.cardDefinitions.AsP.contractRenderFunction(props));
        setDataToRender(
          Card.cardDefinitions.AsP.progressRenderFunction(props, history),
        );
        setHabitCoefficient(
          Card.cardDefinitions.AsP.progressCoeffFunction(
            props.card,
            history,
            props.card.parameters,
          ),
        );
        break;
    }
  }, []);

  return (
    <>
      <Text style={styles.contractText}>{contractText + '\n'}</Text>
      <Text style={styles.progressText}>Progress...</Text>
      <View style={styles.progressDataStyle}>{dataToRender}</View>
      <Text style={styles.levelText}>Level: {habitCoefficient}</Text>
    </>
  );
};

export default ProgressBox;

const styles = StyleSheet.create({
  contractText: {
    fontFamily: 'PublicPixel',
  },
  levelText: {
    fontFamily: 'PublicPixel',
  },
  progressText: {
    fontFamily: 'PublicPixel',
  },
  progressDataStyle: {
    flexDirection: 'row',
  },
});
