import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';
import CameraScreen from './CameraScreen';
import CameraFlip from './CameraFlip';
import UploadScreen from './UploadScreen';

class Main extends React.Component<object, object> {
  
  public render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.textH1}>Main</Text>
      // </View>
      <UploadScreen />
    );
  }
}

export default Main;