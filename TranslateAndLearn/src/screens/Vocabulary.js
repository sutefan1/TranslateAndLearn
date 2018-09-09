import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Divider } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import * as translationActions from '../actions/translation_actions';

class Vocabulary extends Component {
  state = {
    currentlyOpenSwipeable: null,
  };

  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  keyExtractor = (item, index) => `${index}`;

  renderItem = ({ item }) => (
    <Swipeable
      rightButtons={[
        <TouchableOpacity
          style={[styles.rightSwipeItem, { backgroundColor: '#e53935' }]}
          onPress={() => this.props.removeTranslation(item)}
        >
          <Text style={{ fontWeight: '800', color: 'white' }}>Delete</Text>
        </TouchableOpacity>,
      ]}
      onRightButtonsOpenRelease={this.onOpen}
      onRightButtonsCloseRelease={this.onClose}
    >
      <View style={styles.listItem}>
        <View style={{ flex: 2 }}>
          <Text
            style={styles.listItemText}
            ellipsizeMode="tail"
            numberOfLines={3}
          >
            {item.input}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Icon name="long-arrow-right" type="font-awesome" color="#6D4C41" />
        </View>
        <View style={{ flex: 2 }}>
          <Text
            style={styles.listItemText}
            ellipsizeMode="middle"
            numberOfLines={3}
          >
            {item.output}
          </Text>
        </View>
      </View>
    </Swipeable>
  );

  renderHeaderItem = () => (
    <View style={styles.listHeaderContainer}>
      <View style={styles.listHeaderItem}>
        <View style={{ flex: 2 }}>
          <Text style={styles.listHeaderItemText}>DE</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Icon name="long-arrow-right" type="font-awesome" color="white" />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.listHeaderItemText}>EN</Text>
        </View>
      </View>
    </View>
  );

  renderListEmptyItem = () => (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
      }}
    >
      <Button
        large
        title="Start A Search"
        textStyle={styles.backgroundText}
        iconRight={{ name: 'search', type: 'font-awesome' }}
        backgroundColor="#6D4C41"
        onPress={() => this.props.navigation.navigate('search')}
      />
    </View>
  );

  onOpen = (event, gestureState, swipeable) => {
    const { currentlyOpenSwipeable } = this.state;
    if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
      currentlyOpenSwipeable.recenter();
    }

    this.setState({ currentlyOpenSwipeable: swipeable });
  };

  onClose = () => this.setState({ currentlyOpenSwipeable: null });

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
          stickyHeaderIndices={[0]}
          ListHeaderComponent={this.renderHeaderItem}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <Divider />}
        />
        <View style={{ marginVertical: 12 }}>
          <Button
            large
            title="Clear History"
            icon={{ name: 'delete-forever' }}
            backgroundColor="#e53935"
            onPress={() => this.props.clearTranslations()}
          />
        </View>
      </View>
    );
  };

  render() {
    return Platform.OS === 'ios' ? (
      <View style={{ flex: 1, paddingTop: 20, backgroundColor: '#6D4C41' }}>
        <View style={styles.container}>{this.renderList()}</View>
      </View>
    ) : (
      <View style={styles.container}>{this.renderList()}</View>
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
    backgroundColor: '#F5FCFF',
  },
  backgroundText: {
    fontSize: 25,
    fontWeight: '800',
  },
  listItem: {
    marginLeft: 10,
    marginRight: 10,
    maxHeight: 100,
    minHeight: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  listItemText: {
    color: '#6D4C41',
    fontSize: 20,
    fontWeight: '500',
    justifyContent: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  listHeaderItem: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  listHeaderContainer: {
    height: 60,
    backgroundColor: '#6D4C41',
    flex: 1,
    justifyContent: 'center',
  },
  listHeaderItemText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '800',
    justifyContent: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 17,
  },
});
