import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Divider } from 'react-native-elements';
import axios from 'axios';
import * as translationActions from '../actions/translation_actions';
import {
  ROOT_URL,
  LANGUAGE_URL,
  BACKGROUND_COLOR,
  TEXT_COLOR,
} from '../Constants';
import LanguageCodes from '../LanguageCodes.json';
import API_KEY from '../ApiKey';

class LanguageChooserScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title', 'Set Language');
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
    return Platform.OS === 'ios' ? { title, headerLeft } : { title };
  };

  state = { languages: [] };

  keyExtractor = (item, index) => `${index}`;

  async componentDidMount() {
    const url = `${ROOT_URL}${LANGUAGE_URL}?key=${API_KEY}`;
    let {
      data: {
        data: { languages },
      },
    } = await axios.get(url);
    languages = languages.map(language => language.language);
    this.setState({ languages });
  }

  onPressItem = (lang) => {
    this.props.navigation.getParam('onGoBack', () => {})(lang);
    this.props.navigation.goBack();
  };

  renderItem = ({ item }) => {
    const language = LanguageCodes.find(entry => entry.code === item)?.name || null;
    return language ? (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => this.onPressItem(item)}
      >
        <Text style={styles.text}>{language}</Text>
      </TouchableOpacity>
    ) : null;
  };

  renderItemSeparator = ({ leadingItem }) => {
    const language = LanguageCodes.find(entry => entry.code === leadingItem)?.name || null;
    return language ? <Divider /> : null;
  };

  renderList = () => {
    const { languages } = this.state;
    return (
      <FlatList
        onScroll={this.handleScroll}
        data={languages}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderItemSeparator}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        {this.renderList()}
      </View>
    );
  }
}

const mapStateToProps = ({ translation: { history } }) => ({ history });

export default connect(
  mapStateToProps,
  translationActions,
)(LanguageChooserScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  itemContainer: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  text: {
    color: BACKGROUND_COLOR,
    fontWeight: '100',
    fontSize: 18,
  },
});
