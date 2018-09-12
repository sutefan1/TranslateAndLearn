import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  SECONDARY_TEXT_COLOR,
  SECONDARY_BACKGROUND_COLOR,
} from '../Constants';

class TranslationDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerLeft = (
      <TouchableOpacity onPressOut={() => navigation.goBack()}>
        <Text
          style={{
            color: BACKGROUND_COLOR,
            marginLeft: 10,
            fontSize: 17,
            fontWeight: '400',
          }}
        >
          Back
        </Text>
      </TouchableOpacity>
    );
    return Platform.OS === 'ios' ? { headerLeft } : {};
  };

  renderContent = () => {
    const translation = this.props.navigation.getParam('translation');
    return (
      <View
        style={{
          marginHorizontal: 25,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 11,
              fontWeight: '100',
              color: SECONDARY_TEXT_COLOR,
            }}
          >
            {translation.lang.from}
          </Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              color: SECONDARY_TEXT_COLOR,
            }}
          >
            {translation.input}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: '100', color: TEXT_COLOR }}>
            {translation.lang.to}
          </Text>
          <Text style={{ fontSize: 36, fontWeight: '500', color: TEXT_COLOR }}>
            {translation.output}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        {this.renderContent()}
      </View>
    );
  }
}

export default TranslationDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY_BACKGROUND_COLOR,
    justifyContent: 'center',
  },
  text: {
    color: BACKGROUND_COLOR,
    fontWeight: '100',
    fontSize: 18,
  },
});
