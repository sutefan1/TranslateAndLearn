import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import * as translationActions from '../actions/translation_actions';
import {
  BACKGROUND_COLOR,
  SECONDARY_BACKGROUND_COLOR,
  SEPARATOR_COLOR,
} from '../Constants';
import TranslationListItem from '../components/TranslationListItem';

class Vocabulary extends Component {
  state = {
    enable: true,
  };

  keyExtractor = ({ id }) => `${id}`;

  success = (id) => {
    this.props.removeTranslation(id);
  };

  setScrollEnabled = (enable) => {
    this.setState({
      enable,
    });
  };

  renderItem = ({ item }) => (
    <TranslationListItem
      item={item}
      success={this.success}
      setScrollEnabled={this.setScrollEnabled}
    />
  );

  renderListEmptyItem = () => (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
        marginHorizontal: 20,
      }}
    >
      <Button
        large
        title="Start A Search"
        titleStyle={styles.backgroundText}
        iconRight
        icon={{ name: 'search', type: 'font-awesome', color: 'white' }}
        buttonStyle={{ backgroundColor: SECONDARY_BACKGROUND_COLOR }}
        onPress={() => this.props.navigation.navigate('search')}
      />
    </View>
  );

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        backgroundColor: SEPARATOR_COLOR,
        alignSelf: 'center',
        width: Dimensions.get('window').width * 0.75,
        marginVertical: 5,
      }}
    />
  );

  renderClearHistoryButton = () => (
    <View
      style={{
        left: 12,
        right: 12,
        bottom: 6,
        position: 'absolute',
      }}
    >
      <Button
        large
        title="Clear History"
        titleStyle={styles.backgroundText}
        iconRight
        icon={{
          name: 'delete-forever',
          type: 'material',
          color: 'white',
        }}
        buttonStyle={{
          backgroundColor: SECONDARY_BACKGROUND_COLOR,
          height: 50,
        }}
        onPress={() => this.props.clearTranslations()}
      />
    </View>
  );

  renderList = () => {
    const { history } = this.props;
    if (history.length === 0) {
      return this.renderListEmptyItem();
    }
    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <FlatList
          onScroll={this.handleScroll}
          data={history}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          scrollEnabled={this.state.enable}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 60 }}
        />
        {this.renderClearHistoryButton()}
      </View>
    );
  };

  render() {
    const view = (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={BACKGROUND_COLOR}
        />
        <View style={styles.container}>{this.renderList()}</View>
      </View>
    );
    return Platform.OS === 'ios' ? (
      <View
        style={{ flex: 1, paddingTop: 20, backgroundColor: BACKGROUND_COLOR }}
      >
        {view}
      </View>
    ) : (
      view
    );
  }
}

const mapStateToProps = ({ translation: { history } }) => ({ history });

export default connect(
  mapStateToProps,
  translationActions,
)(Vocabulary);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  backgroundText: {
    fontSize: 25,
    fontWeight: '800',
  },
});
