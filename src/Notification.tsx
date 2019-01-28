import React from 'react';
import { View, Button, Text } from 'react-native';
import { Permissions, Notifications } from 'expo';

import styles from '../styles'

interface NotificationState {
  result: any;
  notification: any;
}

class Notification extends React.Component<object, NotificationState> {
  private _notificationSubscription: any;
  constructor(props: object) {
    super(props);
    this.state = {
      result: null,
      notification: {}
    }
  }

  public componentDidMount() {
    this.pushAlert(); // same as pushAlert get Token

    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification: any) => {
    this.setState({notification: notification});
  };


  private pushAlert = async () => {
    // console.log('push alert');
    // this.askNotificationPermission();
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
  }

  public render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Origin: {JSON.stringify(this.state.notification)}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
      </View>
    );
  }
}

export default Notification;

