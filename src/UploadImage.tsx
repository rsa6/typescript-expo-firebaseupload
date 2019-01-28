import React from 'react';
import { Text, View, Button, ScrollView, StyleSheet, Image } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import styles from '../styles';

interface CameraScreenState {
  imageUrl: string;
}

class CameraScreen extends React.Component<object, CameraScreenState> {
  constructor(props: object) {
    super(props);
    this.state = {
      imageUrl: '',
    }
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  _pickImage = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ imageUrl: result.uri });
    }
  };

  render() {
    let { imageUrl } = this.state;
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.cameraContainer}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {imageUrl !== '' && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />}
      </ScrollView>
    );
  }
}

export default CameraScreen;

