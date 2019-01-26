import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import styles from '../styles';

class Main extends React.Component<object, object> {
  public state = {
    title: 'hello'
  }
  
  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textH1}>{this.state.title}</Text>
      </View>
    );
  }
}

class FileSelect extends React.Component<object, object> {
  public state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  public async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  public render() {
    return (
      <Text>some kind of fileselect</Text>
    )
  }
}

export default Main;