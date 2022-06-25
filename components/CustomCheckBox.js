import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

const CustomCheckbox = ({
  label,
  value,
  onValueChange,
  index,
  readOnly,
  completed,
}) => {
  const [clicked, setClicked] = useState(value || false);

  // useEffect(() => {
  //   setClicked(!!value);
  // }, []);

  useEffect(() => {
    setClicked(value);
  }, [value]);

  useEffect(() => {
    // console.log(clicked, index);
    if (onValueChange && index !== undefined) {
      onValueChange(clicked, index);
    } else {
      if (onValueChange) {
        onValueChange(clicked);
      }
    }
  }, [clicked]);

  return (
    <TouchableOpacity
      onPress={() => {
        if (!readOnly) {
          setClicked(!clicked);
        }
      }}>
      <View
        style={[
          styles.view,
          label.length > 2 ? {} : {width: 35},
          clicked ? styles.pressedBackground : styles.unpressedBackground,
          completed ? styles.completedBackground : {},
        ]}>
        <Text
          style={[
            label.length > 2 ? {paddingHorizontal: 20} : {},
            clicked ? styles.pressedText : styles.unpressedText,
            completed ? styles.pressedText : styles.unpressedText,
          ]}>
          {label.toString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  unpressedText: {
    color: 'grey',
  },
  pressedText: {
    color: 'white',
    fontWeight: '400',
  },

  view: {
    // width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    margin: 3,
  },
  pressedBackground: {
    backgroundColor: '#157EFB',
    borderRadius: 17,
  },
  unpressedBackground: {
    backgroundColor: 'whitesmoke',
    borderRadius: 17,
  },
  completedBackground: {
    backgroundColor: '#3DC55E',
    borderRadius: 17,
  },
});
