/**
 * @format
 */

import {AppRegistry} from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import App from './src/App';
import {name as appName} from './app.json';

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
  console.log('Background= ', pressAction);
    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS && pressAction.id === 'decline') {
      // Update external API
    //   await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
    //     method: 'POST',
    //   });
  
      // Remove the notification
      await notifee.cancelNotification(notification.id);
    }
  });

AppRegistry.registerComponent(appName, () => App);
