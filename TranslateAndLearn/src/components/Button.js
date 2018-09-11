import React, { Component } from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
  Text,
} from 'react-native';
import { RIPPLE_COLOR, TEXT_COLOR } from '../Constants';

class Button extends Component {
  render() {
    const backgroundType = TouchableNativeFeedback.Ripple(RIPPLE_COLOR, false);
    const ButtonAndroid = (
      <TouchableNativeFeedback
        background={backgroundType}
        onPress={this.props.onPress || (() => {})}
      >
        <View style={this.props.style}>{this.props.children}</View>
      </TouchableNativeFeedback>
    );
    const ButtonIOS = (
      <TouchableOpacity {...this.props}>{this.props.children}</TouchableOpacity>
    );

    return Platform.OS === 'ios' ? ButtonIOS : ButtonAndroid;
  }
}

export default Button;
