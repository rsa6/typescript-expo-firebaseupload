import React from 'react';
import { Text, View, Button, ScrollView, Image } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import firebase from '../FirebaseConfig';
import styles from '../styles';

interface UploadScreenState {
  result: any;
  uri: any;
}

class UploadScreen extends React.Component<object, UploadScreenState> {
  constructor(props: object) {
    super(props);
    this.state = {
      result: null,
      uri: null,
    }
  }

  private askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  private useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    this.setState({ 
      result: result,
      uri: result.uri
    });

    // console.log(result);
  };

  private uploadIamge = async () => {
    // const response = await fetch(this.state.uri);
    // const blob = await response.blob();
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', this.state.uri, true);
      xhr.send(null);
    });

    // const fileName = new Date().getTime().toString();
    const fileName = this.state.uri.substr(this.state.uri.length - 10, this.state.uri.length);
    console.log(this.state.uri);
    console.log(blob);

    const metadata = {
      contentType: 'image/jpeg',
    };
    let ref = firebase.storage().ref().child('images/' + fileName).put(blob, metadata)
      .then(() => {
        console.log('success upload');
      })
      .catch((error: any) => {
        console.log(error);
      })
  }

  public render() {
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.cameraContainer}>
        <Button
          title="Pick Image from Camera Roll"
          onPress={this.useLibraryHandler}
        />
        
        {this.state.uri && <Image source={{ uri: this.state.uri }} style={{ width: 200, height: 200 }} />}        
        <Text style={styles.paragraph}>{JSON.stringify(this.state.uri)}</Text>

        <Button 
          onPress={this.uploadIamge}
          title='Upload Image...' 
        />
     
      </ScrollView>
    );
  }
}

export default UploadScreen;

