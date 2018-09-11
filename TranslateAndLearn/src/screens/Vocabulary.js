import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Divider } from 'react-native-elements';
import * as translationActions from '../actions/translation_actions';
import {
  BACKGROUND_COLOR,
  SECONDARY_BACKGROUND_COLOR,
  SECONDARY_TEXT_COLOR,
  TEXT_COLOR,
  SEPARATOR_COLOR,
} from '../Constants';
import ArrorRight from '../../assets/ArrowRight.png';

class Vocabulary extends Component {
  keyExtractor = (item, index) => `${index}`;

  renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View
        style={{ justifyContent: 'space-around', paddingVertical: 5, flex: 3 }}
      >
        <Text style={{ fontSize: 18, color: SECONDARY_TEXT_COLOR }}>
          {item.lang.from}
        </Text>
        <Text
          style={{ fontSize: 18, color: TEXT_COLOR }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.input}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 20,
          marginRight: 10,
        }}
      >
        <Image
          source={ArrorRight}
          style={{
            width: 30,
            resizeMode: 'center',
          }}
        />
      </View>

      <View
        style={{ justifyContent: 'space-around', paddingVertical: 5, flex: 3 }}
      >
        <Text style={{ fontSize: 18, color: SECONDARY_TEXT_COLOR }}>
          {item.lang.to}
        </Text>
        <Text
          style={{ fontSize: 18, color: TEXT_COLOR }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.output}
        </Text>
      </View>
    </View>
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

  renderList = () => {
    const { history } = this.props;
    if (history.length === 0) {
      return this.renderListEmptyItem();
    }
    return (
      <View style={{ flex: 1, marginTop: 20, justifyContent: 'space-between' }}>
        <FlatList
          onScroll={this.handleScroll}
          data={history}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: SEPARATOR_COLOR,
                alignSelf: 'center',
                width: Dimensions.get('window').width * 0.75,
                marginVertical: 5,
              }}
            />
          )}
        />
        <View style={{ marginVertical: 12, marginHorizontal: 20 }}>
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
            buttonStyle={{ backgroundColor: SECONDARY_BACKGROUND_COLOR }}
            onPress={() => this.props.clearTranslations()}
          />
        </View>
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
  listItem: {
    marginHorizontal: 15,
    height: 50,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignContent: 'center',
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
