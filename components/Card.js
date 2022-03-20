import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.cardIndex);
    return (
      <View style={styles.container}>
        <Text style={styles.cardText}>
          {this.props.name.toString() || 'crd name here'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 400,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  cardText: {
    color: '#ffffff',
  },
});

export default Card;
