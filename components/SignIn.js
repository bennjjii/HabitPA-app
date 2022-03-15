import {StyleSheet, Text, SafeAreaView, Button} from 'react-native';
import React, {useContext} from 'react';
import {Context as AuthContext} from '../services/Auth';

const SignIn = () => {
  const {state, signin} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.signInWrapper}>
      <Text>{state.email}</Text>
      <Button
        title="Sign In"
        onPress={() => {
          signin({email: 'some email', token: 'some password'});
        }}
      />
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  signInWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
