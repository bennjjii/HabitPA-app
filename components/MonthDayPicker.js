import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const daysInMonth = [];
for (let i = 1; i <= 31; i++) {
  daysInMonth.push(i);
}

const MonthDayPicker = () => {
  return (
    <View>
      {daysInMonth.map(day => {
        return <Text>{day}</Text>;
      })}
    </View>
  );
};

export default MonthDayPicker;

const styles = StyleSheet.create({});
