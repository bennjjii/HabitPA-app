import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomCheckbox from './CustomCheckBox';

const daysInMonth = 31;
const daysInMonthArr = [];
let initState = [];
for (let i = 0; i < daysInMonth; i++) {
  daysInMonthArr.push(i + 1);
  initState.push(false);
}

// console.log('daysInMonthArr', daysInMonthArr);
// console.log('initState', initState, initState.length);

const MonthDayPicker = ({values, onValueChange}) => {
  // console.log('values', values);
  const [intValues, setIntValues] = useState(initState);

  useEffect(() => {
    if (values) {
      setIntValues(values);
    }
  }, []);

  // useEffect(() => {
  //   // set_values(values);
  // }, [values]);

  useEffect(() => {
    // console.log('_values useEffect');
    // console.log('_values', intValues);
    if (onValueChange) {
      onValueChange([...intValues]);
    }
  }, [intValues]);

  const setValueWithIndex = (value, index) => {
    // console.log('Set value with index');
    // console.log('SvWi intValues', intValues);
    // console.log('SvWi', value, index);
    let tempArray = intValues;
    // console.log('ta1', tempArray);
    tempArray[index] = value;
    // console.log('ta2', tempArray);
    setIntValues([...tempArray]);
  };

  return (
    <View style={styles.container}>
      {daysInMonthArr.map(day => {
        return (
          <CustomCheckbox
            label={day}
            key={'MonthPickerKey:' + (day - 1)}
            value={intValues[day - 1]}
            onValueChange={setValueWithIndex}
            index={day - 1}
          />
        );
      })}
    </View>
  );
};

export default MonthDayPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
  },
});
