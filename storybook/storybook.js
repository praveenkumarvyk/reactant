import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import { config } from 'reaction-base';
import stories from './stories';

configure(() => stories, module);
const StorybookUIRoot = getStorybookUI({ port: 7007, onDeviceUI: true });

class StorybookUIHMRRoot extends Component {
  render() {
    return <StorybookUIRoot />;
  }
}

AppRegistry.registerComponent(config.key, () => StorybookUIHMRRoot);
export default StorybookUIHMRRoot;
