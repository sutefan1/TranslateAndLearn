import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  Dimensions,
  Image,
  Animated,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import * as tranlationActions from '../actions/translation_actions';
import {
  BACKGROUND_COLOR,
  SECONDARY_BACKGROUND_COLOR,
  TEXT_COLOR,
  STYLE_SHADOW,
  SECONDARY_TEXT_COLOR,
} from '../Constants';
import SearchBar from '../components/SearchBar';
import LanguageChooser from '../components/LanguageChooser';
import Logo from '../../assets/Logo.png';

class SearchScreen extends Component {
  state = {
    visibleHeight: Dimensions.get('window').height,
    logoFadedOut: false,
    lang: {
      from: 'de',
      to: 'en',
    },
  };

  logoOpacity = new Animated.Value(0.1);

  logoScale = new Animated.Value(1);

  contentOpacity = new Animated.Value(0);

  contentScale = new Animated.Value(1);

  topSectionOpacity = new Animated.Value(1);

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
    Animated.timing(this.logoOpacity, {
      toValue: 1,
      duration: 2000,
    }).start(() => {
      Animated.timing(this.logoOpacity, {
        toValue: 0,
        duration: 1000,
      }).start(() => {
        this.setState({ logoFadedOut: true });
        Animated.timing(this.contentOpacity, {
          toValue: 1,
          duration: 1000,
        }).start();
      });
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onSubmit = (searchText) => {
    const { lang } = this.state;
    this.props.setTranslationPlaceholder({ lang, input: searchText });
    this.props.translate({ lang, input: searchText });
  };

  keyboardDidShow = (e) => {
    this.startTopViewAnimation(0);
    let newSize = Dimensions.get('window').height - e.endCoordinates.height;
    this.setState({
      visibleHeight: newSize,
    });
  };

  keyboardDidHide = () => {
    this.startTopViewAnimation(1);
    const { height } = Dimensions.get('window');
    this.setState({
      visibleHeight: height,
    });
  };

  startTopViewAnimation(toValue) {
    Animated.timing(this.topSectionOpacity, {
      toValue,
      duration: 100,
    }).start();
  }

  render() {
    const { visibleHeight, logoFadedOut } = this.state;

    const { lastTranslation } = this.props;

    return (
      <View
        style={{
          ...styles.container,
          maxHeight: visibleHeight,
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor={SECONDARY_BACKGROUND_COLOR}
        />
        <Animated.View
          style={[
            styles.topSection,
            STYLE_SHADOW,
            { opacity: this.topSectionOpacity },
          ]}
        >
          {logoFadedOut ? (
            <Animated.View
              style={{
                transform: [{ scale: this.contentScale }],
                opacity: this.contentOpacity,
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
                  {lastTranslation.lang.from}
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '500',
                    color: SECONDARY_TEXT_COLOR,
                  }}
                >
                  {lastTranslation.input}
                </Text>
              </View>
              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: '100', color: TEXT_COLOR }}
                >
                  {lastTranslation.lang.to}
                </Text>
                <Text
                  style={{ fontSize: 36, fontWeight: '500', color: TEXT_COLOR }}
                >
                  {lastTranslation.output}
                </Text>
              </View>
            </Animated.View>
          ) : (
            <Animated.Image
              source={Logo}
              style={{
                transform: [{ scale: this.logoScale }],
                opacity: this.logoOpacity,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            />
          )}
        </Animated.View>
        <View style={styles.bottomSection}>
          <LanguageChooser />
          <SearchBar onSubmit={this.onSubmit} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ translation: { lastTranslation } }) => ({
  lastTranslation,
});

export default connect(
  mapStateToProps,
  tranlationActions,
)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  backgroundText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#EEEEEE',
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  topSection: {
    flex: 1,
    backgroundColor: SECONDARY_BACKGROUND_COLOR,
    justifyContent: 'center',
  },
  bottomSection: {
    height: 260,
  },
});
