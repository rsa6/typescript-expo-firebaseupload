import React from 'react';
import { Text, View, Button, ScrollView, Image } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import styles from '../styles';

interface CameraScreenState {
  result: any;
  uri: any;
  image: any;
}

class CameraScreen extends React.Component<object, CameraScreenState> {
  constructor(props: object) {
    super(props);
    this.state = {
      result: null,
      uri: null,
      image: null,
    }
  }

  private askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  private useCameraHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: false,
    });
    this.setState({ 
      result: result,
      uri: result.uri
    });
  };

  private useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: false,
    });
    this.setState({ 
      result: result,
      uri: result.uri
    });
  };

  private _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  public render() {
    let { image } = this.state;
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.cameraContainer}>
        <Button 
          title="launchCameraAsync" 
          onPress={this.useCameraHandler} />
        <Button
          title="launchImageLibraryAsync"
          onPress={this.useLibraryHandler}
        />
        
        {this.state.uri && <Image source={{ uri: this.state.uri }} style={{ width: 200, height: 200 }} />}
        
        <Text style={styles.paragraph}>{JSON.stringify(this.state.result)}</Text>

        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </ScrollView>
    );
  }
}

export default CameraScreen;

