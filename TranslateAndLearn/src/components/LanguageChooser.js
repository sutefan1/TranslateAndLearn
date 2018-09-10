import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  Animated,
} from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  SECONDARY_BACKGROUND_COLOR,
  STYLE_SHADOW,
} from '../Constants';
import Arrow from '../../assets/Arrow.png';

// const makeClassBased = (WrappedComponent) => {
//   class HOC extends React.Component {
//     render() {
//       return <WrappedComponent {...this.props} />;
//     }
//   }

//   return HOC;
// };

// const ButtonClassComponent = makeClassBased(Button);
// const AnimatedButton = Animated.createAnimatedComponent(ButtonClassComponent);

class LanguageChooser extends Component {
  moveAnimationFrom = new Animated.Value(0);

  moveAnimationTo = new Animated.Value(0);

  componentWillReceiveProps(prevProps, nextProps) {
    if (prevProps.from !== nextProps.from && prevProps.to !== nextProps.to) {
      const moveFromTextToCenter = Animated.timing(this.moveAnimationFrom, {
        toValue: 1,
      });
      const moveToTextToCenter = Animated.timing(this.moveAnimationTo, {
        toValue: 1,
      });
      Animated.parallel([moveFromTextToCenter, moveToTextToCenter]).start(
        () => {
          const moveFromTextBack = Animated.timing(this.moveAnimationFrom, {
            toValue: 0,
          });
          const moveToTextBack = Animated.timing(this.moveAnimationTo, {
            toValue: 0,
          });
          // TODO: set State and change labels
          Animated.parallel([moveFromTextBack, moveToTextBack]).start();
        },
      );
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
    const moveFromText = this.moveAnimationFrom.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 60],
    });
    const moveToText = this.moveAnimationTo.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 60],
    });
    console.log(moveFromText);
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
                buttonStyle={[styles.button, STYLE_SHADOW]}
                {...styles.text}
                // textStyle={{ paddingLeft: moveFromText }}
                title={this.props.from}
                onPress={this.onPressInput}
              />
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
                buttonStyle={[styles.button, STYLE_SHADOW]}
                {...styles.text}
                // textStyle={{ paddingRight: moveToText }}
                title={this.props.to}
                onPress={this.onPressOutput}
              />
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
  },
  textContainer: {
    height: 40,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'flex-end',
    padding: 2,
  },
});

export default withNavigation(LanguageChooser);
