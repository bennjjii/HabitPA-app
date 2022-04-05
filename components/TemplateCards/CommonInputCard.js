import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import colours from '../../assets/colours/colours';
import cardDefinitions from '../../assets/data/cardDefinitions';
import {useStore} from '../../services/zustandContext';

export default CommonInputCard = ({
  name,
  setName,
  desc,
  setDesc,
  parameters,
  setParameters,
}) => {
  const {modalCode} = useStore();
  return (
    <View style={styles.container}>
      <Text style={styles.cardTitleText}>
        {cardDefinitions[modalCode]?.name}
      </Text>
      <Text style={styles.explanationText}>
        {cardDefinitions[modalCode]?.explanation}
      </Text>

      <TextInput
        placeholder="card title"
        style={styles.textInput}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="description of habit or task"
        style={styles.textInput}
        value={desc}
        onChangeText={setDesc}
      />
      <View style={styles.checkboxContainer}>
        <View style={styles.checkBoxView}>
          <CheckBox
            disabled={false}
            value={parameters.timeOfDay.Morning}
            onValueChange={val => {
              setParameters(state => ({
                ...state,
                timeOfDay: {
                  ...state.timeOfDay,
                  Morning: val,
                },
              }));
            }}
          />
          <Text style={styles.checkboxText}>Morning</Text>
        </View>
        <View style={styles.checkBoxView}>
          <CheckBox
            disabled={false}
            value={parameters.timeOfDay.Afternoon}
            onValueChange={val => {
              setParameters(state => ({
                ...state,
                timeOfDay: {
                  ...state.timeOfDay,
                  Afternoon: val,
                },
              }));
            }}
          />
          <Text style={styles.checkboxText}>Afternoon</Text>
        </View>
        <View style={styles.checkBoxView}>
          <CheckBox
            disabled={false}
            value={parameters.timeOfDay.Evening}
            onValueChange={val => {
              setParameters(state => ({
                ...state,
                timeOfDay: {
                  ...state.timeOfDay,
                  Evening: val,
                },
              }));
            }}
          />
          <Text style={styles.checkboxText}>Evening</Text>
        </View>
        <View style={styles.checkBoxView}>
          <CheckBox
            disabled={false}
            value={parameters.timeOfDay.Night}
            onValueChange={val => {
              setParameters(state => ({
                ...state,
                timeOfDay: {
                  ...state.timeOfDay,
                  Night: val,
                },
              }));
            }}
          />
          <Text style={styles.checkboxText}>Nighttime</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginTop: 20,
  },
  textInput: {
    backgroundColor: colours.background,
    width: 200,
    margin: 2,
    borderWidth: 1,
    borderColor: colours.text,
    borderRadius: 5,
    padding: 5,
  },
  checkBoxView: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  cardTitleText: {
    fontSize: 20,
    marginBottom: 30,
  },
  explanationText: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  checkboxText: {
    paddingLeft: 30,
  },
};
