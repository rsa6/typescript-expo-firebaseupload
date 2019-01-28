import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

interface CameraFlipState {
  hasCameraPermission: any;
  type: any
}

class CameraFlip extends React.Component<object, CameraFlipState> {
  constructor(props: object) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    }
  }

  public async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' }); 
  }

  private changeCameraView = (): void => {
    this.setState({
      type: this.state.type === Camera.Constants.Type.back 
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back,
    });
  }

  public render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Need Camera Permissions... T_T</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row'}}>
              <TouchableOpacity style={{flex: 0.1, alignSelf: 'flex-end', alignItems: 'center',}}
                onPress={this.changeCameraView}>
                <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

export default CameraFlip;