import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomCheckbox from './CustomCheckBox';
const {width, height} = Dimensions.get('screen');

const BallPicker = ({
  values,
  onValueChange,
  readOnly,
  textStyle,
  altLabels,
}) => {
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
            label={altLabels ? altLabels[key].toString() : key.toString()}
            key={'MonthPickerKey:' + key}
            value={intValues[key]}
            onValueChange={setValueWithIndex}
            index={key}
            textStyle={textStyle}
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

    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
