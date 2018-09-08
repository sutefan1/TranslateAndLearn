import React, { Component } from 'react';
import {
  View, TextInput, Keyboard, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  BACKGROUND_COLOR,
  TEXTINPUT_BACKGROUND_COLOR,
  TEXTINPUT_BORDER_COLOR,
  TEXTINPUT_PLACEHOLDER_TEXT_COLOR,
  TEXT_COLOR,
} from '../Constants';

class SearchBar extends Component {
  state = { searchText: '' };

  static defaultProps = {
    onSubmit: () => {},
  };

  static propTypes = {
    onSubmit: PropTypes.func,
  };

  onChangeText = (searchText) => {
    this.setState({ searchText });
  };

  onClearText = () => {
    this.setState({ searchText: '' });
  };

  onSubmit = () => {
    Keyboard.dismiss();
    const { searchText } = this.state;
    const { onSubmit } = this.props;
    if (searchText === '') {
      return;
    }
    onSubmit(searchText);
    this.setState({ searchText: '' });
  };

  render() {
    const { searchText } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="What do you want to translate?"
          placeholderTextColor={TEXTINPUT_PLACEHOLDER_TEXT_COLOR}
          onChangeText={this.onChangeText}
          onClearText={this.onClearText}
          clearButtonMode="always"
          value={searchText}
          onSubmitEditing={this.onSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    backgroundColor: TEXTINPUT_BACKGROUND_COLOR,
    color: TEXT_COLOR,
    borderRadius: 8,
    fontWeight: '100',
    fontSize: 18,
    paddingHorizontal: 12,
    borderColor: TEXTINPUT_BORDER_COLOR,
    borderWidth: 1,
  },
  container: {
    backgroundColor: BACKGROUND_COLOR,
    minHeight: 80,
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
});

export default SearchBar;
