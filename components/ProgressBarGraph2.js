import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProgressBarGraph2 = props => {
  return (
    <View style={styles.container}>
      {props.values.map(item => {
        return (
          <View style={styles.columnAndTextContainer}>
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
    // margin: 10,
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderBottomColor: 'grey',
  },
  columnAndTextContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  columnContainer: {
    flexDirection: 'row',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 2,
    //   height: 4,
    // },
    // shadowOpacity: 0.14,
    // shadowRadius: 3.27,
    // elevation: 2,
  },
  text: {
    marginRight: 10,
    color: 'grey',
    // textShadowColor: '#ccc',
    // textShadowOffset: {width: 2, height: 2},
    // textShadowRadius: 2,
    fontFamily: 'PublicPixel',
  },
  columnUnfilled: {},
  columnFilled: {},
});
