import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Keyboard, Dimensions,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import { addTranslation } from '../actions/history_actions';
import { ROOT_URL, API_KEY } from '../Constants';

class SearchScreen extends Component {
  state = {
    text: 'Go and translate some shit ;-)',
    searchText: '',
    visibleHeight: Dimensions.get('window').height,
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onChangeText = (searchText) => {
    this.setState({ searchText });
  };

  onClearText = () => {
    this.setState({ searchText: '' });
  };

  onSubmit = async () => {
    Keyboard.dismiss();
    const { searchText } = this.state;
    if (searchText === '') {
      return;
    }

    let {
      data: { text },
    } = await axios.get(
      `${ROOT_URL}?key=${API_KEY}&text=${searchText}&lang=de-en`,
    );
    const concatinatedText = text.reduce((prev, current) => prev + current);

    this.props.addTranslation({ de: searchText, en: concatinatedText });
    this.setState({
      text: concatinatedText,
      searchText: '',
    });
  };

  keyboardDidShow = (e) => {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height;
    this.setState({
      visibleHeight: newSize,
    });
  };

  keyboardDidHide = () => {
    this.setState({
      visibleHeight: Dimensions.get('window').height,
    });
  };

  render() {
    return (
      <View
        style={{ ...styles.container, maxHeight: this.state.visibleHeight }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.backgroundText}>{this.state.text}</Text>
        </View>
        <View style={styles.searchBar}>
          <SearchBar
            inputStyle={{ height: 60 }}
            noIcon
            onChangeText={this.onChangeText}
            onClearText={this.onClearText}
            clearButtonMode="always"
            placeholder="Type Here..."
            value={this.state.searchText}
            onSubmitEditing={this.onSubmit}
          />
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
    justifyContent: 'flex-end',
    height: 80,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6D4C41',
    flex: 1,
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
});
