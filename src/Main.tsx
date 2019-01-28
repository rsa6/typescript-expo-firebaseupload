import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';
import CameraScreen from './CameraScreen';
import CameraFlip from './CameraFlip';
import UploadScreen from './UploadScreen';
import Notification from './Notification'

class Main extends React.Component<object, object> {
  
  public render() {
    return (
      <Notification />
    );
  }
}

export default Main;