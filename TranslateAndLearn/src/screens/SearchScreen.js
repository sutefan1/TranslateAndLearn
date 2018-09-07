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
} from '../Constants';
import SearchBar from '../components/SearchBar';
import Logo from '../../assets/Logo.png';

class SearchScreen extends Component {
  state = {
    text: '',
    visibleHeight: Dimensions.get('window').height,
  };

  imageShown = new Animated.Value(0.3);

  imageScale = new Animated.Value(1);

  viewHeight = new Animated.Value(1);

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
    Animated.timing(this.imageShown, {
      toValue: 1,
      duration: 1000,
    }).start();
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
      text: concatinatedText,
    });
  };

  keyboardDidShow = (e) => {
    this.startImageAnimation(0);
    let newSize = Dimensions.get('window').height - e.endCoordinates.height;
    this.setState({
      visibleHeight: newSize,
    });
  };

  keyboardDidHide = () => {
    this.startImageAnimation(1);
    const { height } = Dimensions.get('window');
    this.setState({
      visibleHeight: height,
    });
  };

  startImageAnimation(toValue) {
    // const scaleAnimation = Animated.timing(this.imageScale, {
    //   toValue,
    //   duration: 100,
    // });
    // const opacityAnimation = Animated.timing(this.imageShown, {
    //   toValue,
    //   duration: 300,
    // }).start();
    // Animated.parallel([scaleAnimation, opacityAnimation]).start();
  }

  onLayout = (e) => {
    this.viewHeight.setValue(e.nativeEvent.layout.height);
  };

  render() {
    const { text, visibleHeight } = this.state;
    const { height: imageHeight } = Image.resolveAssetSource(Logo);
    const scale = this.viewHeight.interpolate({
      inputRange: [imageHeight * 0.6, 300],
      outputRange: [0.5, 1],
    });
    const imageOpacity = this.viewHeight.interpolate({
      inputRange: [imageHeight * 0.5 - 1, imageHeight * 0.5],
      outputRange: [0, 1],
    });
    return (
      <View
        style={{
          ...styles.container,
          maxHeight: visibleHeight,
        }}
      >
        <View
          style={[styles.topSection, styles.shadow]}
          onLayout={this.onLayout}
        >
          <Animated.View
            style={{
              opacity: imageOpacity,
              transform: [{ scale }],
            }}
          >
            <Image source={Logo} />
          </Animated.View>
        </View>
        <View style={styles.languageChooserContainer}>
          <View
            style={{
              height: 40,
              backgroundColor: BACKGROUND_COLOR,
              justifyContent: 'flex-end',
              padding: 2,
            }}
          >
            <Text style={styles.languageChooserText}>
              Choose the languages:
            </Text>
          </View>
          <View style={[styles.languageChooser, styles.shadow]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <Button
                buttonStyle={[
                  {
                    height: 50,
                    width: 130,
                    backgroundColor: BACKGROUND_COLOR,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  },
                  styles.shadow,
                ]}
                {...styles.languageChooserText}
                title="de"
              />
              <Button
                buttonStyle={[
                  {
                    height: 50,
                    width: 130,
                    backgroundColor: BACKGROUND_COLOR,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  },
                  styles.shadow,
                ]}
                {...styles.languageChooserText}
                title="en"
              />
            </View>
          </View>
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
  searchBar: {
    width: Dimensions.get('window').width,
  },
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
  languageChooserContainer: {
    flex: 1,
    minHeight: 180,
  },
  languageChooser: {
    backgroundColor: SECONDARY_BACKGROUND_COLOR,
    flex: 1,
    minHeight: 60,
    justifyContent: 'center',
  },
  topSection: {
    flex: 3,
    backgroundColor: SECONDARY_BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  languageChooserText: {
    color: TEXT_COLOR,
    fontWeight: '100',
    fontSize: 18,
  },
});

{
  /* <View style={styles.textContainer}>
<Text style={styles.backgroundText}>{text}</Text>
</View> */
}
