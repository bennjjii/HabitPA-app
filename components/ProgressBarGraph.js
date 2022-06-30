import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProgressBarGraph = props => {
  return (
    <View style={styles.container}>
      {props.values.map(item => {
        return (
          <View style={styles.columnAndTextContainer}>
            <View style={styles.columnContainer}>
              {item.height - item.completed > 0 && (
                <View
                  style={{
                    backgroundColor: 'whitesmoke',
                    width: 10,
                    height: 10 * (item.height - item.completed),
                  }}
                />
              )}
              {item.completed > 0 && (
                <View
                  style={{
                    backgroundColor: '#3DC55E',
                    width: 10,
                    height: 10 * Math.min(item.completed, item.height),
                  }}
                />
              )}
            </View>
            <Text style={styles.text}>{item.label[0]}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default ProgressBarGraph;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderBottomColor: 'grey',
  },
  columnAndTextContainer: {
    flexDirection: 'column',
  },
  columnContainer: {
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.14,
    shadowRadius: 3.27,
    elevation: 2,
  },
  text: {
    marginTop: 10,
    color: 'grey',
    textShadowColor: '#ccc',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
  columnUnfilled: {},
  columnFilled: {},
});
