import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';

class Main extends React.Component<object, object> {
  state = {
    title: 'hello'
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textH1}>{this.state.title}</Text>
      </View>
    );
  }
}

export default Main;