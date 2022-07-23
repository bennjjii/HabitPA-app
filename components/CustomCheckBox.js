import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

//darkened colour if unselected
//iOs blue if selected
//iOs green if completed

const CustomCheckbox = ({
  label,
  value,
  onValueChange,
  index,
  readOnly,
  completed,
  today,
  textStyle,
  altLabel,
}) => {
  const [clicked, setClicked] = useState(value || false);

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
          today && !completed ? styles.todayStyle : {},
        ]}>
        <Text
          style={[
            label.length > 2 ? {paddingHorizontal: 20} : {},
            completed || clicked ? styles.pressedText : styles.unpressedText,
            textStyle,
          ]}>
          {altLabel ? altLabel.toString() : label.toString()}
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
  },
  unpressedBackground: {
    backgroundColor: 'whitesmoke',
  },
  completedBackground: {
    backgroundColor: '#3DC55E',
  },
  todayStyle: {
    borderColor: '#595AD3',
    borderWidth: 2,
  },
});
