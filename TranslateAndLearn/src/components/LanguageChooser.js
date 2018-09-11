import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  Animated,
  Easing,
} from 'react-native';
// import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  SECONDARY_BACKGROUND_COLOR,
  STYLE_SHADOW,
  INITIAL_LANGUAGES,
} from '../Constants';
import Button from './Button';
import Arrow from '../../assets/Arrow.png';

class LanguageChooser extends Component {
  state = {
    from: INITIAL_LANGUAGES.from,
    to: INITIAL_LANGUAGES.to,
  };

  moveAnimation = new Animated.Value(0);

  componentWillReceiveProps(nextProps) {
    if (!this.state.from && !this.state.to) {
      this.setState({ from: nextProps.from, to: nextProps.to });
      return;
    }
    if (this.props.from !== nextProps.from && this.props.to !== nextProps.to) {
      const moveToCenter = Animated.timing(this.moveAnimation, {
        toValue: 1,
        duration: 200,
      });
      moveToCenter.start(() => {
        const moveTextBack = Animated.timing(this.moveAnimation, {
          toValue: 0,
          duration: 200,
        });
        this.setState({ from: nextProps.from, to: nextProps.to });
        moveTextBack.start();
      });
    }
  }

  onPressInput = () => {
    Keyboard.dismiss();
    // open screen for languages
    this.props.navigation.navigate('languageChooser', {
      title: 'Set Input Language',
      onGoBack: (language) => {
        this.props.onChangeFrom(language);
      },
    });
  };

  onPressOutput = () => {
    Keyboard.dismiss();
    // open screen for languages
    this.props.navigation.navigate('languageChooser', {
      title: 'Set Output Language',
      onGoBack: (language) => {
        this.props.onChangeTo(language);
      },
    });
  };

  onPressSwitch = () => {
    const {
      to, from, onChangeFrom, onChangeTo,
    } = this.props;

    onChangeFrom(to);
    onChangeTo(from);
  };

  render() {
    const { style } = this.props;
    const moveText = this.moveAnimation.interpolate({
      inputRange: [0, 0.3, 0.7, 1],
      outputRange: [0, 65, 67, 70],
    });

    return (
      <View style={[styles.container, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Choose the languages</Text>
        </View>
        <View style={[styles.buttonContainer, STYLE_SHADOW]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            <View style={styles.textButtonContainer}>
              <Text style={styles.smallText}>Input</Text>
              <Button
                style={[styles.button, STYLE_SHADOW]}
                // textStyle={{ paddingLeft: moveFromText }}
                // title={this.props.from}
                onPress={this.onPressInput}
              >
                <Animated.View style={{ paddingLeft: moveText }}>
                  <Text style={styles.text}>{this.state.from}</Text>
                </Animated.View>
              </Button>
            </View>

            <TouchableOpacity onPress={this.onPressSwitch}>
              <Image
                style={{ height: 50, resizeMode: 'center' }}
                source={Arrow}
              />
            </TouchableOpacity>

            <View style={styles.textButtonContainer}>
              <Text style={styles.smallText}>Output</Text>
              <Button
                style={[styles.button, STYLE_SHADOW]}
                {...styles.text}
                // textStyle={{ paddingRight: moveToText }}
                onPress={this.onPressOutput}
              >
                <Animated.View style={{ paddingRight: moveText }}>
                  <Text style={styles.text}>{this.state.to}</Text>
                </Animated.View>
              </Button>
            </View>
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
    minHeight: 80,
    justifyContent: 'center',
  },
  text: {
    color: TEXT_COLOR,
    fontWeight: '100',
    fontSize: 18,
  },
  smallText: {
    color: TEXT_COLOR,
    fontWeight: '100',
    fontSize: 12,
    marginLeft: 17,
    marginBottom: 5,
    height: 15,
  },
  textButtonContainer: {
    marginTop: -20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 8,
    width: 130,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    height: 40,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'flex-end',
    padding: 2,
  },
});

export default withNavigation(LanguageChooser);
