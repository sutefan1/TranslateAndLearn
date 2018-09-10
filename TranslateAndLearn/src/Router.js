import React, { Component } from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Provider } from 'react-redux';
import store from './reducers';
import SearchScreen from './screens/SearchScreen';
import Vocabulary from './screens/Vocabulary';
import {
  SECONDARY_BACKGROUND_COLOR,
  INACTIVE_TINTCOLOR,
  ACTIVE_TINTCOLOR,
} from './Constants';
import LanguageChooserScreen from './screens/LanguageChooserScreen';

/* eslint-disable react/prop-types */

class Router extends Component {
  render() {
    const TabBar = createBottomTabNavigator(
      {
        search: {
          screen: SearchScreen,
          navigationOptions: {
            title: 'Search',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="search" type="material" color={tintColor} />
            ),
          },
        },
        vocabulary: {
          screen: Vocabulary,
          navigationOptions: {
            title: 'History',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="history" type="material" color={tintColor} />
            ),
          },
        },
      },
      {
        tabBarOptions: {
          showIcon: true,
          showLabel: false,
          activeBackgroundColor: SECONDARY_BACKGROUND_COLOR,
          inactiveBackgroundColor: SECONDARY_BACKGROUND_COLOR,
          activeTintColor: ACTIVE_TINTCOLOR,
          inactiveTintColor: INACTIVE_TINTCOLOR,
        },
      },
    );
    const StackNavigator = createStackNavigator(
      {
        tabBar: {
          screen: TabBar,
          navigationOptions: { header: null },
        },
        languageChooser: {
          screen: LanguageChooserScreen,
        },
      },
      { mode: 'modal' },
    );
    return (
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    );
  }
}

export default Router;
/* eslint-enable react/prop-types */
