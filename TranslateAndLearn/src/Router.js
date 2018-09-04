import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Provider } from 'react-redux';
import store from './reducers';
import SearchScreen from './screens/SearchScreen';
import Vocabulary from './screens/Vocabulary';

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
              <Icon name="search" type="font-awesome" color={tintColor} />
            ),
          },
        },
        vocabulary: {
          screen: Vocabulary,
          navigationOptions: {
            title: 'History',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="history" type="font-awesome" color={tintColor} />
            ),
          },
        },
      },
      {
        tabBarOptions: {
          showIcon: true,
          showLabel: false,
          activeBackgroundColor: '#6D4C41',
          inactiveBackgroundColor: '#6D4C41',
          activeTintColor: '#EEEEEE',
          inactiveTintColor: '#8D6E63',
        },
      },
    );
    return (
      <Provider store={store}>
        <TabBar />
      </Provider>
    );
  }
}

export default Router;
/* eslint-enable react/prop-types */
