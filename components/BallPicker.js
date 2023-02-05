import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import PixelCheckbox from './PixelCheckbox';
const {width, height} = Dimensions.get('screen');

const BallPicker = ({
  values,
  onValueChange,
  readOnly,
  textStyle,
  altLabels,
  contextColour,
}) => {
  const setValueWithIndex = (value, index) => {
    let tempObj = values;
    tempObj[index] = value;
    onValueChange({...tempObj});
  };

  return (
    <View style={styles.container}>
      {Object.keys(values).map((key, index) => {
        return (
          <PixelCheckbox
            label={altLabels ? altLabels[key].toString() : key.toString()}
            key={'MonthPickerKey:' + key}
            // value={intValues[key]}
            value={values[key]}
            onValueChange={setValueWithIndex}
            index={key}
            textStyle={textStyle}
            contextColour={contextColour}
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
