import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  SECONDARY_BACKGROUND_COLOR,
  STYLE_SHADOW,
} from '../Constants';

class LanguageChooser extends Component {
  render() {
    const { style } = this.props;
    return (
      <View style={[styles.container, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Choose the languages:</Text>
        </View>
        <View style={[styles.buttonContainer, STYLE_SHADOW]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            <Button
              buttonStyle={[styles.button, STYLE_SHADOW]}
              {...styles.text}
              title="de"
            />
            <Button
              buttonStyle={[styles.button, STYLE_SHADOW]}
              {...styles.text}
              title="en"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 120,
  },
  buttonContainer: {
    backgroundColor: SECONDARY_BACKGROUND_COLOR,
    flex: 1,
    minHeight: 60,
    justifyContent: 'center',
  },
  text: {
    color: TEXT_COLOR,
    fontWeight: '100',
    fontSize: 18,
  },
  button: {
    height: 50,
    width: 130,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  textContainer: {
    height: 40,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'flex-end',
    padding: 2,
  },
});

export default LanguageChooser;
