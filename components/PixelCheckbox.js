import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import chroma from 'chroma-js';

//darkened colour if unselected
//iOs blue if selected
//iOs green if completed

const PixelCheckbox = ({
  label,
  value,
  onValueChange,
  index,
  readOnly,
  completed,
  today,
  textStyle,
  altLabel,
  contextColour,
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
      <View style={[styles.view, label.length > 2 ? {} : {width: 35}]}>
        <Text
          style={[
            styles.textStyle,
            label.length > 2 ? {paddingHorizontal: 10} : {},
            clicked
              ? {color: 'white'}
              : {
                  color: chroma(contextColour || '#FFFFFF')
                    .darken(1)
                    .hex(),
                },
            completed ? {color: '#3DC55E'} : {},
            today ? {color: '#157EFB'} : {}, //or #595AD3
          ]}>
          {altLabel ? altLabel.toString() : label.toString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PixelCheckbox;

const styles = StyleSheet.create({
  view: {
    // width: 35,
    // backgroundColor: 'red',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'PublicPixel',
  },
});
