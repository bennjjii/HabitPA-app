import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomCheckbox from './CustomCheckBox';

const BallPicker = ({values, onValueChange, readOnly}) => {
  const [intValues, setIntValues] = useState(values);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(intValues);
    }
  }, [intValues]);

  const setValueWithIndex = (value, index) => {
    let tempObj = intValues;
    tempObj[index] = value;
    setIntValues({...tempObj});
  };

  return (
    <View style={styles.container}>
      {Object.keys(values).map((key, index) => {
        // console.log(intValues, key, index);
        return (
          <CustomCheckbox
            label={key.toString()}
            key={'MonthPickerKey:' + key}
            value={intValues[key]}
            onValueChange={setValueWithIndex}
            index={key}
          />
        );
      })}
    </View>
  );
};

export default BallPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
  },
});
