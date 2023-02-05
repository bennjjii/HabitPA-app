import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProgressBarGraph2 = props => {
  return (
    <View style={styles.container}>
      {props.values.map((item, index) => {
        return (
          <View
            style={styles.columnAndTextContainer}
            key={'barGraphKey' + item.label + index}>
            <Text
              style={[
                styles.text,
                props.greyColor ? {color: props.greyColor} : {},
              ]}>
              {item.label}
            </Text>
            <View style={styles.columnContainer}>
              {item.completed > 0 && (
                <View
                  style={{
                    backgroundColor: '#3DC55E',
                    width: 10 * Math.min(item.completed, item.height),
                    height: 10,
                  }}
                />
              )}
              {item.height - item.completed > 0 && (
                <View
                  style={{
                    backgroundColor: 'whitesmoke',
                    width: 10 * (item.height - item.completed),
                    height: 10,
                  }}
                />
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ProgressBarGraph2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  columnAndTextContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  columnContainer: {
    flexDirection: 'row',
  },
  text: {
    marginRight: 10,
    color: 'grey',
    fontFamily: 'PublicPixel',
  },
  columnUnfilled: {},
  columnFilled: {},
});
