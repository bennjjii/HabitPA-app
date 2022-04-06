import {Text, TextInput, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import colours from '../../assets/colours/colours';
import cardDefinitions from '../../assets/data/cardDefinitions';
import {useStore} from '../../services/zustandContext';

//What this will do is check the card code against the card definitions
//And if it finds a key to that parameter, render the input, else not
//can use react native number please

const checkForParam = (modalCode, paramName) => {
  return cardDefinitions[modalCode]
    ? Object.keys(cardDefinitions[modalCode]?.parameters).indexOf(paramName) !==
        -1
    : false;
};

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
      {
        //   checkForParam(modalCode, 'dayOfYear')
        true && <View style={styles.dayOfYear}></View>
      }
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

      {checkForParam(modalCode, 'numberOfTimes') && (
        <View style={styles.numberOfTimesContainer}>
          <TextInput
            placeholder="number of times"
            style={styles.textInput}
            value={parameters.numberOfTimes}
            onChangeText={val => {
              setParameters(state => ({
                ...state,
                numberOfTimes: val,
              }));
            }}
          />
        </View>
      )}

      {checkForParam(modalCode, 'dayOfWeek') && (
        <View style={styles.checkboxContainer}>
          <View style={styles.checkBoxView}>
            <CheckBox
              disabled={false}
              value={parameters.dayOfWeek.Monday}
              onValueChange={val => {
                setParameters(state => ({
                  ...state,
                  dayOfWeek: {
                    ...state.dayOfWeek,
                    Monday: val,
                  },
                }));
              }}
            />
            <Text style={styles.checkboxText}>Monday</Text>
          </View>
          <View style={styles.checkBoxView}>
            <CheckBox
              disabled={false}
              value={parameters.dayOfWeek.Tuesday}
              onValueChange={val => {
                setParameters(state => ({
                  ...state,
                  dayOfWeek: {
                    ...state.dayOfWeek,
                    Tuesday: val,
                  },
                }));
              }}
            />
            <Text style={styles.checkboxText}>Tuesday</Text>
          </View>
          <View style={styles.checkBoxView}>
            <CheckBox
              disabled={false}
              value={parameters.dayOfWeek.Wednesday}
              onValueChange={val => {
                setParameters(state => ({
                  ...state,
                  dayOfWeek: {
                    ...state.dayOfWeek,
                    Wednesday: val,
                  },
                }));
              }}
            />
            <Text style={styles.checkboxText}>Wednesday</Text>
          </View>
          <View style={styles.checkBoxView}>
            <CheckBox
              disabled={false}
              value={parameters.dayOfWeek.Thursday}
              onValueChange={val => {
                setParameters(state => ({
                  ...state,
                  dayOfWeek: {
                    ...state.dayOfWeek,
                    Thursday: val,
                  },
                }));
              }}
            />
            <Text style={styles.checkboxText}>Thursday</Text>
          </View>
          <View style={styles.checkBoxView}>
            <CheckBox
              disabled={false}
              value={parameters.dayOfWeek.Friday}
              onValueChange={val => {
                setParameters(state => ({
                  ...state,
                  dayOfWeek: {
                    ...state.dayOfWeek,
                    Friday: val,
                  },
                }));
              }}
            />
            <Text style={styles.checkboxText}>Friday</Text>
          </View>
          <View style={styles.checkBoxView}>
            <CheckBox
              disabled={false}
              value={parameters.dayOfWeek.Saturday}
              onValueChange={val => {
                setParameters(state => ({
                  ...state,
                  dayOfWeek: {
                    ...state.dayOfWeek,
                    Saturday: val,
                  },
                }));
              }}
            />
            <Text style={styles.checkboxText}>Saturday</Text>
          </View>
          <View style={styles.checkBoxView}>
            <CheckBox
              disabled={false}
              value={parameters.dayOfWeek.Sunday}
              onValueChange={val => {
                setParameters(state => ({
                  ...state,
                  dayOfWeek: {
                    ...state.dayOfWeek,
                    Sunday: val,
                  },
                }));
              }}
            />
            <Text style={styles.checkboxText}>Sunday</Text>
          </View>
        </View>
      )}

      {checkForParam(modalCode, 'dayOfMonth') && (
        <View style={styles.dayOfMonth}>
          <TextInput
            placeholder="day of month"
            style={styles.textInput}
            value={parameters.dayOfMonth}
            onChangeText={val => {
              setParameters(state => ({
                ...state,
                dayOfMonth: val,
              }));
            }}
          />
        </View>
      )}

      {checkForParam(modalCode, 'date') && (
        <View style={styles.date}>
          <DateTimePicker value={new Date()} />
        </View>
      )}

      {checkForParam(modalCode, 'timeOfDay') && (
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
      )}
    </View>
  );
};

const styles = {
  container: {
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
  date: {
    width: 150,
  },
  checkboxContainer: {
    marginHorizontal: 30,
    marginTop: 20,
    //backgroundColor: 'green',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  checkBoxView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
    paddingHorizontal: 5,
  },
  checkboxText: {
    paddingLeft: 0,
  },
  cardTitleText: {
    fontSize: 20,
    marginBottom: 30,
  },
  explanationText: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
};
