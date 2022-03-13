import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAuth} from '../services/Auth';

const SignIn = () => {
  const auth = useAuth();
  return (
    <View>
      <Text>SignIn</Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
