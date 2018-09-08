import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from 'react-native-elements';
import { addTranslation } from '../actions/history_actions';
import {
  ROOT_URL,
  API_KEY,
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
    lastSearchText: 'Hallo, wie geht es dir?',
    translatedText: 'Hello, how are you?',
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

  onSubmit = async (searchText) => {
    let {
      data: { text },
    } = await axios.get(
      `${ROOT_URL}?key=${API_KEY}&text=${searchText}&lang=de-en`,
    );
    const concatinatedText = text.reduce((prev, current) => prev + current);

    this.props.addTranslation({ de: searchText, en: concatinatedText });
    this.setState({
      translatedText: concatinatedText,
      lastSearchText: searchText,
    });
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
    const {
      text,
      visibleHeight,
      logoFadedOut,
      lastSearchText,
      translatedText,
    } = this.state;

    return (
      <View
        style={{
          ...styles.container,
          maxHeight: visibleHeight,
        }}
      >
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
                  de
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '500',
                    color: SECONDARY_TEXT_COLOR,
                  }}
                >
                  {lastSearchText}
                </Text>
              </View>
              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: '100', color: TEXT_COLOR }}
                >
                  en
                </Text>
                <Text
                  style={{ fontSize: 36, fontWeight: '500', color: TEXT_COLOR }}
                >
                  {translatedText}
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

export default connect(
  null,
  { addTranslation },
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
